import mongoose from 'mongoose';
const { Schema } = mongoose;

const productSchema = new mongoose.Schema({
    "nombre": String,
    "precio_base": Number,
    "existencia": Number,
  });
  

  export default mongoose.model("Product", productSchema);
  