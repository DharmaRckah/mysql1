import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';

// User registration
export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // Create user
    const user = await User.create({ 
      username, 
      email, 
      password: hashedPassword 
    });
    
    // Generate JWT
    const token = jwt.sign(
      { id: user.id }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' }
    );
    
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// User login
export const login = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    const token = jwt.sign(
      { id: user.id }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' }
    );
    
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};