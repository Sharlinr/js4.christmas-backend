import { fetchData, sendData } from '../utilities/httpClient.mjs';

const CART_ENDPOINT = process.env.CART_ENDPOINT || '/cart';
const PRODUCTS_ENDPOINT = process.env.PRODUCTS_ENDPOINT || '/products';

let cart = [];

export const listCartItems = async (req, res) => {
  try {
    //const cartItems = await fetchData(CART_ENDPOINT); // Hämta alla kundvagnsobjekt
    res.status(200).json({ success: true, data: cart });
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
    //console.log('Received data for cart:', newItem);
    const products = await fetchData(PRODUCTS_ENDPOINT);

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

    /*cart.push({ ...newItem, quantity: newItem.quantity || 1 });
    await sendData(CART_ENDPOINT, 'PUT', cart);
    res
      .status(201)
      .json({ success: true, message: 'Product added to cart', data: newItem });*/
  } catch (error) {
    console.error('Error adding to cart:', error.message);
    res.status(500).json({ success: false, message: 'Failed to add to cart' });
  }
};

export const removeFromCart = async (req, res) => {
  const { id } = req.params; // Hämta produktens id från URL

  try {
    console.log(`Trying to remove product with ID: ${id}`); // Logga för att verifiera att ID tas emot
    const productIndex = cart.findIndex(
      (product) => product.id === parseInt(id, 10)
    );

    if (productIndex === -1) {
      return res
        .status(404)
        .json({ success: false, message: 'Product not found in cart' });
    }

    cart.splice(productIndex, 1);

    await sendData(CART_ENDPOINT, 'PUT', cart);

    //Skicka tillbaka uppdaterad cart
    res
      .status(200)
      .json({ success: true, message: 'Item removed from cart', data: cart });
  } catch (error) {
    console.error('Error removing from cart:', error.message);
    res
      .status(500)
      .json({ success: false, message: 'Failed to remove from cart' });
  }
};

// Hämta alla varukorgsobjekt från json-server
/*const cartItems = await fetchData(CART_ENDPOINT);

    // Filtrera bort produkten med det specifika id:t
    const updatedCart = cartItems.filter(
      (product) => product.id !== parseInt(id, 10)
    );

    console.log('Updated cart after removal:', updatedCart); // Logga uppdaterad varukorg

    // Använd PUT för att uppdatera hela varukorgen i json-server
    // Skicka hela den uppdaterade varukorgen för att ersätta den gamla
    const updatedCartResponse = await sendData(
      CART_ENDPOINT,
      'PUT',
      updatedCart
    );

    // Svara tillbaka till frontend med den uppdaterade varukorgen
    res.status(200).json({
      success: true,
      message: 'Item removed from cart',
      data: updatedCartResponse,
    });
  } catch (error) {
    console.error('Error removing from cart:', error.message);
    res
      .status(500)
      .json({ success: false, message: 'Failed to remove from cart' });
  }
};*/

/*export const removeFromCart = async (req, res) => {
  const { id } = req.params;
  try {
    const cartItems = await sendData(`${CART_ENDPOINT}/${id}`, 'DELETE'); // Ta bort objekt
    res.status(200).json({ success: true, message: 'Item removed from cart' });
  } catch (error) {
    console.error('Error removing from cart:', error.message);
    res
      .status(500)
      .json({ success: false, message: 'Failed to remove from cart' });
  }
};*/

/*let cart = [];

export const getCart = async (req, res) => {
  try {
    const cartItems = await fetchData('/cart');
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
    const { id, name, price } = req.body;

    const addedProduct = cart.find((product) => product.id === id);

    if (addedProduct) {
      addedProduct.quantity += 1;
    } else {
      cart.push({ id, name, price, quantity: 1 });
    }

    res.status(201).json({ success: true, data: cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const removeFromCart = (req, res) => {
  try {
    const { id } = req.params;

    cart = cart.filter((product) => product.id !== parseInt(id, 10));
    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
*/
