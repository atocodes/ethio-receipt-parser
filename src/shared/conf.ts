import * as dotenv from "dotenv";

dotenv.config();

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const TELEBIRR_RECEIPT = requireEnv("TELEBIRR_RECEIPT");
export const AWASH_RECEIPT = requireEnv("AWASH_RECEIPT");
export const BOA_RECEIPT = requireEnv("BOA_RECEIPT");
export const CBE_RECEIPT = requireEnv("CBE_RECEIPT");
export const CBE_PDF_RECEIPT = requireEnv("CBE_PDF_RECEIPT");