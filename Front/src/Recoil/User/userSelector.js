import { selector } from "recoil";
import { userState } from "./userAtom";

export const userDetailsSelector = selector({
  key: "userDetailsSelector",
  get: ({ get }) => {
    const { email, name } = get(userState);
    return { userId: email, name: name, phone: "", address: "" };
  }
});
