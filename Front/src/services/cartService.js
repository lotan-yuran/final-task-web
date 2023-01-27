import { createAxiosInstance } from "../config/axiosInstance";
// eslint-disable-next-line no-undef
const { REACT_APP_SERVICE } = process.env;
const cartAxiosInstance = createAxiosInstance(`${REACT_APP_SERVICE}/cart`);

export default {
  getCart: userId => {
    return new Promise((resolve, reject) => {
      cartAxiosInstance
        .get(`/${userId}`)
        .then(({ data }) => resolve(data))
        .catch(err => reject(err));
    });
  },
  updateCart: (userId, products) => {
    return new Promise((resolve, reject) => {
      cartAxiosInstance
        .put(`/${userId}`, { userId, products })
        .then(({ data }) => resolve(data))
        .catch(err => reject(err));
    });
  }
};
