import type {
  UserStatus,
  UserLevel,
  UserRole,
  PartnerComissionType,
} from "./enum";

export interface IBettingSplit {
  sports: number[];

  minigame: number;

  live: number;

  slot: number;
}

export interface ISportsRakeback {
  rolling: number[];

  win: number[];

  lose: number[];
}

export interface IUserRakebackFee {
  sports: ISportsRakeback;
}

export interface ISportsProfitShare {
  rolling: number[];

  leasing: number;

  win: number[];

  lose: number[];
}

export interface IProfitShare {
  sports: ISportsProfitShare;
}

export interface IUserRefer {
  from: number; // 0: from partner's refferal code, 1: from user

  code: string;

  partner: string;
  //
  // user?: string[];
}

export interface IUserExchange {
  bank_name: string;

  bank_account: string;

  bank_owner: string;
}

export interface IUserBet {
  sports_single_prematch: number;

  sports_single_prematch_count: number;

  sports_single_inplay: number;

  sports_single_inplay_count: number;

  esports_single_prematch: number;

  esports_single_prematch_count: number;

  esports_single_inplay: number;

  esports_single_inplay_count: number;

  multi: number;

  multi_count: number;

  multi_prematch: number;

  multi_prematch_count: number;

  multi_inplay: number;

  multi_inplay_count: number;

  live: number;

  live_count: number;
}

interface IUserBetCheck {
  sports_single_prematch: boolean;

  sports_single_inplay: boolean;

  esports_single_prematch: boolean;

  esports_single_inplay: boolean;

  multi: boolean;

  live: boolean;
}

export interface IUserDeposit {
  cash: number;

  casino: number;
}

interface IUserSportsBetEnalbe {
  single: boolean;

  folder2: boolean;

  sports_prematch: boolean;

  sports_inplay: boolean;

  esports_prematch: boolean;

  esports_inplay: boolean;
}

interface IUserMinigameBetEnalbe {
  dhpowerball: boolean;

  ntrykenoladder: boolean;

  ntrypowerladder: boolean;

  metaball3min: boolean;

  metaball5min: boolean;

  eospowerball3min: boolean;

  eospowerball5min: boolean;

  pbgpowerball: boolean;

  coinpowerball3min: boolean;

  coinpowerball5min: boolean;

  coinladder3min: boolean;

  coinladder5min: boolean;

  dhkeno: boolean;

  gopickevopowerball: boolean;

  boscorepowerball1min: boolean;

  boscorepowerball2min: boolean;

  boscorepowerball3min: boolean;

  starladder1min: boolean;

  starladder2min: boolean;

  starladder3min: boolean;

  flexball: boolean;
}

interface IUserCasinoBetEnalbe {
  live_evo: boolean;

  live_etc: boolean;

  slot: boolean;
}

interface IUserBetEnable {
  sports: IUserSportsBetEnalbe;

  minigame: IUserMinigameBetEnalbe;

  casino: IUserCasinoBetEnalbe;
}

export interface IUser {
  user_id: string;

  asaas_id: string;

  asaas_cpfCnpj: string;

  password: string;

  status: UserStatus;

  level: UserLevel; // Lv.1 ~ Lv.5

  nickname: string;

  phone: string;

  cash: number;

  point: number;

  total_point: number;

  casino: number;

  exchange: IUserExchange;

  lastlogin?: Date;

  logincount: number;

  lastdeposit?: Date;

  refer: IUserRefer;

  total_bet: IUserBet;

  month_bet: IUserBet;

  today_bet: IUserBet;

  total_win: IUserBet;

  month_win: IUserBet;

  today_win: IUserBet;

  total_deposit: IUserDeposit;

  month_deposit: IUserDeposit;

  today_deposit: IUserDeposit;

  total_withdraw: number;

  month_withdraw: number;

  today_withdraw: number;

  lastwithdraw: Date;

  refer_user_count: number;

  //
  // profit_share: IProfitShare;

  register_ip: string;

  lastlogin_ip: string;

  rakeback_fee: IUserRakebackFee;

  user_rakeback_fee: IUserRakebackFee; // Referrer user's rakeback

  //
  // split89: IBettingSplit;

  //
  // split88: IBettingSplit;

  //
  // withdrawal_password: number;

  memo: string;

  isonline: boolean;

  //
  // checked_notices: string[];

  istest: boolean;

  //
  // api_key: string;

  role: UserRole;
}

export interface IPartner {
  user_id: string;
  nickname: string;
  password: string;
  profit: number;
  comissionType: PartnerComissionType;
  comission: number;
  budget: number; // Plus by Admin manual, Deduct by patner manullay topup user's balance
  memo: string;  
  code: string;
}
