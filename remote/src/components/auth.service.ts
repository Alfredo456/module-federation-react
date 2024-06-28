import axios from 'axios';

const apiService = 'http://your-api-url'; // Reemplaza esto con la URL de tu API

const AuthService = {
    getPreToken: (usr: string, pwd: string) => {
        const token = usr + ':' + pwd;
        return axios.post(`${apiService}/v1/auth/login`, {}, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': 'true',
                Authorization: 'Basic ' + btoa(token)
            }
        }).then(response => response.data);
    },

    getToken: (usr: string, pwd: string, companyId: string) => {
        const token = usr + ':' + pwd + ':' + companyId;
        return axios.post(`${apiService}/v1/auth/login`, {}, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': 'true',
                Authorization: 'Basic ' + btoa(token)
            }
        }).then(response => response.data);
    }
};

export default AuthService;
