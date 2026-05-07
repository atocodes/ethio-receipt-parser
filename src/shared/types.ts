export type PaymentInfo = {
  Payer: string;
  Account: string;
  CreaditedPartyName: string;
  Status: string;
  BankAccountNumber: string;
  Amount: number;
  Date: Date;
  Reference?: string;
  ReceiptUrl?: string;
};
