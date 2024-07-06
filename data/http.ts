export enum HttpType {
    GET = 'get',
    POST = 'post',
}

export interface HttpRequestBody {
    method: HttpType
    data?: object | any | null
    params?: object | any | null
    headers?: object | null
}
