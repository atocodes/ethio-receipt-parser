import { httpClient } from "../../core/http/axios.client";

export const fetchCbeTransaction = async (id: string) => {
  const res = await httpClient.get(
    `https://mb.cbe.com.et/api/v1/transactions/public/transaction-detail/${id}`,
    {
      headers: {
        "x-app-id": "d1292e42-7400-49de-a2d3-9731caa4c819",
        "x-app-version": "0a01980b-9859-1369-8198-59f403820000",
        origin: "https://mbreciept.cbe.com.et",
        referer: "https://mbreciept.cbe.com.et/",
      },
    },
  );
  return res.data;
};
