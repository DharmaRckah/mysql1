import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      throw new Error();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);

    if (!user) {
      throw new Error();
    }

    req.userId = user.id;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Please authenticate' });
  }
};

export default auth;