import express from 'express';
import supabase from '../utils/supabaseClient.js';

const router = express.Router();

function getSession(req) {
  try {
    return req.cookies?.session ? JSON.parse(req.cookies.session) : null;
  } catch {
    return null;
  }
}

router.get('/', async (req, res) => {
  const sess = getSession(req);
  if (!sess?.uid) {
    // Allow guests to view a basic profile; no DB lookup
    return res.json({ profile: { id: null, email: '', display_name: '', avatar_url: '', guest: true } });
  }
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', sess.uid)
      .single();
    if (error && error.code !== 'PGRST116') return res.status(400).json({ error: error.message });
    return res.json({ profile: data || { id: sess.uid, email: sess.email, display_name: '', avatar_url: '' } });
  } catch (e) {
    return res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

router.post('/', async (req, res) => {
  const sess = getSession(req);
  if (!sess?.uid) return res.status(401).json({ error: 'Unauthorized' });
  const { display_name, avatar_url } = req.body || {};
  try {
    const { data, error } = await supabase
      .from('profiles')
      .upsert({ id: sess.uid, display_name: display_name || '', avatar_url: avatar_url || '' })
      .select('*')
      .single();
    if (error) return res.status(400).json({ error: error.message });
    return res.json({ profile: data });
  } catch (e) {
    return res.status(500).json({ error: 'Failed to update profile' });
  }
});

export default router;




