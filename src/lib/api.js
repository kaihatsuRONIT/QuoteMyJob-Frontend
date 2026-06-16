import axios from "axios";

let _accessToken = null;

export const setAccessToken = (t) => { _accessToken = t; };
export const clearAccessToken = () => { _accessToken = null; };
export const getAccessToken = () => _accessToken;

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // sends HttpOnly cookie automatically
});

api.interceptors.request.use((config) => {
  if (_accessToken) config.headers.Authorization = `Bearer ${_accessToken}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      try {
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );
        _accessToken = data.accessToken;
        original.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(original);
      } catch {
        _accessToken = null;
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;