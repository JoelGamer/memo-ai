import axios, { AxiosInstance } from 'axios';

const publicURL = 'https://fb79-200-0-114-9.sa.ngrok.io/';
const localURL = 'http://192.168.0.60:3000/';

class API {
  protected readonly serverInstance: AxiosInstance;
  static readonly baseURL = localURL;

  constructor() {
    this.serverInstance = axios.create({
      baseURL: API.baseURL,
      withCredentials: true,
    });
  }
}

export default API;
