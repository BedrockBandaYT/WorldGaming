import { Hono } from 'hono';
import type { Context } from 'hono';
import { getCookie, setCookie, deleteCookie } from 'hono/cookie';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { cors } from 'hono/cors';

export interface Env {
  SESSIONS: KVNamespace;
  SUSPENDED_MARKETS: KVNamespace;
  INTERNAL_SECRET: string;
}

type Role = 'super_admin' | 'senior_admin' | 'agent' | 'readonly_admin' | 'user';
interface UserRecord {
  id: string;
  username: string;
  password: string;
  role: Role;
  walletBalance: number;
  maxBet: number;
  allowedSports: string[];
  suspended: boolean;
}

const app = new Hono<{ Bindings: Env }>();

const COOKIE = 'wg_session';


app.use('*', cors({
  origin: (origin) => origin || 'http://localhost:3000',
  allowMethods: ['GET', 'POST', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));


async function getSessionUser(c: Context<{ Bindings: Env }>): Promise<UserRecord | null> {
  const sessionId = getCookie(c, COOKIE);
  if (!sessionId) return null;
  const raw = await c.env.SESSIONS.get(`session:${sessionId}`);
  if (!raw) return null;
  const session = JSON.parse(raw) as { userId: string };
  const userRaw = await c.env.SESSIONS.get(`user:${session.userId}`);
  return userRaw ? (JSON.parse(userRaw) as UserRecord) : null;
}

async function seedData(c: Context<{ Bindings: Env }>) {
  const admin = await c.env.SESSIONS.get('user:admin');
  if (!admin) {
    const defaultAdmin: UserRecord = {
      id: 'admin',
      username: 'admin',
      password: 'admin123',
      role: 'super_admin',
      walletBalance: 0,
      maxBet: 0,
      allowedSports: ['cricket', 'football', 'tennis', 'volleyball'],
      suspended: false
    };
    const defaultUser: UserRecord = {
      id: 'u1',
      username: 'player1',
      password: 'player123',
      role: 'user',
      walletBalance: 10000,
      maxBet: 2000,
      allowedSports: ['cricket', 'football'],
      suspended: false
    };
    await c.env.SESSIONS.put('user:admin', JSON.stringify(defaultAdmin));
    await c.env.SESSIONS.put('user:u1', JSON.stringify(defaultUser));
    await c.env.SESSIONS.put('market:m1', JSON.stringify({ id: 'm1', sport: 'cricket', name: 'Team A vs Team B - Winner', odds: 1.86 }));
  }
}

app.use('*', async (c, next) => {
  await seedData(c);
  await next();
});

app.get('/health', (c) => c.json({ ok: true, service: 'api-worker', now: new Date().toISOString() }));

app.post('/v1/auth/login', zValidator('json', z.object({ username: z.string(), password: z.string() })), async (c) => {
  const { username, password } = c.req.valid('json');
  const userIds = ['admin', 'u1'];
  for (const id of userIds) {
    const raw = await c.env.SESSIONS.get(`user:${id}`);
    if (!raw) continue;
    const user = JSON.parse(raw) as UserRecord;
    if (user.username === username && user.password === password) {
      const sessionId = crypto.randomUUID();
      await c.env.SESSIONS.put(`session:${sessionId}`, JSON.stringify({ userId: user.id }), { expirationTtl: 60 * 60 * 24 });
      setCookie(c, COOKIE, sessionId, { httpOnly: true, sameSite: 'Lax', secure: true, path: '/' });
      return c.json({ ok: true, user: { id: user.id, username: user.username, role: user.role } });
    }
  }
  return c.json({ ok: false, reason: 'INVALID_CREDENTIALS' }, 401);
});

app.post('/v1/auth/logout', async (c) => {
  const sid = getCookie(c, COOKIE);
  if (sid) await c.env.SESSIONS.delete(`session:${sid}`);
  deleteCookie(c, COOKIE, { path: '/' });
  return c.json({ ok: true });
});

app.get('/v1/me', async (c) => {
  const user = await getSessionUser(c);
  if (!user) return c.json({ ok: false, reason: 'UNAUTHORIZED' }, 401);
  return c.json({ ok: true, user: { id: user.id, username: user.username, role: user.role, walletBalance: user.walletBalance } });
});

app.get('/v1/bootstrap', async (c) => {
  const user = await getSessionUser(c);
  const marketRaw = await c.env.SESSIONS.get('market:m1');
  return c.json({
    ok: true,
    apiBase: new URL(c.req.url).origin,
    user: user ? { id: user.id, username: user.username, role: user.role, walletBalance: user.walletBalance } : null,
    markets: marketRaw ? [JSON.parse(marketRaw)] : []
  });
});

app.get('/v1/markets', async (c) => {
  const marketRaw = await c.env.SESSIONS.get('market:m1');
  return c.json({ ok: true, markets: marketRaw ? [JSON.parse(marketRaw)] : [] });
});

const placeBetSchema = z.object({ userId: z.string().min(1), marketId: z.string().min(1), stake: z.number().positive() });
app.post('/v1/bets/place', zValidator('json', placeBetSchema), async (c) => {
  const payload = c.req.valid('json');
  const user = await getSessionUser(c);
  if (!user || user.id !== payload.userId) return c.json({ ok: false, reason: 'UNAUTHORIZED' }, 401);
  if (user.suspended) return c.json({ ok: false, reason: 'USER_SUSPENDED' }, 403);

  const suspended = await c.env.SUSPENDED_MARKETS.get(payload.marketId);
  if (suspended) return c.json({ ok: false, reason: 'MARKET_SUSPENDED' }, 409);

  const marketRaw = await c.env.SESSIONS.get(`market:${payload.marketId}`);
  if (!marketRaw) return c.json({ ok: false, reason: 'MARKET_NOT_FOUND' }, 404);
  const market = JSON.parse(marketRaw) as { sport: string; odds: number };

  if (!user.allowedSports.includes(market.sport)) return c.json({ ok: false, reason: 'SPORT_NOT_ALLOWED' }, 403);
  if (payload.stake > user.maxBet) return c.json({ ok: false, reason: 'MAX_BET_EXCEEDED' }, 422);
  if (payload.stake > user.walletBalance) return c.json({ ok: false, reason: 'INSUFFICIENT_BALANCE' }, 422);

  user.walletBalance -= payload.stake;
  await c.env.SESSIONS.put(`user:${user.id}`, JSON.stringify(user));

  const betId = crypto.randomUUID();
  await c.env.SESSIONS.put(`bet:${betId}`, JSON.stringify({ betId, ...payload, odds: market.odds, createdAt: Date.now(), status: 'accepted' }));

  return c.json({ ok: true, betId, remainingBalance: user.walletBalance });
});

export default { fetch: app.fetch };
