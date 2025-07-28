export class getDomainResponse {
  total!: number;
  page!: number;
  active!: number;
  deleted!: number;
  domains!: domainListResponse[];
}

export class domainListResponse {
  code!: string;
  count!: number;
  isActive!: boolean;
  principalName!: string;
  principalEmail!: string;
}
