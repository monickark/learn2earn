// server/routes/generateContent.js
import express from 'express';
const router = express.Router();
import generateEducationalContent from '../services/azureService.js';
import formatResponse from '../utils/formatResponse.js';
import validateInput from '../utils/validateInput.js';
import supabase from '../utils/supabaseClient.js';

router.post('/', async (req, res) => {
  const { topic, level } = req.body;

  // Validate input
  if (!validateInput(topic) || !level || !['Beginner', 'Intermediate', 'Expert'].includes(level)) {
    return res.status(400).json({ error: 'Invalid topic or level input' });
  }

  try {
    // 1. Generate AI content
    const aiResponse = await generateEducationalContent(topic, level);
    const content = formatResponse(aiResponse);

    // 2. Update or insert into Supabase (atomic logic)
    const { error: upsertError } = await supabase
      .from('search_history')
      .upsert(
        [
          {
            topic,
            count: 1,
            updated_at: new Date().toISOString()
          }
        ],
        {
          onConflict: 'topic',
          ignoreDuplicates: false
        }
      );

    if (upsertError && upsertError.code !== '23505') {
      console.error('Upsert error:', upsertError.message);
    }

    // 3. If topic already existed, increment count via RPC
    if (!upsertError) {
      const { data, error: incrementError } = await supabase.rpc('increment_search_count', {
        search_topic: topic
      });

      if (incrementError) {
        console.error('RPC increment error:', incrementError.message);
      }
    }

    // 4. Respond with generated content
    res.json({ topic, level, content });

  } catch (error) {
    console.error('Error generating content:', error);
    res.status(500).json({ error: 'Failed to generate content' });
  }
});

export default router;
