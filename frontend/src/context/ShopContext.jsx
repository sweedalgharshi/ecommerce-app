import { createContext } from "react";
import { products } from "../assets/assets";

export const ShopContext = createContext();

function ShopContextProvider({ children }) {
  const currency = "$";
  const delivery_fee = 10;

  const value = {
    products,
    currency,
    delivery_fee,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export default ShopContextProvider;
