import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/api/auth.js';
import generateContentRoute from './routes/generateContent.js';
import trendingTopics from './routes/trendingTopics.js';

const app = express();
dotenv.config();

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
  })
);
app.use(express.json());

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/generate-content', generateContentRoute);
app.use('/api/trending', trendingTopics);

// ✅ Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});