export class RestResponse<T> {
    success!: boolean;
    message!: string;
    errors!: string[];
    data!: T;
} 