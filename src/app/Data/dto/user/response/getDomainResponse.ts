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
  initial!: string;
  principalEmail!: string;
}

export class usersDomainResponse {
  id!: number;
  name!: string;
  email!: string;
}
