import axios, { AxiosHeaders, AxiosResponse } from "axios";
import { Platform } from "react-native";

// bassic auth
// const username ="mypcot";
// const password="mypcotoptleads"

const BASE_URLS = {
  STAGING: 'http://skyonliners.com/demo/clms-web/webservices/v1/',
  VIVEK_LOCAL: 'https://989a-110-227-197-199.ngrok-free.app/webservices/v1/',
  KAUSHIK_LOCAL: 'https://3575-110-227-197-199.ngrok-free.app/webservices/v1/',
};

interface NetworkConfig {
  token?: string;
};

const networkRequest = (networkConfig: NetworkConfig) => {
  const { token } = networkConfig;

  const headers: Partial<AxiosHeaders> = {
    'Content-Type': 'multipart/form-data',
    "X-Access-Token": token,
    uuid: 'a1b47f54ba2ac437',
    platform: Platform.OS,
    Authorization: 'Basic bXlwY290Om15cGNvdG9wdGxlYWRz',
    Cookie: 'ci_session=358v4pqnoc16q29b1ljodlmrbnkvo3fv',
  };


  const axiosInstance = axios.create({
    baseURL: BASE_URLS.STAGING,
    headers,
  });

  axiosInstance.interceptors.request.use((request) => {
    return request;
  }, (error) => {
    return Promise.reject(error);
  });

  axiosInstance.interceptors.response.use((response: AxiosResponse) => {
    return response;
  }, (error) => {
    console.error('Response error: ', error);
    return Promise.reject(error);
  });

  return axiosInstance;
}

export { networkRequest };