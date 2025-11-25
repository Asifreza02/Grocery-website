import mongoose from 'mongoose';

// Ensure Category model is registered
import './Category';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    mrp: { type: Number, required: true },
    sellingPrice: { type: Number, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    image: { type: String },
    weight: { type: String },
    brand: { type: String },
    rating: { type: Number, default: 0 },
    reviewsCount: { type: Number, default: 0 },
    isBestSeller: { type: Boolean, default: false },
}, {
    timestamps: true,
});

export default mongoose.models.Product || mongoose.model('Product', productSchema);
