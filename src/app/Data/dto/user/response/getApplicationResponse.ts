export class ApplicationItemResponse {
    id!: number;
    name!: string;
    code!: string;
    description!: string;
    avatar!: string;
    isDeleted!: boolean;
    registrationDate!: string;
}

export class getApplicationResponse {
    total!: number;
    page!: number;
    applications!: ApplicationItemResponse[];
}