import { parseCbeJson, parseCbePdf } from "./cbe.parser";
import { PDFParse } from "pdf-parse";
import { fetchCbeTransaction } from "./cbe.client";
import { PaymentInfo } from "../../shared/types";

const pdfBaseUrl = "https://apps.cbe.com.et:100/?id=";
const webBaseUrl = "https://mbreciept.cbe.com.et/";

export const handleCbeReceipt = async (url: string) => {
  if (url.includes(pdfBaseUrl)) {
    const parser = new PDFParse({ url });
    const result = await parser.getText();
    return { ...parseCbePdf(result.text), ReceiptUrl: url } as PaymentInfo;
  }

  if (url.includes(webBaseUrl)) {
    const id = url.substring(webBaseUrl.length);
    const res = await fetchCbeTransaction(id);
    return {
      ...parseCbeJson(res),
      ReceiptUrl: url,
    } as PaymentInfo;
  }

  throw new Error("Invalid CBE URL");
};
