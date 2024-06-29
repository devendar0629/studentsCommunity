interface Error {
    message: string
    cause?: string;
}

export interface ApiResponse {
    success: boolean;
    data?: Record<string, any>;
    error?: Error;
    message?: string;
}