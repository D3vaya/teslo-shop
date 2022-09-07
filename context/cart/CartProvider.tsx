import { FC, useReducer } from "react";
import { ICartProduct } from "../../interfaces";
import { CartContext, cartReducer } from "./";

export interface CartState {
  cart: ICartProduct[];
}

const CART_INITIAL_STATE: CartState = {
  cart: [],
};

interface CartProviderProps {
  children?: JSX.Element;
}

export const CartProvider: FC<CartProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

  const addProductToCart = (product: ICartProduct) => {
    //NIVEL 1
    //dispatch({ type: "[Cart] - Add Product", payload: p });
    //NIVEL 2
    // const productsInCart = state.cart.filter(
    //   (p) => p._id !== product._id && p.size !== product.size
    // );
    // dispatch({
    //   type: "[Cart] - Add Product",
    //   payload: [...productsInCart, product],
    // });

    //NIVEL FINAL
    const productInCart = state.cart.some((p) => p._id === product._id);
    if (!productInCart)
      return dispatch({
        type: "[Cart] - Update products in cart",
        payload: [...state.cart, product],
      });

    const productInCartDifferentSize = state.cart.some(
      (p) => p._id === product._id && p.size === product.size
    );
    if (!productInCartDifferentSize)
      return dispatch({
        type: "[Cart] - Update products in cart",
        payload: [...state.cart, product],
      });

    //acomular
    const updatedProducts = state.cart.map((p) => {
      if (p._id !== product._id) return p;
      if (p.size !== product.size) return p;
      //up qty
      p.quantity += product.quantity;
      return p;
    });

    return dispatch({
      type: "[Cart] - Update products in cart",
      payload: updatedProducts,
    });
  };

  return (
    <CartContext.Provider value={{ ...state, addProductToCart }}>
      {children}
    </CartContext.Provider>
  );
};
