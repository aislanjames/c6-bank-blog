import axios from 'axios';
import { API_URL } from '../pages/api/apiConfig';

const instance = axios.create({
  baseURL: API_URL,
});

export default instance;
