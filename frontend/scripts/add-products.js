const mongoose = require('mongoose');

// Define schemas inline
const categorySchema = new mongoose.Schema({
    name: String,
    icon: String
});

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    mrp: Number,
    sellingPrice: Number,
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    image: String
});

const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

async function addProducts() {
    try {
        // Read .env.local file manually
        const fs = require('fs');
        const path = require('path');

        const envPath = path.join(__dirname, '..', '.env.local');
        const envFile = fs.readFileSync(envPath, 'utf8');
        const envLines = envFile.split('\n');

        let ATLAS_URI = '';
        for (const line of envLines) {
            if (line.startsWith('ATLAS_URI=')) {
                ATLAS_URI = line.replace('ATLAS_URI=', '').trim();
            }
        }

        if (!ATLAS_URI) {
            console.log('❌ ATLAS_URI not found in .env.local');
            process.exit(1);
        }

        console.log('Connecting to MongoDB...');
        await mongoose.connect(ATLAS_URI);
        console.log('✅ Connected to MongoDB');

        // Get category IDs
        console.log('Fetching categories...');
        const categories = await Category.find();

        if (categories.length === 0) {
            console.log('❌ No categories found. Please add categories first.');
            process.exit(1);
        }

        const categoryMap = {};
        categories.forEach(cat => {
            categoryMap[cat.name.toLowerCase()] = cat._id;
            console.log(`Found category: ${cat.name} - ID: ${cat._id}`);
        });

        console.log('\nPreparing products to add...');

        const productsToAdd = [
            // Fruits Category
            {
                name: "Fresh Apples",
                description: "Crisp and sweet red apples",
                mrp: 120,
                sellingPrice: 99,
                category: categoryMap['fruits'],
                image: "/uploads/apple.png"
            },
            {
                name: "Ripe Bananas",
                description: "Fresh yellow bananas, rich in potassium",
                mrp: 60,
                sellingPrice: 49,
                category: categoryMap['fruits'],
                image: "/uploads/banana.png"
            },
            {
                name: "Fresh Oranges",
                description: "Juicy and vitamin C rich oranges",
                mrp: 100,
                sellingPrice: 85,
                category: categoryMap['fruits'],
                image: "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=400"
            },
            {
                name: "Strawberries",
                description: "Sweet and fresh strawberries",
                mrp: 180,
                sellingPrice: 159,
                category: categoryMap['fruits'],
                image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400"
            },

            // Vegetables Category
            {
                name: "Fresh Carrots",
                description: "Organic carrots, crunchy and nutritious",
                mrp: 50,
                sellingPrice: 40,
                category: categoryMap['vegetables'],
                image: "/uploads/carrot.png"
            },
            {
                name: "Green Broccoli",
                description: "Fresh broccoli, rich in vitamins",
                mrp: 80,
                sellingPrice: 70,
                category: categoryMap['vegetables'],
                image: "/uploads/broccoli.png"
            },
            {
                name: "Fresh Tomatoes",
                description: "Ripe red tomatoes, perfect for salads",
                mrp: 40,
                sellingPrice: 30,
                category: categoryMap['vegetables'],
                image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400"
            },
            {
                name: "Cucumbers",
                description: "Fresh green cucumbers",
                mrp: 35,
                sellingPrice: 28,
                category: categoryMap['vegetables'],
                image: "https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?w=400"
            },
            {
                name: "Potatoes",
                description: "Fresh potatoes, versatile cooking ingredient",
                mrp: 30,
                sellingPrice: 25,
                category: categoryMap['vegetables'],
                image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400"
            },
            {
                name: "Onions",
                description: "Fresh onions for everyday cooking",
                mrp: 40,
                sellingPrice: 32,
                category: categoryMap['vegetables'],
                image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400"
            },

            // Dairy Category
            {
                name: "Fresh Milk",
                description: "Full cream fresh milk, 1 liter",
                mrp: 60,
                sellingPrice: 55,
                category: categoryMap['dairy'],
                image: "/uploads/milk.png"
            },
            {
                name: "Cheese Slices",
                description: "Processed cheese slices, 200g",
                mrp: 120,
                sellingPrice: 110,
                category: categoryMap['dairy'],
                image: "/uploads/cheese.png"
            },
            {
                name: "Greek Yogurt",
                description: "Creamy Greek yogurt, 500g",
                mrp: 90,
                sellingPrice: 80,
                category: categoryMap['dairy'],
                image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400"
            },
            {
                name: "Butter",
                description: "Fresh butter, 250g",
                mrp: 160,
                sellingPrice: 145,
                category: categoryMap['dairy'],
                image: "https://images.unsplash.com/photo-1589985270047-0d97d4c93f80?w=400"
            },

            // Bakery Category
            {
                name: "White Bread",
                description: "Freshly baked white bread loaf",
                mrp: 45,
                sellingPrice: 40,
                category: categoryMap['bakery'],
                image: "/uploads/bread.png"
            },
            {
                name: "Croissants",
                description: "Buttery French croissants, pack of 4",
                mrp: 100,
                sellingPrice: 90,
                category: categoryMap['bakery'],
                image: "/uploads/croissant.png"
            },
            {
                name: "Whole Wheat Bread",
                description: "Healthy whole wheat bread",
                mrp: 50,
                sellingPrice: 45,
                category: categoryMap['bakery'],
                image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400"
            }
        ];

        // Filter out products with undefined categories
        const validProducts = productsToAdd.filter(p => p.category);

        if (validProducts.length === 0) {
            console.log('❌ No valid products to add. Check if categories exist.');
            process.exit(1);
        }

        console.log(`\nAdding ${validProducts.length} products...`);

        await Product.insertMany(validProducts);

        console.log('✅ Products added successfully!');
        console.log(`\nSummary:`);
        console.log(`- Total products added: ${validProducts.length}`);
        validProducts.forEach((p, i) => {
            console.log(`  ${i + 1}. ${p.name} - ₹${p.sellingPrice}`);
        });

        await mongoose.connection.close();
        console.log('\n✅ Database connection closed');
        process.exit(0);

    } catch (error) {
        console.error('❌ Error:', error.message);
        if (error.code === 11000) {
            console.log('Note: Some products may already exist in the database.');
        }
        process.exit(1);
    }
}

addProducts();
