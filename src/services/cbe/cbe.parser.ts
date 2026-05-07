import { PaymentInfo } from "../../shared/types";

type ParseMode = "pdf" | "json";

export function parsePaymentInfo(
  content: string | any,
  mode: ParseMode = "pdf",
): PaymentInfo {
  if (mode === "json") {
    return parseFromJson(content);
  }

  return parseFromPdf(content as string);
}

function parseFromPdf(content: string): PaymentInfo {
  const clean = content.replace(/\r/g, "").trim();

  const extract = (label: string, nextLabel?: string) => {
    const escapedLabel = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    if (nextLabel) {
      const escapedNext = nextLabel.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

      const regex = new RegExp(
        `${escapedLabel}\\s*:?\\s*([\\s\\S]*?)\\s*${escapedNext}`,
        "i",
      );

      return regex.exec(clean)?.[1]?.trim() || "";
    }

    const regex = new RegExp(`${escapedLabel}\\s*:?\\s*(.+)`, "i");

    return regex.exec(clean)?.[1]?.trim() || "";
  };

  const amount =
    parseFloat(
      extract("Transferred Amount", "Commission or Service Charge").replace(
        /[^\d.]/g,
        "",
      ),
    ) || 0;

  const paymentDate = extract("Payment Date & Time", "Reference No");

  return {
    Payer: extract("Payer", "Account"),

    Account: clean.match(/Payer[\s\S]*?Account\s+([^\n]+)/i)?.[1]?.trim() || "",

    CreaditedPartyName: extract("Receiver", "Account"),

    BankAccountNumber:
      clean.match(/Receiver[\s\S]*?Account\s+([^\n]+)/i)?.[1]?.trim() || "",

    Amount: amount,

    Date: new Date(paymentDate),

    Reference: extract(
      "Reference No. (VAT Invoice No)",
      "Reason / Type of service",
    ),

    Status: "SUCCESS",
  };
}

function parseFromJson(data: any): PaymentInfo {
  return {
    Payer: data.debitAccountHolder || "",

    Account: data.debitAccountNo || "",

    CreaditedPartyName: data.creditAccountHolder || "",

    BankAccountNumber: data.creditAccountNo || "",

    Amount: parseFloat(data.amountCredited || "0"),

    Date:
      data.dateTimes?.[0] || data.processingDate || data.debitValueDate || "",

    Reference: data.id || data.debitTheirRef || data.creditTheirRef || "",

    ReceiptUrl: data.encodedReceipt || "",

    Status: "SUCCESS",
  };
}

export const parseCbePdf = (text: string) => parsePaymentInfo(text, "pdf");
export const parseCbeJson = (data: any) => parsePaymentInfo(data, "json");
