export function getBaseUrl() {
  if (typeof window !== "undefined")
    // browser should use relative path
    return "";
  if (process.env.VERCEL_URL)
    // reference for vercel.com
    return `https://${process.env.VERCEL_URL}`;
  if (process.env.RENDER_INTERNAL_HOSTNAME)
    // reference for render.com
    return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;
  // assume localhost
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export function generateCreditCardNumber(length = 16): string {
  const prefix = "9";
  let cardNumber: string = prefix;

  for (let i = 0; i < length - 1; i++) {
    cardNumber += Math.floor(Math.random() * 10).toString();
  }

  let sum = 0;
  let doubleUp = false;
  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit: number = Number.parseInt(cardNumber.charAt(i), 10);
    if (doubleUp) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
    doubleUp = !doubleUp;
  }

  const checkDigit: number = (sum * 9) % 10;
  cardNumber += checkDigit;

  return cardNumber;
}

export function isValidCreditCardNumber(cardNumber: string): boolean {
  const digits: number[] = cardNumber.split("").map(Number);
  let sum = 0;
  let doubleUp = false;

  for (let i = digits.length - 2; i >= 0; i--) {
    // Start from the second-to-last digit
    let digit: number = digits[i];
    if (doubleUp) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
    doubleUp = !doubleUp;
  }

  return (sum * 9) % 10 === digits[digits.length - 1];
}
