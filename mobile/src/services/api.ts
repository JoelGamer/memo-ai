import axios, { AxiosInstance } from 'axios';

class API {
  protected readonly serverInstance: AxiosInstance;
  static readonly baseURL = 'https://fb79-200-0-114-9.sa.ngrok.io/';

  constructor() {
    this.serverInstance = axios.create({
      baseURL: API.baseURL,
      withCredentials: true,
    });
  }
}

export default API;
