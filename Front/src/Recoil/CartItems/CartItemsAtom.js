import { atom } from "recoil";
import { cartItemSelector } from "./CartItemsSelector";

export const cartItemsState = atom({
  key: "cartItemsState",
  default: cartItemSelector
});
