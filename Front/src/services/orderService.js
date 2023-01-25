import { createAxiosInstance } from "../config/axiosInstance";
// eslint-disable-next-line no-undef
const { REACT_APP_SERVICE } = process.env;
const orderAxiosInstance = createAxiosInstance(`${REACT_APP_SERVICE}/order`);

export default {
  addOrder: order => {
    return new Promise((resolve, reject) => {
      orderAxiosInstance
        .post(``, order)
        .then(({ data }) => resolve(data))
        .catch(err => reject(err));
    });
  },

  getUserOrders: userId => {
    return new Promise((resolve, reject) => {
      orderAxiosInstance
        .get(`/${userId}`)
        .then(({ data }) => resolve(data))
        .catch(err => reject(err));
    });
  },

  cancelOrder: orderId => {
    return new Promise((resolve, reject) => {
      orderAxiosInstance
        .delete(`/${orderId}`)
        .then(({ data }) => resolve(data))
        .catch(err => reject(err));
    });
  },

  getOrdersCountByUser: () => {
    return new Promise((resolve, reject) => {
      orderAxiosInstance
        .get(`/count-by-user`)
        .then(({ data }) => resolve(data))
        .catch(err => reject(err));
    });
  }
};
