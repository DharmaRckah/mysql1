import Product from '../models/ProductModel.js';

// Create product
export const createProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const product = await Product.create({
      name,
      description,
      price,
      userId: req.userId
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create product' });
  }
};

// Get user's products
export const getUserProducts = async (req, res) => {
  try {
    const products = await Product.findAll({ 
      where: { userId: req.userId },
      order: [['createdAt', 'DESC']]
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch products' });
  }
};

// Delete product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: {
        id: req.params.id,
        userId: req.userId
      }
    });
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    await product.destroy();
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete product' });
  }
};