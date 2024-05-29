import userStorage from "@/storage/UserStorage";
import axios, { type AxiosResponse, type InternalAxiosRequestConfig } from "axios";
import iziToast from "izitoast";
import router from "@/routes/router";

const instance = axios.create({
    baseURL: 'http://localhost:8080/api',
    timeout: 10000,
});

function request(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
    const token = userStorage.getToken();        
    config.headers.Authorization = `Bearer ${token}`;
    config.headers.Accept = `application/json`;
    return config;
}

function response(response: AxiosResponse<any, any>): AxiosResponse<any, any> {
    return response;
}

instance.interceptors.request.use(request, (error) => {
    return Promise.reject(error);
});

instance.interceptors.response.use(response, (error) => {
    if(error.code == "ERR_NETWORK") {
        iziToast.error({
            title: error.message,
            message: 'Não foi possível estabelecer conexão com nossos servidores. Por favor, verifique sua conexão com a internet e tente novamente mais tarde.'
        });
    }
    if(error.response && error.response.status === 401) {        
        userStorage.delete();
        router.push('/auth/login');
    }
    return Promise.reject(error);
});

export default instance;
