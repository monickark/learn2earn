import express from 'express';
import { supabase } from '../../utils/supabaseClient.js';

const router = express.Router();

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { email, password, username, fullName } = req.body;

  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { username, full_name: fullName }
    }
  });

  if (signUpError) return res.status(400).json({ error: signUpError.message });

  // Optionally insert into `users` table if trigger is not used
  const userId = signUpData.user.id;
  const { error: profileError } = await supabase
    .from('users')
    .insert({
      id: userId,
      username,
      full_name: fullName
    });

  if (profileError) return res.status(500).json({ error: profileError.message });

  res.status(200).json({ message: 'Registration successful', user: signUpData.user });
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) return res.status(401).json({ error: error.message });

  res.status(200).json({ message: 'Login successful', session: data.session, user: data.user });
});

export default router;
