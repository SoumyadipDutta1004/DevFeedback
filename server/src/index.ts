import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { PORT } from './config/env';
import connectDB from './database/mongoDB';


const app = express();


// Middlewares
app.use(cors())
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



(async function() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
  })
})();
