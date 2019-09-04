import axios from 'axios';

const api = axios.create({
	baseURL: 'https://spotify-sage.herokuapp.com'
});

export default api;