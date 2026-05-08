# ethio-receipt-parser

A modular TypeScript parser for Ethiopian banking and payment receipts.

`ethio-receipt-parser` helps developers extract structured transaction data from Ethiopian payment providers such as:

- Bank of Abyssinia (BOA)
- Commercial Bank of Ethiopia (CBE)
- Telebirr
- Awash Bank

Built for automation, fintech integrations, dashboards, bots, transaction verification systems, and internal tooling.

---

# Features

- Unified receipt parsing API
- Parse BOA receipt links
- Parse CBE receipt pages/PDFs
- Parse Telebirr receipts
- Parse Awash Bank receipts
- Clean TypeScript architecture
- Promise-based API
- Modular provider system
- Easily extendable
- Built for real-world integrations

---

# Installation

Using pnpm:

```bash
pnpm add ethio-receipt-parser
```

Using npm:

```bash
npm install ethio-receipt-parser
```

Using yarn:

```bash
yarn add ethio-receipt-parser
```

---

# Quick Start

```ts
import {
  handleBoaReceipt,
  handleCbeReceipt,
  handleTelebirrReceipt,
  handleAwashReceipt,
} from "ethio-receipt-parser";

const run = async () => {
  const boa = await handleBoaReceipt(
    "https://cs.bankofabyssinia.com/slip/?trx=XXXX",
  );

  const cbe = await handleCbeReceipt("https://apps.cbe.com.et:100/?id=XXXX");

  const telebirr = await handleTelebirrReceipt(
    "https://transactioninfo.ethiotelecom.et/receipt/XXXX",
  );

  const awash = await handleAwashReceipt(
    "https://awashpay.awashbank.com:8225/XXXX",
  );

  console.log(boa);
  console.log(cbe);
  console.log(telebirr);
  console.log(awash);
};

run();
```

---

# Example Output

```json
{
  "provider": "BOA",
  "payer": "ABEL TESFAYE DEMEKE",
  "account": "2******91",
  "creditedPartyName": "SELAMAWIT KASSA BERHANE",
  "bankAccountNumber": "7*****38",
  "amount": 54320,
  "date": "18/03/25 10:42",
  "reference": "FT259871KLMQ43210",
  "status": "SUCCESS"
}
```

---

# Supported Providers

| Provider | Status                      |
| -------- | --------------------------- |
| BOA      | Stable                      |
| Telebirr | Stable                      |
| CBE      | Working (Under Maintenance) |
| Awash    | Stable                      |

---

# Environment Variables (.env.example)

These environment variables are **only intended for testing and development purposes**.
They are useful for quick local experiments, automation scripts, and debugging.

⚠️ **These environment variables are intended for testing purposes only and should not be used in production environments.**

Create a `.env` file based on the example below:

```env
# Telebirr receipt link (testing only)
TELEBIRR_RECEIPT="https://transactioninfo.ethiotelecom.et/receipt/XXXXXXXXXX"

# Awash Bank receipt link (testing only)
AWASH_RECEIPT="https://awashpay.awashbank.com:8225/XXXXXXXXXXXX"

# Bank of Abyssinia receipt link (testing only)
BOA_RECEIPT="https://cs.bankofabyssinia.com/slip/?trx=XXXXXXXXXXXX"

# Commercial Bank of Ethiopia (CBE) receipt page (testing only)
CBE_RECEIPT="https://apps.cbe.com.et:100/?id=XXXXXXXXXXXX"

# CBE PDF receipt link (testing only)
CBE_PDF_RECEIPT="https://mbreciept.cbe.com.et/XXXXXXXXXXXX"
```

---

## Usage with `.env`

```ts
import {
  handleBoaReceipt,
  handleCbeReceipt,
  handleTelebirrReceipt,
  handleAwashReceipt,
} from "ethio-receipt-parser";

const run = async () => {
  const boa = await handleBoaReceipt(process.env.BOA_RECEIPT!);
  const cbe = await handleCbeReceipt(process.env.CBE_RECEIPT!);
  const telebirr = await handleTelebirrReceipt(process.env.TELEBIRR_RECEIPT!);
  const awash = await handleAwashReceipt(process.env.AWASH_RECEIPT!);

  console.log({ boa, cbe, telebirr, awash });
};

run();
```

---

# Important Note About CBE

The CBE parser is currently working, but still under maintenance for a more stable long-term solution.

It depends on internal request values such as:

- `x-app-id`
- client keys
- request headers
- validation tokens

These values are currently hardcoded internally.

If issues occur, check:

- changed `x-app-id`
- expired client keys
- modified headers
- updated validation rules

A dynamic extraction system is being researched.

---

# Project Structure

```txt
src/
├── core/
│   └── http/
├── services/
│   ├── boa/
│   ├── cbe/
│   ├── telebirr/
│   ├── awash/
├── shared/
└── index.ts
```

---

# Architecture

Each provider follows this structure:

```txt
provider/
├── provider.client.ts
├── provider.parser.ts
├── provider.service.ts
└── index.ts
```

| File    | Purpose              |
| ------- | -------------------- |
| client  | HTTP requests        |
| parser  | Extract receipt data |
| service | Business logic       |
| index   | Exports API          |

---

# Development

```bash
git clone <repo-url>
pnpm install
pnpm dev
pnpm build
pnpm test
```

---

# Use Cases

- Telegram bots
- Fintech apps
- Payment verification systems
- Accounting automation
- Dashboards
- Transaction pipelines

---

# Roadmap

- Improve CBE stability
- Enhance Awash parsing edge cases
- Dashen Bank support
- OCR receipt parsing
- Auto provider detection
- Webhook integrations

---

# Contributing

Contributions are welcome:

- Add new banks
- Improve parsers
- Add test cases
- Improve TypeScript types
- Fix edge cases

---

# Disclaimer

This project is not affiliated with any Ethiopian bank or payment provider.

Bank systems may change without notice, which can temporarily break parsing.

---

# License

MIT
