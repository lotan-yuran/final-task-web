import axios from "axios";

export const createAxiosInstance = (endpoint) => {
    const instance = axios.create({
      baseURL: endpoint,
      headers: { 'Content-Type': 'application/json' }
    });

    return instance;
}