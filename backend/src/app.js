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


app.use(cors({
  origin: ['http://localhost:3000', 'https://vendor-mart-izmz.vercel.app/'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', orderRouter);
app.use('/api/group-and-match', groupRouter);


export const handler = serverless(app);
