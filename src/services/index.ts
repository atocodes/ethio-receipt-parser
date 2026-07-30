import { handleTelebirrReciept } from "./telebirr";

export * from "./cbe";
export * from "./boa";
export * from "./telebirr";
export * from "./awash";

async function main() {
  const res = await handleTelebirrReciept(
    "https://transactioninfo.ethiotelecom.et/receipt/DGR5AG6NGJ",
  );

  console.log(res)
}


main()