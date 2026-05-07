import { PaymentInfo } from "./types";

export interface PaymentParser<T = any> {
  parse(data: T): PaymentInfo;
}

