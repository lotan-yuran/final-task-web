import { selector } from "recoil";
import { cartItemsState } from "./CartItemsAtom";

export const cartItemSelector = selector({
  key: "cartItemSelector",
  get: async () => {
    // TODO: replace with async get request from db
    return [];
  }
});

export const cartQuantityState = selector({
  key: "cartQuantityState",
  get: ({ get }) => {
    const cartItems = get(cartItemsState);
    return cartItems.reduce((accumulator, currentValue) => accumulator + currentValue.quantity, 0);
  }
});
