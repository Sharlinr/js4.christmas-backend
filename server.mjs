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
//app.use('/products', productRoutes);

//const jsonRouter = router('db.json');
//const middlewares = defaults();

//app.use(middlewares);
//app.use('/api', jsonRouter);
/*//Proxy-route for products
app.get('/api/products', async (req, res) => {
  try {
    //Proxy calls to json-server
    const response = await fetch('http://localhost:3001/products');
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products 3001' });
  }
});

//Proxy route for product id
app.get('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await fetch(`http://localhost:3001/products/${id}`);
    const data = await response.json();

    if (!data) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
}); */

const PORT = process.env.port || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

/*Så två server ska köras som backend om man vill göra med json-server? 
tex, localhost:3000/api/products (server.mjs) och localhost:3001/products (json-server)? */
