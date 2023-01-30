import { selector } from "recoil";
import { cartItemsState } from "./CartItemsAtom";
import { userState } from "../User/userAtom";
import cartService from "../../services/cartService";

export const cartItemSelector = selector({
  key: "cartItemSelector",
  get: async ({ get }) => {
    const { email: userId } = get(userState);
    try {
      const cart = await cartService.getCart(userId);
      return cart || [];
    } catch (error) {
      console.error(`cartItemSelector -> getCart() ERROR: \n${error}`);
      return [];
    }
  }
});

export const cartQuantityState = selector({
  key: "cartQuantityState",
  get: ({ get }) => {
    const cartItems = get(cartItemsState);
    return cartItems.reduce((accumulator, currentValue) => accumulator + currentValue.quantity, 0);
  }
});
