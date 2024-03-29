import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';

import Joi from 'joi';
import joiObjectid from 'joi-objectid';
Joi.objectId = joiObjectid(Joi);

// import loginRoutes from './routes/loginRoutes.js';
import userRoutes from './routes/userRoutes.js';
import badgeRoutes from './routes/badgeRoutes.js';
import activityRoutes from './routes/activityRoutes.js';
import submissionRoutes from './routes/submissionRoutes.js';
import subjectRoutes from './routes/subjectRoutes.js';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/users', userRoutes);
app.use('/api/badge', badgeRoutes);
app.use('/api/activity', activityRoutes);
app.use('/api/submission', submissionRoutes);
app.use('/api/subject', subjectRoutes);

app.get('/', (req, res) => {
  res.send('API is running....');
});

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
