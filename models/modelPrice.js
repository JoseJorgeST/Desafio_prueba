import mongoose from 'mongoose';
const { Schema } = mongoose;

const precioEspecialSchema = new Schema({
    nombre_producto: String,
    precio_especial_personal: Number,
  });
  
  const clienteSchema = new Schema({
    id: Number,
    nombre: String,
    metadata: {
      precios_especiales: [precioEspecialSchema],
    },
  });

export default mongoose.model('users', clienteSchema);
