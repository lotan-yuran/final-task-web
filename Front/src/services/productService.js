import { createAxiosInstance } from "../config/axiosInstance";
// eslint-disable-next-line no-undef
const { REACT_APP_SERVICE } = process.env;
const productAxiosInstance = createAxiosInstance(`${REACT_APP_SERVICE}/product`);

export default {
  getProducts: () => {
    return new Promise((resolve, reject) => {
      productAxiosInstance
        .get(``)
        .then(({ data }) => resolve(data))
        .catch(err => reject(err));
    });
  },

  addProduct: product => {
    const newProduct = { ...product, categoryId: product.category._id };
    return new Promise((resolve, reject) => {
      productAxiosInstance
        .post(``, newProduct)
        .then(({ data }) => resolve(data))
        .catch(err => reject(err));
    });
  },

  deleteProduct: productId => {
    return new Promise((resolve, reject) => {
      productAxiosInstance
        .delete(`/${productId}`)
        .then(({ data }) => resolve(data))
        .catch(err => reject(err));
    });
  },

  editProduct: product => {
    return new Promise((resolve, reject) => {
      productAxiosInstance
        .put(`/${product._id}`, product)
        .then(({ data }) => resolve(data))
        .catch(err => reject(err));
    });
  }
};
