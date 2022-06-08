import Router from "./routes/Router";
import axios from "axios";
import jwt_decode from "jwt-decode";
const App = () => {
  const refreshToken = async () => {
    const refreshtokencode = localStorage.getItem("refresh");

    axios
      .post("/admin/login/refresh", { refresh: refreshtokencode })
      .then((response) => {
        console.log(response);

        // setauthresponse((prev) => [{ ...prev, access: response.data.access }]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(
    async (config) => {
      console.log("THIS IS WORKING GSSADAS");
      let currentDate = new Date();
      const token = localStorage.getItem("tokenkey");

      const decodedToken = jwt_decode(token);
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        const data = await refreshToken();
        localStorage.setItem("tokenkey", data.access);
        console.log(data);
        config.headers["Authorization"] = "Bearer" + data.access;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return (
    <div className="dark">
      <Router />
    </div>
  );
};

export default App;
