# Ethiopian Payment Receipt Parser

A TypeScript-based receipt parser and extractor for Ethiopian payment providers.

This project parses and extracts transaction/payment information from different Ethiopian banking and payment systems such as:

- Bank of Abyssinia (BOA)
- Commercial Bank of Ethiopia (CBE)
- Telebirr
- Awash Bank (WIP)

The goal of this project is to provide a unified and clean transaction parsing layer for Ethiopian digital payment receipts.

---

# Features

- Parse BOA receipt pages
- Parse CBE receipt pages and PDFs
- Parse Telebirr transaction receipts
- Unified payment parser structure
- Modular service architecture
- Type-safe TypeScript implementation
- Axios-based HTTP layer
- Prisma support included
- Easily extendable for new providers

---

# Project Structure

```txt
.
├── dist
├── nodemon.json
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── prisma
│   └── schema.prisma
├── prisma.config.ts
├── result
│   ├── css
│   │   └── Style.css
│   ├── images
│   │   ├── bg.png
│   │   ├── call.jpg
│   │   ├── email.jpg
│   │   ├── Ethiotelecom.jpg
│   │   ├── facebook.jpg
│   │   ├── sms.jpg
│   │   ├── telebirr.png
│   │   ├── telegram.jpg
│   │   └── twitter.jpg
│   ├── index.html
│   └── js
│       ├── html2pdf.bundle.min_1.js
│       └── html2pdf.bundle.min.js
├── src
│   ├── core
│   │   └── http
│   │       └── axios.client.ts
│   ├── generated
│   ├── index.test.ts
│   ├── index.ts
│   ├── services
│   │   ├── awash
│   │   ├── boa
│   │   │   ├── boa.client.ts
│   │   │   ├── boa.parser.ts
│   │   │   ├── boa.service.ts
│   │   │   └── index.ts
│   │   ├── cbe
│   │   │   ├── cbe.client.ts
│   │   │   ├── cbe.parser.ts
│   │   │   ├── cbe.service.ts
│   │   │   └── index.ts
│   │   ├── index.ts
│   │   └── telebirr
│   │       ├── index.ts
│   │       ├── telebirr.client.ts
│   │       ├── telebirr.parser.ts
│   │       └── telebirr.service.ts
│   └── shared
│       ├── conf.ts
│       ├── payment.parser.ts
│       ├── types.ts
│       └── utils.ts
└── tsconfig.json
```

---

# Installation

## Clone the Repository

```bash
git clone <your-repository-url>
cd <project-name>
```

## Install Dependencies

Using pnpm:

```bash
pnpm install
```

---

# Development

Run development mode:

```bash
pnpm dev
```

Build project:

```bash
pnpm build
```

Run tests:

```bash
pnpm test
```

---

# Usage Example

```ts
import {
  handleBoaReceipt,
  handleCbeReceipt,
  handleTelebirrReceipt,
} from "./services";

const run = async () => {
  const boa = await handleBoaReceipt(
    "https://cs.bankofabyssinia.com/slip/?trx=XXXX"
  );

  const cbe = await handleCbeReceipt(
    "https://apps.cbe.com.et:100/?id=XXXX"
  );

  const telebirr = await handleTelebirrReceipt(
    "https://transactioninfo.ethiotelecom.et/receipt/XXXX"
  );

  console.log(boa);
  console.log(cbe);
  console.log(telebirr);
};

run();
```

---

# Current Provider Status

| Provider | Status                      |
| -------- | --------------------------- |
| BOA      | Working                     |
| Telebirr | Working                     |
| CBE      | Working (Under Maintenance) |
| Awash    | In Progress                 |

---

# Important Note About CBE Parser

The CBE parser is currently working, but it is still under maintenance for a more permanent and stable solution.

At the moment, the parser depends on hardcoded request values such as:

- `x-app-id`
- client keys
- request headers/tokens

As the developer, I personally do not believe this is the proper long-term solution because these values may change at any time from CBE's side.

If you encounter issues specifically with the CBE parser, the first thing you should investigate is:

- expired or changed `x-app-id`
- modified client keys
- updated request headers
- changed API validation rules

Most CBE-related failures will likely originate from those values changing.

A better dynamic solution is currently being researched.

---

# Architecture

Each provider follows a modular structure:

```txt
provider/
├── provider.client.ts
├── provider.parser.ts
├── provider.service.ts
└── index.ts
```

## Responsibilities

| File    | Responsibility      |
| ------- | ------------------- |
| client  | HTTP/network layer  |
| parser  | Raw receipt parsing |
| service | Business logic      |
| index   | Exports             |

---

# Tech Stack

- TypeScript
- Node.js
- Axios
- Prisma
- pnpm

---

# Goals

- Create a unified Ethiopian payment parser ecosystem
- Support more Ethiopian banks
- Improve parser reliability
- Reduce provider-specific hacks
- Provide developer-friendly APIs

---

# Disclaimer

This project is intended for educational, automation, and interoperability purposes.

Bank providers may change their systems, APIs, HTML structures, or security rules at any time, which can affect parser stability.

---

# Contributing

Contributions, fixes, and provider improvements are welcome.

Especially helpful contributions:

- additional bank support
- parser stability improvements
- dynamic token extraction
- test cases
- receipt samples

---

# License

MIT