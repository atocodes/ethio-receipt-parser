import { PaymentInfo } from "../../shared/types";
import { fetchAwashReciept } from "./awash.client";
import { parseAwashReceipt } from "./awash.parser";
const baseUrl = "https://awashpay.awashbank.com:8225/";

export const handleAwashReciept = async (url: string) => {
  const id = url.substring(baseUrl.length);
  const res = await fetchAwashReciept(id);
  return {
    ...parseAwashReceipt(res),
    ReceiptUrl: url,
    Reference: url.slice(baseUrl.length),
  } as PaymentInfo;
};
