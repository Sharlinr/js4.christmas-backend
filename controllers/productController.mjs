import { fetchData } from '../utilities/httpClient.mjs';

export const listProducts = async (req, res) => {
  try {
    const products = await fetchData('/products'); //Data from JSON-server
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error('Error fetching products:', error.message);
    res
      .status(500)
      .json({ success: false, message: 'Failed to fetch products' });
  }
};

export const findProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await fetchData(`/products/${id}`); //GET from JSON-server

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error.message);
    res
      .status(500)
      .json({ success: false, message: 'Failed to fetch product' });
  }
};
