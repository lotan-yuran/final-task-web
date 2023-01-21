import { createAxiosInstance } from "../config/axiosInstance";
// eslint-disable-next-line no-undef
const { REACT_APP_SERVICE } = process.env;
const categoryAxiosInstance = createAxiosInstance(`${REACT_APP_SERVICE}/category`);

export default {
  getCategories: () => {
    return new Promise((resolve, reject) => {
      categoryAxiosInstance
        .get(``)
        .then(({ data }) => resolve(data))
        .catch(err => reject(err));
    });
  }
};
