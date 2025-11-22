const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Read .env.local
const envPath = path.join(__dirname, '..', '.env.local');
const envFile = fs.readFileSync(envPath, 'utf8');
const envLines = envFile.split('\n');

let ATLAS_URI = '';
for (const line of envLines) {
    if (line.startsWith('ATLAS_URI=')) {
        ATLAS_URI = line.replace('ATLAS_URI=', '').trim();
    }
}

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    mrp: Number,
    sellingPrice: Number,
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    image: String
});

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

async function fixButterImage() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(ATLAS_URI);
        console.log('✅ Connected to MongoDB');

        console.log('Finding Butter product...');
        const butter = await Product.findOne({ name: 'Butter' });

        if (!butter) {
            console.log('❌ Butter product not found');
            process.exit(1);
        }

        console.log(`Found Butter product: ${butter.name}`);
        console.log(`Current image: ${butter.image}`);

        // Update with a different working image URL
        butter.image = 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400';
        await butter.save();

        console.log('✅ Butter image updated successfully!');
        console.log(`New image: ${butter.image}`);

        await mongoose.connection.close();
        console.log('✅ Database connection closed');
        process.exit(0);

    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

fixButterImage();
