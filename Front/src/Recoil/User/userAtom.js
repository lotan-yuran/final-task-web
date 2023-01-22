import { atom } from "recoil";
import { userSelector } from "./userSelector";

export const userState = atom({
  key: "userState",
  default: userSelector
});
