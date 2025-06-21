import type {
  ActivityState,
  ActivityType,
  FixtureFilterStatus,
  PaymentStatus,
  SportsBetLogSortKey,
  SportsBetStatus,
  SportsIDs,
  SportsType,
  StatisticsType,
  TransactionType,
  UserCashLogType,
} from "./enum";

export interface IFindQuery {
  search: string;
  page: number;
  size: number;
}
export interface IDateRangeFindQuery extends IFindQuery {
  range: any;
}

export interface IDashboardStasInfo {
  userscount: number;
  deposit: number;
  withdraw: number;
  bet: number;
  win: number;
  prefit: number;
}

interface IDashboardValuePrevValue {
  value: number | undefined;
  prevValue?: number | undefined;
}
export interface IDashboardSalesValue {
  isPrev: boolean;
  footerText: string;
  userscount: IDashboardValuePrevValue;
  deposit: IDashboardValuePrevValue;
  withdraw: IDashboardValuePrevValue;
  bet: IDashboardValuePrevValue;
  win: IDashboardValuePrevValue;
}

export interface IUserReport {
  // id: number;
  // agentid: number;
  username: string;
  // gametype: number;
  bet: number;
  win: number;
  // turnover: number;
  // reporttime: Date;
  profit: number;
}
export interface IMainInfo {
  deposit: number;
  depositcount: number;
  withdraw: number;
  withdrawcount: number;
  bet: number;
  betcount: number;
  win: number;
  wincount: number;
  profit: number;
  ongoingbet: number;
  ongoingbetcount: number;
  usersbalance: number;
  usersbalancecount: number;
  newusers: number;
  onlineusers: number;
  budget?: number;
}
export interface IDashboardRank {
  earnRanks: IUserReport[];
  loseRanks: IUserReport[];
}
export interface IDashboardGraph {
  series: number[];
  categories: string[];
}

export interface ICasinoGameFindQuery extends IFindQuery {
  provider: string;
}
export interface IGameFindQuery extends IFindQuery {
  type: SportsType;
  esports: boolean;
  sportId?: SportsIDs;
  status: FixtureFilterStatus;
}
export interface IActivityFindQuery extends IFindQuery {
  type: ActivityType;
  status: ActivityState;
}

export interface IBetFindQuery extends IFindQuery {
  _id?: string;
  user_id?: string;

  fixtureId?: number;

  sports_type?: SportsType;

  isesports?: boolean;

  range?: [Date, Date] | null;

  from?: number; // timestamp

  to?: number; // timestamp

  status?: SportsBetStatus;

  sort?: SportsBetLogSortKey;
}

export interface IUserCashlogFindQuery extends IFindQuery {
  range?: [Date, Date] | null;
  from?: number;
  to?: number;
  t_type?: TransactionType | 'All';
  type: UserCashLogType;
}

export interface IPartnerPorfitFindQuery extends IFindQuery {
  range?: [Date, Date] | null;
  from?: number;
  to?: number;
}
export interface IStatsFindQuery extends IFindQuery {
  type: StatisticsType;
  range?: [string, string] | null;
  monthrange?: [string, string] | null;
  from?: string;
  to?: string;
}
