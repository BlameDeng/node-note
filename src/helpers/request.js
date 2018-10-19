import axios from 'axios'

export default function request({ url, method = 'GET', data }) {
    return new Promise((resolve, reject) => {
        let option = { url, method };
        method.toUpperCase() === 'GET' ? option.pramas = data : option.data = data;
        axios(option).then(res => {
            console.log(res);
            res.data.status === 'success' ? resolve(res.data) : reject(res.data);
        }).catch(error => {
            reject(error.response);
        })
    })
}

axios.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    config.headers.common['Authorization'] = 'Bearer ' + token;
    return config;
})