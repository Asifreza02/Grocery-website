
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  mrp: { type: Number, required: true },
  sellingPrice: { type: Number, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  image: { type: String },
}, {
  timestamps: true,
});

export default mongoose.models.Product || mongoose.model('Product', productSchema);
