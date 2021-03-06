export type Base64EncodedString = string;
export type Base64UrlEncodedString = string;
export type WinstonString = string;
export type ArString = string;

export function toB64url(input: string): Base64UrlEncodedString {
  return Buffer.from(input)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
}

export function fromB64Url(input: Base64UrlEncodedString): Buffer {
  const paddingLength = input.length % 4 === 0 ? 0 : 4 - (input.length % 4);

  const base64 = input
      .replace(/-/g, '+')
      .replace(/_/g, '/')
      .concat('='.repeat(paddingLength));

  return Buffer.from(base64, 'base64');
}