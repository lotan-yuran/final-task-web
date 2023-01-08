import { selector } from "recoil";
import storeService from "../../services/storeService";

export const itemsSelector = selector({
  key: "itemsSelector",
  get: async () => {
    try {
      const items = await storeService.getItems();
      return items || [];
    } catch (error) {
      console.error(`itemsSelector -> getItems() ERROR: \n${error}`);
      return [];
    }
  }
});
