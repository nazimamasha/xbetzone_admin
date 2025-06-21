export enum PaymentStatus {
  All = "All",
  Pending = "Pending",
  Completed = "Completed",
  Failed = "Failed",
  Refunded = "Refunded",
}

export enum BetStatus {
  Open = 1,
  Suspended = 2,
  Settled = 3,
}
export enum StatsType {
  Daily = 0,
  Monthly = 1,
  Total = 2,
  Hourly = -1,
}
export enum StatisticsType {
  Daily = "Daily",
  Monthly = "Monthly",
  Total = "Total",
}

export enum BetSettlement {
  Canceled = -1,
  Loser = 1,
  Winner = 2,
  Refund = 3,
  HalfLost = 4,
  HalfWon = 5,
}

export enum SportsType {
  PREMATCH = "prematch",
  INPLAY = "inplay",
}

export const ESportsID = 687890;

export enum SportsIDs {
  Football = 6046,
  Baseball = 154914,
  Basketball = 48242,
  Volleyball = 154830,
  Hockey = 530129,
  Others = 0,
}

export enum FixtureFilterStatus {
  NOTSTARTEDYET = "NotStarted",
  PROGRESS = "Progress",
  CANCELLED = "Cancelled",
  FINISHED = "Finished",
}
export enum ImageType {
  Sports = "Sports",
  Teams = "Teams",
  Leagues = "Leagues",
  Locations = "Locations",
}
export enum UserRole {
  ADMIN = "admin",
  PARTNER = "partner",
  USER = "user",
}

export enum UserStatus {
  ACTIVE = "active",
  BLOCK = "block",
}

export enum UserLevel {
  Lv1 = 1,
  Lv2 = 2,
  Lv3 = 3,
  Lv4 = 4,
  Lv5 = 5,
  Lv6 = 6,
}

export enum PartnerComissionType {
  Profit = 0,
  Signup = 1,
}

export enum ActivityType {
  DEPOSIT = "d",
  WITHDRAW = "w",
  TRANSFER = "t",
}

export enum BillingType {
  BOLETO = "BOLETO",
  CREDIT_CARD = "CREDIT_CARD",
  PIX = "PIX",
}

export enum ActivityState {
  All = "All",
  PAYMENT_CREATED = "PAYMENT_CREATED",
  PAYMENT_CONFIRMED = "PAYMENT_CONFIRMED ",
  PAYMENT_RECEIVED = "PAYMENT_RECEIVED",
  PAYMENT_REFUNDED = "PAYMENT_REFUNDED",
  PAYMENT_DELETED = "PAYMENT_DELETED",

  // Withdraw
  WITHDRAW_CREATED = "WITHDRAW_CREATED",
  WITHDRAW_PENDING = "PENDING",
  WITHDRAW_COMPLETED = "DONE",
  WITHDRAW_CANCELLED = "CANCELLED",
}
export enum WithdrawType {
  PIX = "pix",
  BANK = "bank",
}

export enum SportsBetStatus {
  PENDING = 0,
  WIN = 1,
  LOSE = 2,
  REFUND = 3,
  // HALFWIN             = 4,
  // HALFLOSE            = 5,
  CANCELED = 6,
  All = -1,
}
export enum SportsBetType {
  SINGLE = "single",
  MULTI = "multi",
}
export enum SportsBetLogSortKey {
  WinAmount = "WinAmount",
  CreatedAt = "CreatedAt",
  BetAmount = "BetAmount",
  FixtureTime = "FixtureTime",
}

export enum TransactionType {
  All = "All",
  Sports = "sports",
  Casino = "casino",
}

