import { PaymentInfo } from "../../shared/types";

export function parseBoaReceipt(data: any): PaymentInfo {
  const receipt = data?.body?.[0];

  if (!receipt) {
    throw new Error("Invalid BOA receipt format");
  }

  return {
    Payer: receipt["Payer's Name"] || receipt["Source Account Name"] || "",

    Account: receipt["Source Account"] || "",

    CreaditedPartyName: receipt["Receiver's Name"] || "",

    BankAccountNumber: receipt["Receiver's Account"] || "",

    Amount: parseFloat(receipt["Transferred Amount"] || "0"),

    Date: new Date(receipt["Transaction Date"]) || new Date(),

    Reference: receipt["Transaction Reference"] || "",

    Status: "SUCCESS",
  };
}