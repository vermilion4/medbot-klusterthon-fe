import axios from 'axios';

const appAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BE_URL
});


appAxios.interceptors.request.use(request => {
    // Modify or log the request here
    return request;
  });
  
appAxios.interceptors.response.use(response => {
    // Handle or log the response here
    return response.data;
  }, error => {
    // Handle errors here
    return Promise.reject(error.response.data);
  });

/**
 * Set token to header
 */
export const setToken = () => {
  const token = localStorage.getItem('token');
  
    appAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}
  

export default appAxios;
