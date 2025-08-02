// File: server/app.js
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import generateContentRoute from './routes/generateContent.js';
import trendingTopics from './routes/trendingTopics.js';
import summarizeUrlRoute from './routes/summarizeUrl.js';

const app = express();
dotenv.config();
// ✅ Middleware
const allowedOrigins = [
  'http://localhost:5173',
  'https://www.vidgenz.com',
  'https://learn2earn-ivory.vercel.app'
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true
}));
app.use(express.json());


// ✅ Routes
app.use('/api/generate-content', generateContentRoute);
app.use('/api/trending', trendingTopics);
app.use('/api/summarize-url', summarizeUrlRoute);

// ✅ Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
