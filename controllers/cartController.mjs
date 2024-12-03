import { fetchData, sendData } from '../utilities/httpClient.mjs';

const CART_ENDPOINT = process.env.CART_ENDPOINT || '/cart';
const PRODUCTS_ENDPOINT = process.env.PRODUCTS_ENDPOINT || '/products';

let cart = [];

export const listCartItems = async (req, res) => {
  try {
    const cartItems = await fetchData(CART_ENDPOINT); // Hämta alla kundvagnsobjekt
    res.status(200).json({ success: true, data: cartItems });
  } catch (error) {
    console.error('Error fetching cart items:', error.message);
    res
      .status(500)
      .json({ success: false, message: 'Failed to fetch cart items' });
  }
};

export const addToCart = async (req, res) => {
  try {
    const newItem = req.body;
    const cartItems = await fetchData(CART_ENDPOINT);
    const addedProduct = cartItems.find((product) => product.id === newItem.id);

    if (addedProduct) {
      addedProduct.quantity += newItem.quantity || 1;
      const updatedCart = await sendData(CART_ENDPOINT, 'PUT', cartItems); //Update cart in backend
      return res.status(200).json({
        success: true,
        message: 'Product quantity updated',
        data: updatedCart,
      });
    } else {
      const addNewProduct = await sendData(CART_ENDPOINT, 'POST', newItem);
      return res.status(201).json({ success: true, data: addNewProduct });
    }
  } catch (error) {
    console.error('Error adding to cart:', error.message);
    res.status(500).json({ success: false, message: 'Failed to add to cart' });
  }
};

export const removeFromCart = async (req, res) => {
  const { id } = req.params;

  try {
    console.log(`Trying to remove product with ID: ${id}`);

    await sendData(`${CART_ENDPOINT}/${id}`, 'DELETE');

    res.status(200).json({ success: true, message: 'Item removed from cart' });
  } catch (error) {
    console.error('Error removing from cart:', error.message);
    res
      .status(500)
      .json({ success: false, message: 'Failed to remove from cart' });
  }
};
