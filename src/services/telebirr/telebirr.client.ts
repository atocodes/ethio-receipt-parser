import { httpClient } from "../../core/http/axios.client";

export const fetchTelebirrTransaction = async (id: string) => {
  const res = await httpClient.get(
    `https://transactioninfo.ethiotelecom.et/receipt/${id}`,
  );

  return res.data;
};
