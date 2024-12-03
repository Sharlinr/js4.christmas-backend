import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes.mjs';
import cartRoutes from './routes/cartRoutes.mjs';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

//IMG Express
app.use('/images', express.static('images'));

const PORT = process.env.port || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

/*Så två server ska köras som backend om man vill göra med json-server? 
tex, localhost:3000/api/products (server.mjs) och localhost:3001/products (json-server)? */
