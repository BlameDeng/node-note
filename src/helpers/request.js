import axios from 'axios'

export default function request({ url, method = 'GET', data }) {
    return new Promise((resolve, reject) => {
        let option = { url, method };
        method.toUpperCase() === 'GET' ? option.pramas = data : option.data = data;
        axios(option).then(res => {
            console.log(res);
            res.status === 200 ? resolve(res.data) : ''
        }).catch(error => {
            console.log(error.response);
            reject(error);
        })
    })
}