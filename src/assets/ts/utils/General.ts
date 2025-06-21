import currencyFormatter from "currency-formatter";
import type { Moment } from "moment";
import moment from "moment";

import { useAuthStore } from "@/stores/auth";
import { ImageType, SportsBetStatus } from "./enum";
export function formatDate(date, long = true) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
  if (long) {
    var hours = "0" + d.getHours();
    var minutes = "0" + d.getMinutes();
    var seconds = "0" + d.getSeconds();
    return (
      [year, month, day].join("-") +
      " " +
      [hours.substr(-2), minutes.substr(-2), seconds.substr(-2)].join(":")
    );
  } else {
    return [year, month, day].join("-");
  }
}

export function dashCurrencyFormat(value: number, symbol = "", precision = 0) {
  return currencyFormatter.format(Math.floor(value), {
    symbol: symbol,
    decimal: ".",
    thousand: ",",
    precision: precision,
  });
}

export function currencyFormat(src, precision = 2, formatType = 1) {
  let symbol = "R$";

  if (src == null || src == undefined) return "?";
  let strSrc = src.toString();
  strSrc = String(strSrc).replace(/,/gi, "");

  var formatString = "%v %s";
  if (formatType === 1) formatString = "%s %v";
  return currencyFormatter.format(parseFloat(strSrc), {
    symbol: symbol,
    decimal: ".",
    thousand: ",",
    precision: precision,
    format: formatString, // %s is the symbol and %v is the value
  });
}
export function timeFormat(time) {
  return time ? moment(time).format("YYYY-MM-DD HH:mm:ss") : "";
}
export function betTimeFormat(time) {
  return time ? moment(time).format("MM-DD hh:mm A") : "";
}
export function floor2Decimals(num: number): number {
  return Math.floor(num * 100) / 100;
}
export function roound2Decimals(num: number): number {
  return Math.round(num * 100) / 100;
}
export function rollingPercent(rolling, limit) {
  if (limit === 0) return 100;
  const rollingPercent = Math.round((rolling / limit) * 100);
  if (isNaN(rollingPercent)) return 100;
  else return rollingPercent;
}
export function profitColor(bet: number, win: number): string {
  let color = "text-secondary-light";
  const profit = bet - win;
  if (profit > 0) {
    color = "text-success";
  }
  if (profit < 0) {
    color = "text-danger";
  }
  return color;
}

export function getRangeDates(range: [Date, Date]): {
  datestart: number;
  dateend: number;
} {
  return {
    datestart: range[0].getTime(),
    dateend: range[1].setDate(range[1].getDate() + 1),
  };
}
export function getRangeDateTimes(range: [Date, Date]): {
  datestart: number;
  dateend: number;
} {
  return {
    datestart: range[0].getTime(),
    dateend: range[1].getTime(),
  };
}
export function getMomentRangeDates(range: [Moment | Date, Moment | Date]) {
  return {
    datestart: moment(range[0]).valueOf(),
    dateend: moment(range[1]).add(1, "d").valueOf(),
  };
}
export function getRowsPerPage(queryPage) {
  if (queryPage !== 25 && queryPage !== 50 && queryPage !== 100) {
    return 10;
  } else {
    return queryPage;
  }
}
export function copyToClipboard(textToCopy) {
  // navigator clipboard api needs a secure context (https)
  if (navigator.clipboard && window.isSecureContext) {
    // navigator clipboard api method'
    return navigator.clipboard.writeText(textToCopy);
  } else {
    // text area method
    let textArea = document.createElement("textarea");
    textArea.value = textToCopy;
    // make the textarea out of viewport
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    return new Promise<void>((res, rej) => {
      // here the magic happens
      document.execCommand("copy") ? res() : rej();
      textArea.remove();
    });
  }
}

export const getBack2betImage = (type: ImageType, img) => {
  const imagehost = import.meta.env.VITE_APP_IMAGE_URL;
  if (type === ImageType.Sports) {
    return `${imagehost}/sports/${img}`;
  } else if (type === ImageType.Locations) {
    return `${imagehost}/locations/${img}`;
  } else if (type === ImageType.Leagues) {
    return `${imagehost}/leagues/${img}`;
  } else if (type === ImageType.Teams) {
    return `${imagehost}/teams/${img}`;
  }
  return `${imagehost}/sports/${img}`;
};

export const getSportsBetStatusLabel = (status: SportsBetStatus) => {
  if (status === SportsBetStatus.PENDING) {
    return "Pending";
  } else if (status === SportsBetStatus.WIN) {
    return "Win";
  } else if (status === SportsBetStatus.LOSE) {
    return "Lose";
  } else if (status === SportsBetStatus.REFUND) {
    return "Refund";
  } else if (status === SportsBetStatus.CANCELED) {
    return "Cancelled";
  }
};
export const getSportsBetStatusColor = (status: SportsBetStatus) => {
  if (status === SportsBetStatus.PENDING) {
    return "text-dark";
  } else if (status === SportsBetStatus.WIN) {
    return "text-success";
  } else if (status === SportsBetStatus.LOSE) {
    return "text-danger";
  } else if (status === SportsBetStatus.REFUND) {
    return "text-warning";
  } else if (status === SportsBetStatus.CANCELED) {
    return "text-danger";
  }
};

export const floorNumber = (num: number) => {
  return Math.floor(num * 100) / 100;
};

function getDates(startDate, stopDate, format: string): string[] {
  var dateArray: string[] = [];
  var currentDate = startDate;
  while (currentDate <= stopDate) {
    dateArray.push(moment(currentDate).format(format));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dateArray;
}

export function getCurrentMonthDates(format: string) {
  var stopDate = new Date();
  var startDate = new Date(stopDate.getFullYear(), stopDate.getMonth(), 1);
  return getDates(startDate, stopDate, format);
}
export function getCurrentMonthDateColors(): string[] {
  var stopDate = new Date();
  var startDate = new Date(stopDate.getFullYear(), stopDate.getMonth(), 1);
  return getDateColors(startDate, stopDate);
}
function getDateColors(startDate: Date, stopDate: Date): string[] {
  var colors: string[] = [];
  var currentDate = startDate;
  while (currentDate <= stopDate) {
    let color = "#a1a5b7";
    const currentDay = currentDate.getDay();
    if (currentDay === 0) {
      color = "#ff4100";
    } else if (currentDay === 6) {
      color = "#0041f7";
    }
    colors.push(color);
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return colors;
}

export function getDay(date: number) {
  const dayArray = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const checkDate = new Date();
  checkDate.setDate(date);
  return dayArray[checkDate.getDay()];
}
