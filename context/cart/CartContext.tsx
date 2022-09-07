import { createContext } from "react";
import { ICartProduct } from "../../interfaces";

export interface ContextProps {
  cart: ICartProduct[];
  addProductToCart: (p: ICartProduct) => void;
}

export const CartContext = createContext({} as ContextProps);
