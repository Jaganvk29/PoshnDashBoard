import axios from "axios";
import jwt_decode from "jwt-decode";

export const axiosJWT = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

axiosJWT.interceptors.request.use(
  async (config) => {
    let currentDate = new Date();
    const token = localStorage.getItem("tokenkey");

    const decodedToken = jwt_decode(token);
    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      const data = await refreshToken();

      localStorage.setItem("tokenkey", data);

      config.headers.Authorization = `Bearer ${data}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const refreshToken = async () => {
  const token = localStorage.getItem("tokenkey");
  const refreshtokencode = localStorage.getItem("refresh");

  try {
    const res = await axios.post("/admin/login/refresh", {
      refresh: refreshtokencode,
    });

    return res.data.access;
  } catch (err) {
    console.log(err);
  }
};
