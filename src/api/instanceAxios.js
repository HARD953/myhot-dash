import axios from "axios";
import { redirect } from "react-router-dom";
const apiUrl = process.env.REACT_APP_API_URL;


export const app_token_Name = "accessToken-myhot-dash";
export const app_refresh_token_Name = "refreshToken-myhot-dash";

export const domaine_path =  "/myhot-dash"
// export const main_app_path = "https://houseapi.up.railway.app/api/"
export const main_app_path = `${apiUrl}/api/v0/`;
export const main_app_path_files = `${apiUrl}/`;


// axios.defaults.withCredentials = true;

export const instanceAxios = axios.create({
  baseURL: main_app_path,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
 
  // headers:{
  //       "Content-Type": "multipart/form-data",
  //       "Authorization": 'Bearer ' + app_token_Na
  //   }
});

  // instanceAxios.interceptors.request.use(
  //   (config) => {
  //     // Ajoutez les en-têtes CORS nécessaires à chaque requête

  //     // config.headers['Access-Control-Allow-Origin'] = 'http://localhost:3001'; // Remplacez par l'URL de votre backend
  //     // config.headers['Access-Control-Allow-Methods'] = 'GET,POST,PUT,DELETE';
  //     // config.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';

  //     return config;
  //   },
  //   (error) => {
  //     return Promise.reject(error);
  //   }
  // );
//   instanceAxios.interceptors.response.use(
//   (response) => {
//     return response
//   },
//   async (error) => {
//     const originalRequest =  error.config

//     if(error.response.status === 401 && !originalRequest._retry){
//       originalRequest._retry = true
//       // const newToken = await refreshAccessToken()
//       // console.log("newToekn ::: ",newToken)
//       // localStorage.setItem('accessToken', newToken);
//       // localStorage.removeItem('accessToken-audit-visibility');
//       localStorage.clear();

//       // originalRequest.headers.Authorization = `Bearer ${newToken}`;
//       return axios(originalRequest);
//     }
//   }
// )



instanceAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      localStorage.clear();
      redirect("/");
      return axios(originalRequest);
    }
  }
);


export const configHeadersToken = () => {
  const token = localStorage.getItem(app_token_Name)
    return {
          headers:{
          "Content-Type": "application/json",
          "Authorization": 'Bearer ' + token
      }
    }
}


export const configHeadersFormDataToken = () => {
  const token = localStorage.getItem(app_token_Name)
  return {
          headers:{
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
    }
  }
}

// const refreshAccessToken = async()=>{
//     const response = await instance.post('token/refresh/',{
//       refresh: localStorage.getItem('refreshToken')
//     });
//     return response.data.access_token;
//  }













