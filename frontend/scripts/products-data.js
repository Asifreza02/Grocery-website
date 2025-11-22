// Products to add to the database
// Run this in MongoDB or use a script to insert these products

const productsToAdd = [
    // Fruits Category
    {
        name: "Fresh Apples",
        description: "Crisp and sweet red apples",
        mrp: 120,
        sellingPrice: 99,
        category: "ObjectId('your-fruits-category-id')", // Replace with actual category ID
        image: "/uploads/apple.png"
    },
    {
        name: "Ripe Bananas",
        description: "Fresh yellow bananas, rich in potassium",
        mrp: 60,
        sellingPrice: 49,
        category: "ObjectId('your-fruits-category-id')",
        image: "/uploads/banana.png"
    },
    {
        name: "Fresh Oranges",
        description: "Juicy and vitamin C rich oranges",
        mrp: 100,
        sellingPrice: 85,
        category: "ObjectId('your-fruits-category-id')",
        image: "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=400"
    },
    {
        name: "Strawberries",
        description: "Sweet and fresh strawberries",
        mrp: 180,
        sellingPrice: 159,
        category: "ObjectId('your-fruits-category-id')",
        image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400"
    },

    // Vegetables Category
    {
        name: "Fresh Carrots",
        description: "Organic carrots, crunchy and nutritious",
        mrp: 50,
        sellingPrice: 40,
        category: "ObjectId('your-vegetables-category-id')",
        image: "/uploads/carrot.png"
    },
    {
        name: "Green Broccoli",
        description: "Fresh broccoli, rich in vitamins",
        mrp: 80,
        sellingPrice: 70,
        category: "ObjectId('your-vegetables-category-id')",
        image: "/uploads/broccoli.png"
    },
    {
        name: "Fresh Tomatoes",
        description: "Ripe red tomatoes, perfect for salads",
        mrp: 40,
        sellingPrice: 30,
        category: "ObjectId('your-vegetables-category-id')",
        image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400"
    },
    {
        name: "Cucumbers",
        description: "Fresh green cucumbers",
        mrp: 35,
        sellingPrice: 28,
        category: "ObjectId('your-vegetables-category-id')",
        image: "https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?w=400"
    },
    {
        name: "Potatoes",
        description: "Fresh potatoes, versatile cooking ingredient",
        mrp: 30,
        sellingPrice: 25,
        category: "ObjectId('your-vegetables-category-id')",
        image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400"
    },
    {
        name: "Onions",
        description: "Fresh onions for everyday cooking",
        mrp: 40,
        sellingPrice: 32,
        category: "ObjectId('your-vegetables-category-id')",
        image: "https://images.unsplash.com/photo-1587049332674-3c-ec-91f8f5b?w=400"
    },

    // Dairy Category 
    {
        name: "Fresh Milk",
        description: "Full cream fresh milk, 1 liter",
        mrp: 60,
        sellingPrice: 55,
        category: "ObjectId('your-dairy-category-id')",
        image: "/uploads/milk.png"
    },
    {
        name: "Cheese Slices",
        description: "Processed cheese slices, 200g",
        mrp: 120,
        sellingPrice: 110,
        category: "ObjectId('your-dairy-category-id')",
        image: "/uploads/cheese.png"
    },
    {
        name: "Greek Yogurt",
        description: "Creamy Greek yogurt, 500g",
        mrp: 90,
        sellingPrice: 80,
        category: "ObjectId('your-dairy-category-id')",
        image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400"
    },
    {
        name: "Butter",
        description: "Fresh butter, 250g",
        mrp: 160,
        sellingPrice: 145,
        category: "ObjectId('your-dairy-category-id')",
        image: "https://images.unsplash.com/photo-1589985270047-0d97d4c93f80?w=400"
    },

    // Bakery Category
    {
        name: "White Bread",
        description: "Freshly baked white bread loaf",
        mrp: 45,
        sellingPrice: 40,
        category: "ObjectId('your-bakery-category-id')",
        image: "/uploads/bread.png"
    },
    {
        name: "Croissants",
        description: "Buttery French croissants, pack of 4",
        mrp: 100,
        sellingPrice: 90,
        category: "ObjectId('your-bakery-category-id')",
        image: "/uploads/croissant.png"
    },
    {
        name: "Whole Wheat Bread",
        description: "Healthy whole wheat bread",
        mrp: 50,
        sellingPrice: 45,
        category: "ObjectId('your-bakery-category-id')",
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400"
    }
];

// To insert these products:
// 1. Get category IDs from your database
// 2. Replace 'ObjectId('your-category-id')' with actual IDs
// 3. Use MongoDB Compass or Atlas to insert these documents into the 'products' collection
// OR use this script in Node.js:

/*
const mongoose = require('mongoose');
const Product = require('./models/Product');

async function addProducts() {
  await mongoose.connect(process.env.ATLAS_URI);
  
  // Get category IDs
  const Category = require('./models/Category');
  const fruits = await Category.findOne({ name: 'Fruits' });
  const vegetables = await Category.findOne({ name: 'Vegetables' });
  const dairy = await Category.findOne({ name: 'Dairy' });
  const bakery = await Category.findOne({ name: 'Bakery' });
  
  // Update category IDs in productsToAdd array
  const products = productsToAdd.map(p => {
    if (p.category.includes('fruits')) p.category = fruits._id;
    if (p.category.includes('vegetables')) p.category = vegetables._id;
    if (p.category.includes('dairy')) p.category = dairy._id;
    if (p.category.includes('bakery')) p.category = bakery._id;
    return p;
  });
  
  await Product.insertMany(products);
  console.log('Products added successfully!');
  process.exit();
}

addProducts();
*/

module.exports = productsToAdd;
