import type { TokenPayload } from './types';

// Reads the payload of a JWT. It does not verify the signature: only the backend knows the secret.
export function decodeToken(token: string): TokenPayload {
    // A JWT has three parts: header.payload.signature
    const payload = token.split('.')[1];
    // JWTs use base64url; atob() expects normal base64
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    // atob() returns one character per byte, TextDecoder turns the bytes into UTF-8 text (e.g. umlauts)
    const bytes = Uint8Array.from(atob(base64), (char) => char.charCodeAt(0));
    return JSON.parse(new TextDecoder().decode(bytes));
}
