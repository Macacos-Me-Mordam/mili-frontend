export enum MethodsEnum {
    GET = 'get',
    POST = 'post',
    DELETE = 'delete',
    PATCH = 'patch',
    PUT = 'put',
}

export type MethodType = MethodsEnum.GET | MethodsEnum.POST | MethodsEnum.PUT | MethodsEnum.PATCH | MethodsEnum.DELETE;