import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Optional: track who added
}, {
  timestamps: true // ✅ correct key
});

export const productModel = mongoose.model("Product", productSchema);
export default productModel;
