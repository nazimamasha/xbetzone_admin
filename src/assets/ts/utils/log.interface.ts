import type { PartnerMoneyLogType, UserCashLogType, UserLevel } from "./enum";
import type { IUser } from "./user.interface";

export interface IUserCashLog {
  user: IUser;
  amount: number;
  before: number;
  after: number;
  type: UserCashLogType;
  description: string;
}

interface IPartnerProfitUser {
  user_id: string;
  nickname: string;
  level: UserLevel;
}

export interface IPartnerProfitLog {
  partner_user_id: string;

  partner_nickname: string;

  user: IPartnerProfitUser;

  amount: number;

  before: number;

  after: number;

  type: PartnerMoneyLogType;

  description: string;
}
