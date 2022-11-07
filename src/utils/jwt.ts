import jwt from "jsonwebtoken";

export function signJwt(
    payload: Object,
    signingKey: string,
    options?: jwt.SignOptions | undefined
) {
    return jwt.sign(payload, signingKey, {
        ...(options && options)
    });
}