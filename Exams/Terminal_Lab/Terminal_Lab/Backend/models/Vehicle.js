import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  type: { type: String, enum: ['sedan', 'suv', 'suv'], required: true },
  image: { type: String } // Will hold the filename
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);
export default Vehicle