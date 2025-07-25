import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/mongodb.js';
import authRouter from './routes/authRoutes.js';
import itemRoutes from './routes/itemRoutes.js';

const app = express();
const port = process.env.PORT || 5000;

connectDB();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend URL
  credentials: true, // Allow cookies to be sent
}));

// API endpoints
app.use('/api/auth', authRouter);

// Item API endpoints
app.use('/api/items', itemRoutes);
// Serve static files from the "uploads" directory
app.use('/uploads', express.static('uploads'));
// Health check
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});