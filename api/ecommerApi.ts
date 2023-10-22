import axios from 'axios';

const ecommerApi = axios.create({
	baseURL: '/api/v1',
});

export default ecommerApi;
