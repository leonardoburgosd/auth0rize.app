export class NegocioItemResponse {
    id!: number;
    name!: string;
    domainCode!: string;
    avatar!: string;
    registrationDate!: string;
}

export class getNegocioResponse {
    total!: number;
    page!: number;
    size!: number;
    companies!: NegocioItemResponse[];
}
