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
  get: ({ get }) => {
    const { email, name } = get(userState);
    return { userId: email, name: name, phone: "", address: "" };
  }
});
