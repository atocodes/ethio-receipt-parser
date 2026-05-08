import * as cheerio from "cheerio";
import { PaymentInfo } from "../../shared/types";

export const parseAwashReceipt = (html: string): PaymentInfo => {
  const $ = cheerio.load(html);

  const get = (label: string): string => {
    const row = $("tr")
      .filter((_, el) => {
        const text = $(el).text().replace(/\s+/g, " ").trim();
        return text.toLowerCase().includes(label.toLowerCase());
      })
      .first();

    return row.find("td").eq(2).text().trim();
  };

  const amountText = get("Amount");
  const vatText = get("VAT");

  const parseNumber = (v: string) => parseFloat(v.replace(/[^\d.]/g, "")) || 0;

  const transactionTime =
    get("Transaction Time") == ""
      ? get("Transaction Date")
      : get("Transaction Date");

  const senderName = get("Sender Name");
  const senderAccount = get("Sender Account");

  const beneficiaryName =
    get("Beneficiary name") == ""
      ? get("Sender Name")
      : get("Beneficiary name");
  const beneficiaryAccount =
    get("Beneficiary Account") == ""
      ? get("Sender Account")
      : get("Beneficiary Account");

  const transactionId = get("Transaction ID");

  return {
    Payer: senderName,

    Account: senderAccount,

    CreaditedPartyName: beneficiaryName,

    BankAccountNumber: beneficiaryAccount,

    Amount: parseNumber(amountText),

    Date: new Date(transactionTime),

    Reference: transactionId,

    Status: "SUCCESS",
  };
};
