import express, { Request, Response, NextFunction } from 'express';
const app = express();
import morgan from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import userRoutes from './src/routes/user.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// middleware
app.use(morgan('dev'));
// to see uploaded files in the browser
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const allowedOrigins = [
  'http://localhost:3000'
];

const corsOptions: cors.CorsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    console.log(`ORIGIN -> ${origin}`);
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    } else {
      console.log(`ERROR: -> ${origin} not allowed by CORS.`);
      return callback(new Error('Not allowed by CORS'), false);
    }
  },
  optionsSuccessStatus: 200
};

// Allow CORS origin
app.use(cors(corsOptions));

// Enable CORS
app.use((req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin as string;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, X-Api-Key, Accept, Content-Disposition');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g., in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Expose-Headers', 'Access-Token, Uid');
  // Pass to next layer of middleware
  // res.setHeader('Cache-Control', 'public, max-age=31536000');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Allow static path for access to images
app.use(express.static(path.join(__dirname, 'uploads')));

app.use('/users', userRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error('Not found');
  next(error);
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status((error as any).status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

export default app;
