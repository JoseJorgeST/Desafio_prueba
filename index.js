import express  from "express";
import dotenv from 'dotenv';
import productRoute from './routes/products.js';
import priceRoute from './routes/prices.js'
import mongoose  from "mongoose";

const app = express()
const port = 8800
dotenv.config()

app.use(express.json())

const connect = async () => {
    try {
        
        const databaseName = 'challenge';
        const myConn = await mongoose.connect(process.env.MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: databaseName
          });
        console.log('conectado a la base de dato')
    } catch (error) {
        console.log(error)
    }
}

app.use("/product", productRoute)
app.use("/price", priceRoute)




app.listen(port, () => {
    connect()
    console.log(`escuchando puerto  ${port}`)
})