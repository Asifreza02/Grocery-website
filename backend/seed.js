require('dotenv').config({ path: '.env' });
const mongoose = require('mongoose');

const Category = require('./models/Category');
const Product = require('./models/Product');
const Slider = require('./models/Slider');

const MONGODB_URI = process.env.ATLAS_URI;

const categories = [
  { name: 'Fruits', icon: './uploads/fruits.png' },
  { name: 'Vegetables', icon: './uploads/vegetables.png' },
  { name: 'Dairy', icon: './uploads/dairy.png' },
  { name: 'Bakery', icon: './uploads/bakery.png' },
];

const products = [
  {
    name: 'Apple',
    description: 'Fresh and juicy apples',
    mrp: 60,
    sellingPrice: 55,
    category: 'Fruits',
    image: './uploads/apple.png',
  },
  {
    name: 'Banana',
    description: 'Ripe bananas',
    mrp: 30,
    sellingPrice: 25,
    category: 'Fruits',
    image: './uploads/banana.png',
  },
  {
    name: 'Carrot',
    description: 'Organic carrots',
    mrp: 20,
    sellingPrice: 18,
    category: 'Vegetables',
    image: './uploads/carrot.png',
  },
  {
    name: 'Broccoli',
    description: 'Fresh broccoli',
    mrp: 30,
    sellingPrice: 28,
    category: 'Vegetables',
    image: './uploads/broccoli.png',
  },
  {
    name: 'Milk',
    description: 'Fresh cow milk',
    mrp: 70,
    sellingPrice: 65,
    category: 'Dairy',
    image: './uploads/milk.png',
  },
  {
    name: 'Cheese',
    description: 'Aged cheddar cheese',
    mrp: 50,
    sellingPrice: 50,
    category: 'Dairy',
    image: './uploads/cheese.png',
  },
  {
    name: 'Bread',
    description: 'Whole wheat bread',
    mrp: 30,
    sellingPrice: 25,
    category: 'Bakery',
    image: './uploads/bread.png',
  },
  {
    name: 'Croissant',
    description: 'Buttery croissant',
    mrp: 40,
    sellingPrice: 30,
    category: 'Bakery',
    image: './uploads/croissant.png',
  },
];

const sliders = [
    { image: './uploads/slider1.png' },
    { image: './uploads/slider2.png' },
    { image: './uploads/slider3.png' },
];

const seedDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connected for seeding...');

    await Category.deleteMany({});
    await Product.deleteMany({});
    await Slider.deleteMany({});

    console.log('Cleared existing data.');

    await Slider.insertMany(sliders);
    console.log('Sliders seeded.');

    const createdCategories = await Category.insertMany(categories);
    console.log('Categories seeded.');

    const categoryMap = {};
    createdCategories.forEach(cat => {
      categoryMap[cat.name] = cat._id;
    });

    const productsWithCategories = products.map(product => {
        return {
            ...product,
            category: categoryMap[product.category],
        };
    });

    await Product.insertMany(productsWithCategories);
    console.log('Products seeded.');

  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    mongoose.connection.close();
    console.log('MongoDB connection closed.');
  }
};

seedDB();
