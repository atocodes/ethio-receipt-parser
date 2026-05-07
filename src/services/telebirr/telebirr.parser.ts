import * as cheerio from "cheerio";
import { PaymentInfo } from "../../shared/types";
import { parseBirr, removeAmharcChars } from "../../shared/utils";

const info: Record<string, any> = {
  "Payer Name": "",
  "Payer telebirr no.": "",
  "Credited Party name": "",
  "Credited party account no": "",
  "transaction status": "",
  "Bank account number": "",
  "Payment date": "",
  Amount: "",
};

export const parseTelebirrReciept = (html: any): PaymentInfo => {
  const $ = cheerio.load(html);

  const keys = [...Object.keys(info)];
  $("tr").each((i, el) => {
    const parentEl = $(el).find("td");
    var key = removeAmharcChars(parentEl.first().text().trim());
    if (keys.includes(key)) {
      info[key] = parentEl.last().text().trim();
    }
  });


  const val = $("td:contains('Total Paid Amount')").next("td").text();
  $("tr").each((_, row) => {
    const tds = $(row).find("td");

    if (tds.length === 3) {
      const maybeDate = tds.eq(1).text().trim();

      // simple check: looks like date
      if (maybeDate.match(/\d{2}-\d{2}-\d{4}/)) {
        info["Payment date"] = maybeDate;
      }
    }
  });
  info["Amount"] = parseBirr(val);
  const d = new Date(info["Payment date"]);
  return {
    Amount: parseBirr(val),
    Date: new Date(info["Payment date"]),
    Account: info["Credited party account no"],
    BankAccountNumber: info["Bank account number"],
    CreaditedPartyName: info["Credited Party name"],
    Payer: info["Payer Name"],
    Status: "Completed",
  };
};
