import {
  handleBoaReceipt,
  handleCbeReceipt,
  handleTelebirrReciept,
  handleAwashReciept,
} from "./services";
import { AWASH_RECEIPT,  BOA_RECEIPT,  CBE_PDF_RECEIPT, CBE_RECEIPT, TELEBIRR_RECEIPT } from "./shared/conf";

const runTests = async () => {
  try {
    console.log("============= BOA =============");
    const boa = await handleBoaReceipt(
      BOA_RECEIPT
    );

    console.dir(boa, { depth: null });

    console.log("\n============= CBE PDF =============");

    const cbePdf = await handleCbeReceipt(
      CBE_PDF_RECEIPT
    );

    console.dir(cbePdf, { depth: null });

    console.log("\n============= CBE WEB =============");

    const cbeJson = await handleCbeReceipt(
      CBE_RECEIPT
    );

    console.dir(cbeJson, { depth: null });

    console.log("\n============= Telebirr =============");

    const telebirr = await handleTelebirrReciept(
      TELEBIRR_RECEIPT
    );

    console.dir(telebirr, { depth: null });

    console.log("\n============= Awash =============");

    const res = await handleAwashReciept(
      AWASH_RECEIPT
    );

    console.dir(telebirr, { depth: null });

    console.log("\n ✅ All receipt parsers executed successfully.");
  } catch (error) {
    console.error("\n❌ Test failed:");
    console.error(error);
  }
};

runTests();
