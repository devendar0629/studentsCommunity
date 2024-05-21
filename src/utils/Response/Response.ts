export interface ApiResponseInterface {
    success: boolean;
    data?: {
        [key: string]: any,
    }
    error?: {
        message: string
    }
}

export class ApiResponse implements ApiResponseInterface {
    constructor(
        public success: boolean,
        public data?: {
            [key: string]: any
        },
        public error?: { message: string }
    ) { }
}