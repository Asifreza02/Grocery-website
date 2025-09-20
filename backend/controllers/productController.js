const Product = require('../models/Product');
const Category = require('../models/Category');

exports.getProducts = async (req, res) => {
  const categoryName = req.query.category;
  try {
    let products;
    if (categoryName) {
      const category = await Category.findOne({ name: categoryName });
      if (category) {
        products = await Product.find({ category: category._id }).populate('category');
      } else {
        products = [];
      }
    } else {
      products = await Product.find().populate('category');
    }
    res.json({ data: products });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createProduct = async (req, res) => {
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: req.body.image
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
