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
    "https://awashbank.com/receipt?id=XXXX",
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

# Important Note About CBE

The CBE parser is currently working, but it is still under maintenance for a more permanent and reliable solution.

At the moment, CBE parsing depends on request-specific values such as:

- `x-app-id`
- client keys
- internal request headers
- validation tokens

These values are currently hardcoded internally.

As the developer, I do not consider this a reliable long-term approach because CBE may change these values at any time.

If the CBE parser suddenly stops working, the first thing to inspect is:

- changed `x-app-id`
- expired client keys
- modified request headers
- updated request validation rules

Most CBE-related issues will likely originate from those changes.

A better dynamic extraction system is currently being researched.

---

# API

## BOA

```ts
handleBoaReceipt(url: string)
```

### Example

```ts
const result = await handleBoaReceipt(receiptUrl);
```

---

## CBE

```ts
handleCbeReceipt(url: string)
```

### Example

```ts
const result = await handleCbeReceipt(receiptUrl);
```

---

## Telebirr

```ts
handleTelebirrReceipt(url: string)
```

### Example

```ts
const result = await handleTelebirrReceipt(receiptUrl);
```

---

---

## Awash

```ts
handleAwashReceipt(url: string)
```

### Example

```ts
const result = await handleAwashReceipt(receiptUrl);
```

---

# Project Structure

```txt
src
├── core
│   └── http
│       └── axios.client.ts
├── services
│   ├── boa
│   ├── cbe
│   ├── telebirr
│   └── awash
├── shared
│   ├── payment.parser.ts
│   ├── types.ts
│   └── utils.ts
└── index.ts
```

---

# Architecture

Each provider follows the same structure:

```txt
provider/
├── provider.client.ts
├── provider.parser.ts
├── provider.service.ts
└── index.ts
```

## Responsibilities

| File      | Purpose               |
| --------- | --------------------- |
| `client`  | Handles HTTP requests |
| `parser`  | Extracts receipt data |
| `service` | Main business logic   |
| `index`   | Exports module APIs   |

---

# Development

## Clone Repository

```bash
git clone <repo-url>
```

## Install Dependencies

```bash
pnpm install
```

## Run Development Mode

```bash
pnpm dev
```

## Build

```bash
pnpm build
```

## Test

```bash
pnpm test
```

---

# Use Cases

- Telegram bots
- Payment verification systems
- Fintech apps
- Internal dashboards
- Accounting automation
- Transaction extraction pipelines
- Mobile app backends

---

# Roadmap

- Better CBE dynamic request handling
- Awash Bank support
- Dashen Bank support
- OCR support for screenshots/images
- PDF receipt parsing improvements
- Automatic provider detection
- Webhook-ready integrations

---

# Contributing

Contributions are welcome.

Especially useful contributions include:

- additional bank support
- parser stability improvements
- token extraction research
- test receipt samples
- TypeScript improvements
- better error handling

---

# Disclaimer

This package is not affiliated with any Ethiopian bank or payment provider.

Banks may update their APIs, security systems, HTML structure, or validation methods at any time, which may temporarily affect parser stability.

Use responsibly.

---

# License

MIT
