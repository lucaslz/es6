import axios from 'axios';

const axiosConfig = axios.create({
    baseURL: 'https://api.github.com'
});

export default axiosConfig;