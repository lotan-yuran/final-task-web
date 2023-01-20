import { createAxiosInstance } from "../config/axiosInstance";
const firebaseAxiosInstance = createAxiosInstance(process.env.REACT_APP_FIREBASE);
export default {
  registerUser: (email, password) => {
    const body = {
        email,
        password,
        returnSecureToken: true
    };

    return new Promise((resolve, reject) => {
        firebaseAxiosInstance
        .post(`:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`, body)
        .then(({ data }) => resolve(data))
        .catch(err => reject(err));
    });
  },

  loginUser: (email, password) => {
     const body = {
        email,
        password,
        returnSecureToken: true
    };

    return new Promise((resolve, reject) => {
        firebaseAxiosInstance
        .post(`:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`, body)
        .then(({ data }) => resolve(data))
        .catch(err => reject(err));
    });
  }

};
