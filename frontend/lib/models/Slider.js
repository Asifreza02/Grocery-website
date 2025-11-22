
import mongoose from 'mongoose';

const SliderSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true
  }
}, { timestamps: true });

export default mongoose.models.Slider || mongoose.model('Slider', SliderSchema);
