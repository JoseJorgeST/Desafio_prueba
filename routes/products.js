import express from 'express'
import modelProduct from '../models/modelProduct.js';


const router = express.Router();

router.get("/", async (req,res) => {
    try {
        const products = await modelProduct.find({ existencia: { $gt: 0 } });
        console.log(products)
        res.json(products);
        
    } catch (error) {
        res.status(500).json({error: 'Error al obtener los datos'})
    }
})

router.post("/", async (req,res)=>{
        try {
            const newProduct = await Product.create(req.body);
            res.status(201).json(newProduct);
        } catch (error) {
            res.status(500).json({error: 'No se pudp crear un nuevo producto'});
        }
    
});

router.put("/", async (req,res) => {
        try {
            const productId = req.params.id;
    
            
            const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, {
                new: true, 
                runValidators: true, 
            });
    
            if (!updatedProduct) {
                return res.status(404).json({ message: "Producto no encontrado" });
            }
    
            res.status(200).json(updatedProduct);
        } catch (error) {
            res.status(500).json(error);
        }
    
}) 

router.delete("/", async (req,res) => {
        try {
            const productId = req.params.id;
    
            
            const deletedProduct = await Product.findByIdAndDelete(productId);
    
            if (!deletedProduct) {
                return res.status(404).json({ message: "Producto no encontrado" });
            }
    
            res.status(200).json({ message: "Producto eliminado correctamente" });
        } catch (error) {
            res.status(500).json(error);
        }
    
    
});

export default router;