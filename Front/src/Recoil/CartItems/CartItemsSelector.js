import { selector } from "recoil";
import storeService from "../../services/storeService";

export const cartItemSelector = selector({
  key: "cartItemSelector",
  get: async () => {
    // TODO: replace with async get request from db
    return [];
  }
});
