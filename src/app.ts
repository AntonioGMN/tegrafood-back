import cors from 'cors';
import express, { json } from 'express';
import 'express-async-errors';
import dotenv from 'dotenv';
import router from './routers/index.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(json());
app.use(router);
app.use('/uploads', express.static('uploads'));

export default app;
