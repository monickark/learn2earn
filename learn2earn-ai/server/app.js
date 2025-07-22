// File: server/app.js
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import generateContentRoute from './routes/generateContent.js';

const app = express();
dotenv.config();
// ✅ Middleware
app.use(cors({
  origin: 'https://learn2earn-ivory.vercel.app',  
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());


// ✅ Routes
app.use('/api/generate-content', generateContentRoute);


// ✅ Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
