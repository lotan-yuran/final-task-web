import { selector } from "recoil";

export const userSelector = selector({
  key: "userSelector",
  get: async () => {
    return {};
  }
});
