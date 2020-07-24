export class BaseResponse {
    ResponseCode: string;
    data: object;
    ResponseMessage: string;
    error: number = 0;
}