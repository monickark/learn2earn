import express from 'express';
import supabase from '../utils/supabaseClient.js';

const router = express.Router();

// Helper to set/remove session via cookie (stateless demo; for production use JWT with signing)
function setSessionCookie(res, payload) {
  res.cookie('session', JSON.stringify(payload), {
    httpOnly: true,
    sameSite: 'lax',
    secure: false,
    maxAge: 7 * 24 * 60 * 60 * 1000
  });
}

function clearSessionCookie(res) {
  res.clearCookie('session');
}

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ error: 'Missing credentials' });
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return res.status(401).json({ error: error.message });
    // Ensure profile row exists
    try {
      const seed = encodeURIComponent(data.user.id || data.user.email || 'guest');
      const defaultAvatar = `https://api.dicebear.com/7.x/identicon/svg?seed=${seed}`;
      await supabase
        .from('profiles')
        .upsert({ id: data.user.id, email: data.user.email, avatar_url: defaultAvatar }, { onConflict: 'id' });
    } catch {}
    setSessionCookie(res, { uid: data.user.id, email: data.user.email });
    return res.json({ user: { id: data.user.id, email: data.user.email } });
  } catch (e) {
    return res.status(500).json({ error: 'Login failed' });
  }
});

router.post('/signup', async (req, res) => {
  try {
    const { email, password, name } = req.body || {};
    if (!email || !password) return res.status(400).json({ error: 'Missing credentials' });
    const emailRedirectTo = process.env.EMAIL_REDIRECT_TO || process.env.SITE_URL || 'http://localhost:5173';
    const { data, error } = await supabase.auth.signUp({ 
      email, 
      password,
      options: {
        emailRedirectTo,
        data: { display_name: name || '' }
      }
    });
    if (error) return res.status(400).json({ error: error.message });
    // Create profile row immediately (even before email verification)
    try {
      if (data?.user?.id) {
        const seed = encodeURIComponent(data.user.id || data.user.email || 'guest');
        const defaultAvatar = `https://api.dicebear.com/7.x/identicon/svg?seed=${seed}`;
        const { error: upsertError } = await supabase
          .from('profiles')
          .upsert({ id: data.user.id, email: data.user.email, display_name: name || '', avatar_url: defaultAvatar }, { onConflict: 'id' });
        if (upsertError) {
          console.error('profiles upsert after signup failed:', upsertError.message);
        }
      }
    } catch (e) {
      console.error('profiles upsert after signup exception:', e.message);
    }
    // no session cookie until email verified
    return res.json({ requiresVerification: true });
  } catch (e) {
    return res.status(500).json({ error: 'Signup failed' });
  }
});

router.post('/logout', async (_req, res) => {
  try {
    clearSessionCookie(res);
    return res.json({ ok: true });
  } catch (e) {
    return res.status(500).json({ error: 'Logout failed' });
  }
});

router.get('/session', (req, res) => {
  try {
    const sess = req.cookies?.session ? JSON.parse(req.cookies.session) : null;
    if (!sess) return res.json({ user: null });
    return res.json({ user: sess });
  } catch {
    return res.json({ user: null });
  }
});

export default router;




