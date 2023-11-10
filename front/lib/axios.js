import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://wp-api.local/wp-json/wp/v2',
});

export default instance;
