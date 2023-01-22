import { createAxiosInstance } from "../config/axiosInstance";
// eslint-disable-next-line no-undef
const { REACT_APP_FIREBASE, REACT_APP_FIREBASE_KEY } = process.env;
const firebaseAxiosInstance = createAxiosInstance(REACT_APP_FIREBASE);

export default {
  registerUser: (email, password) => {
    const body = {
      email,
      password,
      returnSecureToken: true
    };

    return new Promise((resolve, reject) => {
      firebaseAxiosInstance
        .post(`:signUp?key=${REACT_APP_FIREBASE_KEY}`, body)
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
        .post(`:signInWithPassword?key=${REACT_APP_FIREBASE_KEY}`, body)
        .then(({ data }) => resolve(data))
        .catch(err => reject(err));
    });
  },

  setUserFullName: (idToken, displayName) => {
    const body = {
      idToken,
      displayName
    };

    return new Promise((resolve, reject) => {
      firebaseAxiosInstance
        .post(`:update?key=${REACT_APP_FIREBASE_KEY}`, body)
        .then(({ data }) => resolve(data))
        .catch(err => reject(err));
    });
  }
};
