import mongoose from 'mongoose';

// Ensure User and Product models are registered
import './User';
import './Product';

const cartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, default: 1 },
}, { timestamps: true });

export default mongoose.models.Cart || mongoose.model('Cart', cartSchema);
