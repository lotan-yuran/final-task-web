import { selector } from "recoil";
import storeService from "../../services/storeService";

export const categoriesSelector = selector({
  key: "categoriesSelector",
  get: async () => {
    try {
      const categories = await storeService.getCategories();
      return categories || [];
    } catch (error) {
      console.error(`categoriesSelector -> getCategories() ERROR: \n${error}`);
      return [];
    }
  }
});
