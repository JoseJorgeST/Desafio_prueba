import express from 'express';
import Cliente from '../models/modelPrice.js';
import Product from '../models/modelProduct.js';

const router = express.Router();



router.get('/:user_id/:nombre_producto', async (req, res) => {
    const { user_id, nombre_producto } = req.params;

    const cliente = await Cliente.findOne({ id: parseInt(user_id) });

    if (!cliente) {
        return res.status(404).json({ error: 'Cliente no encontrado' });
    }

    if (cliente.metadata && cliente.metadata.precios_especiales && cliente.metadata.precios_especiales.length > 0) {
        // Buscar el precio especial del cliente para el producto dado
        const precioEspecial = cliente.metadata.precios_especiales.find(
            (precio) => precio.nombre_producto.toLowerCase() === nombre_producto.toLowerCase()
        );

        if (precioEspecial) {
            const producto = await Product.findOne({ nombre: { "$regex": nombre_producto, "$options": "i" } });
            if (!producto) {
                return res.status(404).json({ error: 'Producto no encontrado' });
            }
            return res.json({
                _id: precioEspecial._id,
                nombre: precioEspecial.nombre_producto,
                precio_Base: precioEspecial.precio_especial_personal,
                existencia: producto.existencia
            });
        }
    }

    
    const producto = await Product.findOne({ nombre: { "$regex": nombre_producto, "$options": "i" } });
    if (!producto) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }

    return res.json({
        _id: producto._id,
        nombre: producto.nombre,
        precio_base: producto.precio_base,
        existencia: producto.existencia
    });
});

    
router.get('/', async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los clientes' });
  }
});

export default router;

