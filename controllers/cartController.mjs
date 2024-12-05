import { fetchData, sendData } from '../utilities/httpClient.mjs';
import { handleError } from '../utilities/handleError.mjs';
import { sendSuccessResponse } from '../utilities/sendSuccessResponse.mjs';
const CART_ENDPOINT = process.env.CART_ENDPOINT || '/cart';
const PRODUCTS_ENDPOINT = process.env.PRODUCTS_ENDPOINT || '/products';

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

/* res.status(500).json({
      success: false,
      message: 'Failed to fetch cart items cartController',
    });
  }
};*/

export const addToCart = async (req, res) => {
  const newItem = req.body;

  try {
    //console.log(newItem.id, 'hit');
    const cartItems = await fetchData(CART_ENDPOINT);
    const addedProduct = cartItems.find((product) => product.id === newItem.id);

    //console.log(cartItems, newItem.id, 'hit igen');

    if (addedProduct) {
      /*  //addedProduct.quantity += newItem.quantity || 1;
      addedProduct.quantity +=
        newItem.quantity !== undefined ? newItem.quantity : 1;
      const updatedCart = await sendData(CART_ENDPOINT, 'POST', addedProduct); //Update cart in backend
      return res.status(200).json({
        success: true,
        message: 'Product quantity updated',
        data: updatedCart,
      });*/
      //updateCartProductQuantity();
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

/*export const updateCartProductQuantity = async (req, res) => {
  const { id } = req.params;
  const updateItem = req.body;
  try {
    const cartItems = await fetchData(CART_ENDPOINT);
    const addedProduct = cartItems.find(
      (product) => product.id === updateItem.id
    );

    console.log(cartItems, updateItem.id, 'hit igen');

    addedProduct.quantity +=
      updateItem.quantity !== undefined ? updateItem.quantity : 1;
    const updatedCart = await sendData(
      `${CART_ENDPOINT}/${id}`,
      'PUT',
      addedProduct
    ); //Update cart in backend
    return res.status(200).json({
      success: true,
      message: 'Product quantity updated',
      data: updatedCart,
    });
  } catch (error) {
    console.error(
      'Error updating quantity cart cartController:',
      error.message
    );
    res
      .status(500)
      .json({ success: false, message: 'Failed to quantity to cart' });
  }
};*/

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
