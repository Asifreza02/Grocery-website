require('dotenv').config({ path: './backend/.env' });
const mongoose = require('mongoose');

const Category = require('./models/Category');
const Product = require('./models/Product');
const Slider = require('./models/Slider');

const MONGODB_URI = process.env.ATLAS_URI;

const categories = [
  { name: 'Fruits', icon: '/uploads/fruits.png' },
  { name: 'Vegetables', icon: '/uploads/vegetables.png' },
  { name: 'Dairy', icon: '/uploads/dairy.png' },
  { name: 'Bakery', icon: '/uploads/bakery.png' },
];

const products = [
  {
    name: 'Apple',
    description: 'Fresh and juicy apples',
    price: 2.5,
    category: 'Fruits',
    image: '/uploads/apple.png',
  },
  {
    name: 'Banana',
    description: 'Ripe bananas',
    price: 1.8,
    category: 'Fruits',
    image: '/uploads/banana.png',
  },
  {
    name: 'Carrot',
    description: 'Organic carrots',
    price: 1.2,
    category: 'Vegetables',
    image: '/uploads/carrot.png',
  },
  {
    name: 'Broccoli',
    description: 'Fresh broccoli',
    price: 2.0,
    category: 'Vegetables',
    image: '/uploads/broccoli.png',
  },
  {
    name: 'Milk',
    description: 'Fresh cow milk',
    price: 3.0,
    category: 'Dairy',
    image: '/uploads/milk.png',
  },
  {
    name: 'Cheese',
    description: 'Aged cheddar cheese',
    price: 5.5,
    category: 'Dairy',
    image: '/uploads/cheese.png',
  },
  {
    name: 'Bread',
    description: 'Whole wheat bread',
    price: 2.8,
    category: 'Bakery',
    image: '/uploads/bread.png',
  },
  {
    name: 'Croissant',
    description: 'Buttery croissant',
    price: 1.5,
    category: 'Bakery',
    image: '/uploads/croissant.png',
  },
];

const sliders = [
    { image: 'https://source.unsplash.com/random/800x600?fruits' },
    { image: 'https://source.unsplash.com/random/800x600?vegetables' },
    { image: 'https://source.unsplash.com/random/800x600?dairy' },
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
