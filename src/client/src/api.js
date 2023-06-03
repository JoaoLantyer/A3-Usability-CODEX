import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000',
});

api.defaults.headers.get['Access-Control-Allow-Origin'] = '*';

export default api;