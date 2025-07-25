// server/routes/getSearchStats.js
import express from 'express';
import supabase from '../utils/supabaseClient.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const { data, error } = await supabase
    .from('search_history')
    .select('topic, count')
    .order('count', { ascending: false })
    .limit(10);
  console.log("fetch complete");
  if (error) return res.status(500).json({ error });
    console.log("data exist");
  res.json({ data });
});

export default router;
