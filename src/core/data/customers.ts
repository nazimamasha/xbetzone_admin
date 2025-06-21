import { getAssetPath } from "@/core/helpers/assets";

interface ICustomer {
  id: number;
  parent: string;
  userId: string;
  balance: number;
  deposit: number;
  withdraw: number;
  bet: number;
  win: number;
  name: string;
  email: string;

  payment: {
    icon: string;
    ccnumber: string;
    label: string;
  };
  registeredDate: string;
  loginDate: string;
}
const customers: Array<ICustomer> = [
  {
    id: Math.floor(Math.random() * 99999) + 1,
    userId: "emma",
    name: "Emma Smith",
    email: "e.smith@kpmg.com.au",
    parent: "super",
    balance: 1500,
    deposit: 6000,
    withdraw: 4000,
    bet: 1500,
    win: 2500,
    payment: {
      icon: getAssetPath("media/svg/card-logos/mastercard.svg"),
      ccnumber: "**** " + Math.floor(Math.random() * (9999 - 1000 + 1) + 1000),
      label: "mastercard",
    },
    registeredDate: "14 Dec 2020, 8:43 pm",
    loginDate: "14 Dec 2020, 8:43 pm",
  },
  {
    id: Math.floor(Math.random() * 99999) + 1,
    userId: "melody",
    name: "Melody Macy",
    email: "melody@altbox.com",
    parent: "super",
    balance: 3500,
    deposit: 6000,
    withdraw: 2000,
    bet: 4500,
    win: 500,
    payment: {
      icon: getAssetPath("media/svg/card-logos/visa.svg"),
      ccnumber: "**** " + Math.floor(Math.random() * (9999 - 1000 + 1) + 1000),
      label: "visa",
    },
    registeredDate: "01 Dec 2020, 10:12 am",
    loginDate: "14 Dec 2020, 8:43 pm",
  },
  {
    id: Math.floor(Math.random() * 99999) + 1,
    userId: "max",
    name: "Max Smith",
    email: "max@kt.com",
    parent: "super",
    balance: 1500,
    deposit: 4000,
    withdraw: 5000,
    bet: 12500,
    win: 4500,
    payment: {
      icon: getAssetPath("media/svg/card-logos/mastercard.svg"),
      ccnumber: "**** " + Math.floor(Math.random() * (9999 - 1000 + 1) + 1000),
      label: "mastercard",
    },
    registeredDate: "12 Nov 2020, 2:01 pm",
    loginDate: "12 Nov 2020, 2:01 pm",
  },
];

export type { ICustomer };

export default customers;
