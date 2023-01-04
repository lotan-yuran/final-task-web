import { selector } from "recoil";

export const cartItemSelector = selector({
  key: "cartItemSelector",
  get: async () => {
    // TODO: replace with async get request from db
    return [];
  }
});
