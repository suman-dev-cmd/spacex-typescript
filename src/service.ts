import axios from "axios";
const BASE_URL = 'https://api.spacexdata.com/v3';
axios.defaults.baseURL = BASE_URL;
// const request = (method:any, url:string, options = { params: {}, payload: {} }) => {
//     const request = {
//       url,
//       method,
//       params: options.params,
//       data: options.payload,
//     };
  
//     return new Promise((resolve, reject) => {
//       axios
//         .request(request)
//         .then((res) => resolve(res))
//         .catch((err) => reject(err));
//     });
//   };
  
//   export const POST = (path:string, payload:any) => {
//     return request('POST', path, { payload });
//   };
  
//   export const GET = (path, params) => {
//     return request('GET', path, { params });
//   };
  
//   export const GETALL = (path, filters) => {
//     return request('GET', path, { params: filters });
//   };
  
//   export const PUT = (path, payload) => {
//     return request('PUT', path, { payload: payload });
//   };
  
//   export const PATCH = (path, payload) => {
//     return request('PATCH', path, { payload: payload });
//   };
  
//   export const DELETE = (path) => {
//     return request('DELETE', path);
//   };
  
//   axios.interceptors.request.use((request) => {
//     // Setting up headers
//     const token = localStorage.getItem('_GATKEN');
//     let headers = {
//       // Accept: 'application/json',
//       // 'X-Requested-With': 'XMLHttpRequest',
//       // 'Access-Control-Allow-Origin': '*',
//     };
//     if (token) {
//       headers.authorization = `Bearer ${token}`;
//     }
  
//     request.headers = headers;
//     return request;
//   });
  
//   /**
//    * RESPONSE INTERCEPTOR
//    */
//   axios.interceptors.response.use(
//     (response) => {
//       // Do something with response data
//       return response.data;
//     },
//     (error) => {
//       if (error.code === 401) {
//         localStorage.removeItem('_GATKEN');
//         window.location.replace = '/';
//       }
//       return Promise.reject(error.response.data);
//     },
//   );
  