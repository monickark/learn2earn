// server/app.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import generateContentRoute from './routes/generateContent.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/generate-content', generateContentRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
