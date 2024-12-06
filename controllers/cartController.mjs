import { fetchData, sendData } from '../utilities/httpClient.mjs';
import { handleError } from '../utilities/handleError.mjs';
import { sendSuccessResponse } from '../utilities/sendSuccessResponse.mjs';
const CART_ENDPOINT = process.env.CART_ENDPOINT || '/cart';

export const listCartItems = async (req, res) => {
  try {
    const cartItems = await fetchData(CART_ENDPOINT);
    sendSuccessResponse(
      res,
      200,
      cartItems,
      'Cart items fetched in listCartItems'
    );
  } catch (error) {
    handleError(res, error, 'Failed to fetch cart items in listCartItems');
  }
};

export const addToCart = async (req, res) => {
  const newItem = req.body;

  try {
    const cartItems = await fetchData(CART_ENDPOINT);
    const addedProduct = cartItems.find((product) => product.id === newItem.id);

    if (addedProduct) {
    } else {
      const addNewProduct = await sendData(CART_ENDPOINT, 'POST', newItem);
      sendSuccessResponse(
        res,
        201,
        addNewProduct,
        'Product added to cart in addToCart controller'
      );
    }
  } catch (error) {
    handleError(res, error, 'Failed to add to cart in addToCart controlller');
  }
};

export const removeFromCart = async (req, res) => {
  const { id } = req.params;

  try {
    console.log(`Trying to remove product with ID: ${id}`);

    await sendData(`${CART_ENDPOINT}/${id}`, 'DELETE');

    sendSuccessResponse(
      res,
      200,
      null,
      'Item removed from cart in remove in cartController'
    );
  } catch (error) {
    handleError(
      res,
      error,
      'Failed to remove from cart in remove in cartController '
    );
  }
};
