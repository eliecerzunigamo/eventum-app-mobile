import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosResponse } from "axios";
import { Connections } from "./Enums";

export const useApi = () => {
  const BaseUrl = Connections.Local;

  async function get<R, P>(path: string, params?: P) {
    const response: AxiosResponse<R> = await axios.get(BaseUrl + path, {
      params,
      withCredentials: true,
      headers: {
        "access-token": `${await AsyncStorage.getItem("token")}`,
      },
    });
    return response;
  }

  async function post<B, R, P>(path: string, body: B, params?: P) {
    const response: AxiosResponse<R> = await axios.post(BaseUrl + path, body, {
      params,
      withCredentials: true,
    });
    return response;
  }

  async function put<B, R, P>(path: string, body: B, params?: P) {
    const tokenJson = await AsyncStorage.getItem("token");
    const token = JSON.parse(tokenJson ? tokenJson : "");
    const response: AxiosResponse<R> = await axios.put(BaseUrl + path, body, {
      params,
      withCredentials: true,
      headers: {},
    });
    return response;
  }

  async function axiosDelete<R, P>(path: string, params?: P) {
    const tokenJson = await AsyncStorage.getItem("token");
    const token = JSON.parse(tokenJson ? tokenJson : "");
    const response: AxiosResponse<R> = await axios.delete(BaseUrl + path, {
      params,
      withCredentials: true,
      headers: {},
    });
    return response;
  }

  return {
    get,
    post,
    put,
    axiosDelete,
  };
};
