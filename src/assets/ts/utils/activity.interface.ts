import type { ActivityState, ActivityType, BillingType, UserLevel, UserStatus, WithdrawType } from "./enum";

export interface IUserDeposit {
  cash: number;

  casino: number;
}
export interface ActivityUser {
 
  asaas_id: string;

 
  asaas_cpfCnpj: string;

 
  status: UserStatus;
  
 
  level: UserLevel; // Lv.1 ~ Lv.5

 
  nickname: string;

 
  cash: number;

 
  point: number;

 
  total_point: number;

 
  casino: number;

 
  total_deposit: IUserDeposit;

 
  month_deposit: IUserDeposit;

 
  today_deposit: IUserDeposit;

 
  total_withdraw: number;

 
  month_withdraw: number;

 
  today_withdraw: number;
}

export interface WithdrawPix {
  
  pixAddressKey: string;

  
  pixAddressKeyType: "CPF" | "EVP";
}

export interface WithdrawBankAccount {
 
  bank: any;

  
  ownerName: string;

  
  cpfCnpj: string;

  
  agency: string;

  
  account: string;

  
  accountDigit: string;
}

export interface BankAccount {
  
  bankAccount: WithdrawBankAccount;
}

export interface IActivity {
 
  activity_type: ActivityType;

 
  user_id: string;

 
  user: ActivityUser;

 
  state: ActivityState;

  //#region deposit info
  
  asaas_payment_id: string;

  
  asaas_invoiceUrl: string;

  
  asaas_value: number;

  
  asaas_netValue: number;

  
  billing_type: BillingType;

  
  dueDate: Date;

  
  confirmedDate: Date;

  
  clientPaymentDate: Date;

  
  paymentDate: Date;
  //#endregion

  //#region withdraw
  
  withdraw_type: WithdrawType;

  
  withdraw_value: number;

  
  withdraw_pix: WithdrawPix;

  
  withdraw_bank: BankAccount;
  //#endregion
}

