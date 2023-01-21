import { selector } from "recoil";
import productService from "../../services/productService";

export const itemsSelector = selector({
  key: "itemsSelector",
  get: async () => {
    try {
      const items = await productService.getProducts();
      return items || [];
    } catch (error) {
      console.error(`itemsSelector -> getProducts() ERROR: \n${error}`);
      return [];
    }
  }
});
