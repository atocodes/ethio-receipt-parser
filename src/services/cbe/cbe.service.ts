import { parseCbeJson, parseCbePdf } from "./cbe.parser";
import { fetchCbeTransaction } from "./cbe.client";
import { PaymentInfo } from "../../shared/types";

const pdfBaseUrl = "https://apps.cbe.com.et:100/?id=";
const webBaseUrl = "https://mbreciept.cbe.com.et/";

export const handleCbeReceipt = async (url: string) => {
  if (url.includes(pdfBaseUrl)) {
    const { PDFParse } = await import("pdf-parse");
    const parser = new PDFParse({ url });
    const result = await parser.getText();
    return {
      ...parseCbePdf(result.text),
      ReceiptUrl: url,
      Reference: url.slice(pdfBaseUrl.length),
    } as PaymentInfo;
  }

  if (url.includes(webBaseUrl)) {
    const id = url.substring(webBaseUrl.length);
    const res = await fetchCbeTransaction(id);
    return {
      ...parseCbeJson(res),
      ReceiptUrl: url,
      Reference: url.slice(webBaseUrl.length),
    } as PaymentInfo;
  }

  throw new Error("Invalid CBE URL");
};
