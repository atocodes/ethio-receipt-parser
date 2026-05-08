import { PaymentInfo } from "../../shared/types";
import { fetchBoaReceipt } from "./boa.client";
import { parseBoaReceipt } from "./boa.parser";

const baseUrl = "https://cs.bankofabyssinia.com/slip/?trx=";

export const handleBoaReceipt = async (url: string) => {
  const id = url.substring(baseUrl.length);
  const res = await fetchBoaReceipt(id);
  return {
    ...parseBoaReceipt(res),
    ReceiptUrl: url,
  } as PaymentInfo;
};
