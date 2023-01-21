import { selector } from "recoil";
import categoryService from "../../services/categoryService";

export const categoriesSelector = selector({
  key: "categoriesSelector",
  get: async () => {
    try {
      const categories = await categoryService.getCategories();
      return categories || [];
    } catch (error) {
      console.error(`categoriesSelector -> getCategories() ERROR: \n${error}`);
      return [];
    }
  }
});
