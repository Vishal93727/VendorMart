import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import serverless from 'serverless-http';
import mongoConnect from './db.js';

import orderRouter from './routes/order.js';
import groupRouter from './routes/grouping.js';

dotenv.config();
const app = express();

const URI = process.env.MONGO_URI;
mongoConnect(URI);

// ✅ Recommended CORS (secure)
app.use(cors({
  origin: [
    'https://vendor-mart-izmz.vercel.app/',
    'http://localhost:3000'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', orderRouter);
app.use('/api/group-and-match', groupRouter);

// ✅ No app.listen() on Vercel
export const handler = serverless(app);
