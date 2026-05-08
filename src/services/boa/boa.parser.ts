import { PaymentInfo } from "../../shared/types";

const parseBoaDate = (value: string): Date => {
  const [datePart, timePart] = value.split(" ");

  const [day, month, year] = datePart!.split("/");
  const [hour, minute] = timePart!.split(":");

  return new Date(
    Number(`20${year}`),
    Number(month) - 1,
    Number(day),
    Number(hour),
    Number(minute),
  );
};

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

    Date: parseBoaDate(receipt["Transaction Date"]),

    Reference: receipt["Transaction Reference"] || "",

    Status: "SUCCESS",
  };
}
