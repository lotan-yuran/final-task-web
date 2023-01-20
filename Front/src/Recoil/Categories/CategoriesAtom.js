import { atom } from "recoil";
import { categoriesSelector } from "./CategoriesSelector";

export const categoriesState = atom({
  key: "categoriesState",
  default: categoriesSelector
});
