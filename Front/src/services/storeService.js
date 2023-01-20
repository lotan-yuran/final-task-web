import { createAxiosInstance } from "../config/axiosInstance";
// eslint-disable-next-line no-undef
const { REACT_APP_SERVICE } = process.env;
const storeAxiosInstance = createAxiosInstance(REACT_APP_SERVICE);

export default {
  getItems: () => {
    return new Promise((resolve, reject) => {
      storeAxiosInstance
        .get(`${REACT_APP_SERVICE}/product`)
        .then(({ data }) => resolve(data))
        .catch(err => reject(err));
    });
  },

  addProduct: product => {
    return new Promise((resolve, reject) => {
      storeAxiosInstance
        .post(`${REACT_APP_SERVICE}/product`, product)
        .then(({ data }) => resolve(data))
        .catch(err => reject(err));
    });
  },

  deleteProduct: productId => {
    return new Promise((resolve, reject) => {
      storeAxiosInstance
        .delete(`${REACT_APP_SERVICE}/product/${productId}`)
        .then(({ data }) => resolve(data))
        .catch(err => reject(err));
    });
  },

  editProduct: product => {
    return new Promise((resolve, reject) => {
      storeAxiosInstance
        .put(`${REACT_APP_SERVICE}/product/${product._id}`, product)
        .then(({ data }) => resolve(data))
        .catch(err => reject(err));
    });
  },

  addOrder: order => {
    return new Promise((resolve, reject) => {
      storeAxiosInstance
        .post(`${REACT_APP_SERVICE}/order`, order)
        .then(({ data }) => resolve(data))
        .catch(err => reject(err));
    });
  },

  getCategories: () => {
    return new Promise((resolve, reject) => {
      storeAxiosInstance
        .get(`${REACT_APP_SERVICE}/category`)
        .then(({ data }) => resolve(data))
        .catch(err => reject(err));
    });
  }
};
