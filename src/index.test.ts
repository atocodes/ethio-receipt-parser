import {
  handleBoaReceipt,
  handleCbeReceipt,
  handleTelebirrReciept,
} from "./services";

const runTests = async () => {
  try {
    console.log("============= BOA =============");
    const boa = await handleBoaReceipt(
      "https://cs.bankofabyssinia.com/slip/?trx=FT250450L6BY24875",
    );

    console.dir(boa, { depth: null });

    console.log("\n============= CBE PDF =============");

    const cbePdf = await handleCbeReceipt(
      "https://apps.cbe.com.et:100/?id=FT261268S07T60380118",
    );

    console.dir(cbePdf, { depth: null });

    console.log("\n============= CBE JSON =============");

    const cbeJson = await handleCbeReceipt(
      "https://mbreciept.cbe.com.et/FT26119YLRPV-16432426",
    );

    console.dir(cbeJson, { depth: null });

    console.log("\n============= Telebirr =============");

    const telebirr = await handleTelebirrReciept(
      "https://transactioninfo.ethiotelecom.et/receipt/DA28H8CPHE",
    );

    console.dir(telebirr, { depth: null });

    console.log("\n ✅ All receipt parsers executed successfully.");
  } catch (error) {
    console.error("\n❌ Test failed:");
    console.error(error);
  }
};


runTests()
