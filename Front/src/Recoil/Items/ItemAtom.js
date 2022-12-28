import { atom } from "recoil";
import { itemsSelector } from "./ItemSelector";

export const itemsState = atom({
  key: "itemsState",
  default: itemsSelector
});
