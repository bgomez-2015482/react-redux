import axios from 'axios';

const clienteAxios = axios.create({
    baseURL: 'http://localhost:4100/'
});

export default clienteAxios;