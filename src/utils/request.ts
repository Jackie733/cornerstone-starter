import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://192.168.1.119:3104',
  timeout: 3000,
});

export default instance;
