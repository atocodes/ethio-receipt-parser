import { httpClient } from "../../core/http/axios.client";

export const fetchBoaReceipt = async (id: string) => {
  const res = await httpClient.get(
    `https://cs.bankofabyssinia.com/api/onlineSlip/getDetails/?id=${id}`,
  );
  return res.data;
};
