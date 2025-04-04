import express from 'express';
import cors from 'cors';
import sequelize from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);  
app.use('/api/products', productRoutes);

// Database connection
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database connected');
    app.listen(5000, () => {
      console.log('Server running on port 5000');
    });
  })
  .catch(err => console.log('Database connection error:', err));