import { selector } from "recoil";
import { userState } from "./userAtom";

export const userSelector = selector({
  key: "userSelector",
  get: async () => {
    return {};
  }
});

export const userDetailsSelector = selector({
  key: "userDetailsSelector",
  get: ({ get }) => ({ ...get(userState), phone: "", address: "" })
});
