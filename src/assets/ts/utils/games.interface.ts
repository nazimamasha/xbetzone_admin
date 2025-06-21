import type { BetSettlement, BetStatus } from "./enum";

export interface ITranslate {
  en: string;

  ja?: string;

  ko?: string;

  zh?: string;

  hi?: string;

  vi?: string;

  th?: string;
}

export interface IParticipant {
  Id: number;

  Name: ITranslate;

  Position: number;

  logo?: string;
}

interface ISubscription {
  Type: number;

  Status: number;
}

interface ISport {
  Id: number;

  Name: ITranslate;

  logo?: string;
}

interface ILocation {
  Id: number;

  Name: ITranslate;

  flag?: string;
}

interface ILeague {
  Id: number;

  Name: ITranslate;

  logo?: string;
}

interface IFixtureExtraData {
  Name: string;

  Value: string;
}

export interface IFixtureInfo {
  Subscription: ISubscription;

  Sport: ISport;

  Location: ILocation;

  League: ILeague;

  StartDate: string;

  LastUpdate: string;

  Status: number;

  Participants: IParticipant[];

  FixtureExtraData: IFixtureExtraData[];
}

interface IScoreboard {
  Status: number;

  CurrentPeriod: number;

  Time: number;

  Results: IScoreboardResult[];
}

interface IScoreboardResult {
  Position: number;

  Value: number;
}

interface ILiveScorePeriod {
  Type: number;

  IsFinished: boolean;

  IsConfirmed: boolean;

  Results: IScoreboardResult[];

  Incidents?: IScoreboardIncident[];
}

interface IScoreboardIncident {
  Period: number;

  IncidentType: number;

  Seconds: number;

  ParticipantPosition: string;

  PlayerId: string;

  Results: IScoreboardResult[];
}

export interface ILivescore {
  Scoreboard: IScoreboard;

  Periods: ILiveScorePeriod[];
}

export interface IBet {
  Id: number;

  Name: string;

  Status: BetStatus;

  StartPrice: number;

  Price: number;

  Settlement: BetSettlement;

  ProviderBetId: string;

  LastUpdate: Date;

  PriceIN: string;

  PriceUS: string;

  PriceUK: string;

  PriceMA: string;

  PriceHK: string;

  BaseLine: string;

  Line: string;

  bet_count: number;

  bet_amount: number;
}
export interface IBetMarket extends IBet{
  MarketId: number;
  MarketName: ITranslate;
}

export interface IMarket {
  Id: number;

  Name: ITranslate;

  MainLine?: string;

  IsSettleable?: boolean;

  Bets: IBet[];
  //
  // bet_amount: number;
}

export interface IFixture {
  _id: string;
  
  FixtureId: number;

  Fixture: IFixtureInfo;

  Livescore: ILivescore;

  Markets: IMarket[];

  bet_count: number;

  single_bet_count: number;

  multi_bet_count: number;

  bet_amount: number;

  single_bet_amount: number;

  multi_bet_amount: number;

  video: string;

  ispublish: boolean; // if false => it won't be shown to client page

  iscanceled: boolean;
}

export interface IPrematch extends IFixture {}
