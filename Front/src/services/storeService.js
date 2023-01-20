import axios from "axios";
const { REACT_APP_SERVICE } = process.env;

export default {
  getItems: () => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${REACT_APP_SERVICE}/product`)
        .then(({ data }) => resolve(data))
        .catch(err => reject(err));
    });
  },

  addProduct: product => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${REACT_APP_SERVICE}/product`, product)
        .then(({ data }) => resolve(data))
        .catch(err => reject(err));
    });
  },

  deleteProduct: productId => {
    return new Promise((resolve, reject) => {
      axios
        .delete(`${REACT_APP_SERVICE}/product/${productId}`)
        .then(({ data }) => resolve(data))
        .catch(err => reject(err));
    });
  },

  editProduct: product => {
    return new Promise((resolve, reject) => {
      axios
        .put(`${REACT_APP_SERVICE}/product/${product._id}`, product)
        .then(({ data }) => resolve(data))
        .catch(err => reject(err));
    });
  },

  addOrder: order => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${REACT_APP_SERVICE}/order`, order)
        .then(({ data }) => resolve(data))
        .catch(err => reject(err));
    });
  }
};
