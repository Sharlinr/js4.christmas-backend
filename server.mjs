import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes.mjs';
import cartRoutes from './routes/cartRoutes.mjs';

dotenv.config();

const app = express();
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

/*app.get('/api/products', async (req, res) => {
  try {
    const response = await fetch('http://localhost:3001/products');
    const products = await response.json();
    res.status(200).json(products); // Skicka tillbaka produkterna från JSON-server
  } catch (error) {
    console.error('Error fetching products from JSON-server:', error);
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// Proxy-route för produktdetaljer
app.get('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await fetch(`http://localhost:3001/products/${id}`);
    const product = await response.json();
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    res.status(500).json({ message: 'Error fetching product' });
  }
});*/

//IMG Express
app.use('/images', express.static('images'));
//app.use('/images', express.static(path.join(__dirname, 'images')));

const PORT = process.env.port || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

/*Så två server ska köras som backend om man vill göra med json-server? 
tex, localhost:3000/api/products (server.mjs) och localhost:3001/products (json-server)? */
