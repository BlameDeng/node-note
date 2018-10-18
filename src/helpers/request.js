import axios from 'axios'

let token = localStorage.getItem('token');
axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

export default function request({ url, method = 'GET', data }) {
    return new Promise((resolve, reject) => {
        let option = { url, method };
        method.toUpperCase() === 'GET' ? option.pramas = data : option.data = data;
        axios(option).then(res => {
            console.log(res);
            res.status === 200 ? resolve(res.data) : reject(res.data);
        }).catch(error => {
            console.log(error.response);
            console.log(error.response.data.msg);
        })
    })
}