export enum UserCashLogType {
  Deposit = 1,
  Withdraw = 2,
  SportsBet = 3,
  SportsWin = 4,
  SportsBetCancel = 5,
  SportsRefund = 6,
  SportsBetRollback = 7,
  CashToCasino = 10,
  CasinoToCash = 11,
  WithdrawCanceled = 12,
  PointToCash = 13,
  CasinoBet = 15,
  CasinoWin = 16,
  CasinoRefund = 17,
  CainoRollBack = 18,
  AdminManualCharge = 20,
  All = -2,
}
export const UserCashLogTypeLabel = {
  1: "Deposit",
  2: "Withdraw",
  3: "SportsBet",
  4: "SportsWin",
  5: "SportsBetCancel",
  6: "SportsRefund",
  7: "SportsBetRollback",
  10: "CashToCasino",
  11: "CasinoToCash",
  12: "WithdrawCanceled",
  13: "PointToCash",
  15: "CasinoBet",
  16: "CasinoWin",
  17: "CasinoRefund",
  18: "CainoRollBack",
  20: "AdminManualCharge",
};

export enum PartnerMoneyLogType {
  // rolling
  SportsBet = 100,
  MiniGameBet = 101,
  CancelSportsBet = 102, // user cancel
  CancelMiniGameBet = 103, // user cancel

  // win
  SportsWin = 110,
  MiniGameWin = 111,

  // lose
  SportsLose = 120,
  MiniGameLose = 121,
  SportsFailure = 124,
  MiniGameFailure = 125,

  // leasing
  SportsLeasing = 130,
  MiniGameLeasing = 131,

  // change
  RollbackSportsBet = 140, // leasing + win/lose
  ManualSettlementSportsBet = 141, // win/lose
  RollbackMiniGameBet = 142,
  ManualSettlementMiniGameBet = 143,

  // deposit/withdraw
  Deposit = 150,
  Withdraw = 151,

  // manual charge
  AdminManualCharge = 160,
}
export const PartnerMoneyLogTypeLabel = {
  // rolling
  100: "SportsBet",
  101: "MiniGameBet",
  102: "CancelSportsBet", // user cancel
  103: "CancelMiniGameBet", // user cancel

  // win
  110: "SportsWin",
  111: "MiniGameWin",

  // lose
  120: "SportsLose",
  121: "MiniGameLose",
  124: "SportsFailure",
  125: "MiniGameFailure",

  // leasing
  130: "SportsLeasing",
  131: "MiniGameLeasing",

  // change
  140: "RollbackSportsBet", // leasing + win/lose
  141: "ManualSettlementSportsBet", // win/lose
  142: "RollbackMiniGameBet",
  143: "ManualSettlementMiniGameBet",

  // deposit/withdraw
  150: "Deposit",
  151: "Withdraw",

  // manual charge
  160: "AdminManualCharge",
};
export enum CasinoAction {
  Balance = "balance",
  Bet = "bet",
  Win = "win",
  Refund = "refund",
  Rollback = "rollback",
}

export const CasinoProviders = [
  "Push Gaming",
  "Amatic",
  "AmigoGaming",
  "BFGames",
  "Belatra Games",
  "Betgames",
  "Betsolutions",
  "Charismatic",
  "CTInteractive",
  "Caleta",
  "ConceptGaming",
  "Dlv",
  "Elbet",
  "Endorphina",
  "Espressogames",
  "EurasianGaming",
  "Evolution2",
  "Ezugi",
  "Gamebeat",
  "Gamevy",
  "Gamevy Branded",
  "Gamzix",
  "Big Time Gaming",
  "Blueprint",
  "Quickspin",
  "RTG SLOTS",
  "Red Tiger",
  "Yggdrasil",
  "Igrosoft",
  "KAGaming",
  "Kalamba",
  "Lotto Instant Win",
  "MacawGaming",
  "Mascot",
  "NetEnt",
  "NetGame",
  "No Limit City",
  "NovomaticDirect",
  "OneTouch",
  "PGSoft",
  "Platipus",
  "Playson",
  "Playson Premium",
  "PragmaticPlay",
  "PragmaticPlayLive",
  "Reevo",
  "SmartSoft",
  "BGaming",
  "Spadegaming",
  "SuperSpadeGames",
  "ThreeOaks",
  "ThreeOaks Premium",
  "Thunderkick",
  "Tomhorn",
  "TripleCherry",
  "TripleProfitsGames",
  "Turbogames",
  "VibraGaming",
  "Betsoft",
  "Vivogaming",
  "Wazdan",
  "XProgaming",
  "Spinmatic",
];
