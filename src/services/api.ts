import axios from 'axios';

const API_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, //  enviar os cookies HTTP-Only automaticamente
});

export default api;