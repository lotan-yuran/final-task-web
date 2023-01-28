// eslint-disable-next-line no-undef
const { REACT_APP_SERVICE } = process.env;
import { createAxiosInstance } from "../config/axiosInstance";
const adminAxiosInstance = createAxiosInstance(`${REACT_APP_SERVICE}/admin`);

export default {
  isAdmin: userEmail => {
    return new Promise((resolve, reject) => {
      adminAxiosInstance
        .get(`/isAdmin/${userEmail}`)
        .then(({ data }) => resolve(data))
        .catch(err => reject(err));
    });
  }
};
