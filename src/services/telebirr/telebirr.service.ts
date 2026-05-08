import { fetchTelebirrTransaction } from "./telebirr.client";
import { parseTelebirrReciept } from "./telebirr.parser";
const baseURL = "https://transactioninfo.ethiotelecom.et/receipt/";
export const handleTelebirrReciept = async (url: string) => {
  const id = url.substring(baseURL.length);
  const data = await fetchTelebirrTransaction(id);
  return {
    ...parseTelebirrReciept(data),
    ReceiptUrl: url,
  };
};
