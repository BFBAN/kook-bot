import http, {AxiosResponse} from 'axios';
import {HttpRequestBody, HttpType} from "../data/http";

export class Http {
    NODE: string = '';

    protected HTTP = http.create({
        timeout: 600000,
        withCredentials: true,
        validateStatus(status) {
            return status <= 1000;
        }
    })

    constructor() {
        this.NODE = process.env.NODE_ENV || 'development';
        this.HTTP.interceptors.request.use(config => {
            // 延迟时间，测试接口 XD
            return new Promise(resolve => setTimeout(() => resolve(config), 5000))
        })
    }

    public get http() {
        return http;
    }

    /**
     * 请求核心
     * @param url
     * @param requestData
     * @returns {Promise<AxiosResponse<any>>}
     */
    public async request(url: string, requestData: HttpRequestBody): Promise<AxiosResponse> {
        const config = {
            url: url || '',
            headers: {...requestData.headers},
            method: requestData.method,
            data: requestData.data,
            params: requestData.params,
        };
        return await this.HTTP(config);
    }

    /**
     * post 请求
     * @param url
     * @param data
     */
    public async post(url: string, data?: any): Promise<AxiosResponse> {
        return await this.request(url, {
            method: HttpType.POST,
            headers: data?.headers,
            params: data?.params,
            data: data?.data,
        });
    }

    /**
     * get 请求
     * @returns {Promise<AxiosResponse<any>>}
     */
    public async get(url = '', data?: any): Promise<AxiosResponse> {
        return await this.request(url, {
            method: HttpType.GET,
            headers: data?.headers,
            params: data?.params,
            data: data?.data,
        });
    }
}

export default Http
