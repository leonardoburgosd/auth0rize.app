export class getDashboardResponse {
  totalUsers!: number;
  totalDomains!: number;
  totalLoginSuccess!: number;
  totalLoginFailed!: number;
  sessionHistory!: sessionHistoryResponse[];
  userRegisterHistory!: userRegisterHistoryResponse[];
  lastHistoryResponse!: lastHistoryResponse[];
}

export class sessionHistoryResponse {
  date!: Date;
  count!: number;
}

export class userRegisterHistoryResponse {
  date!: Date;
  count!: number;
}

export class lastHistoryResponse{
  userName!: string;
  date!: Date;
}
