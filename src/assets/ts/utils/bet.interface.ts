import type { SportsBetStatus, SportsBetType, SportsType } from "./enum";
import type { IFixtureInfo, ILivescore, ITranslate } from "./games.interface";
import type { IUser } from "./user.interface";

export interface IFixtureBet {
  SportId: number;

  SportType: SportsType;

  FixtureId: number;

  Fixture: IFixtureInfo;

  Livescore: ILivescore;

  MarketId: number;

  MarketName: ITranslate;

  BetId: number;

  BetName: string;

  Price: number;

  Restore_Price: number;

  BaseLine: string;

  Line: string;

  status: SportsBetStatus;
}

export interface ISportsBet {
  user: IUser;

  bet_type: SportsBetType;

  status: SportsBetStatus;

  price: number; // total price = price1 X price 2 X price 3

  amount: number;

  before: number;

  after: number;

  bets: IFixtureBet[];

  bonus_dividend: number;

  isdeleted: boolean;

  ip: string;
}
