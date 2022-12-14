import jwt from "jsonwebtoken";

export function signJwt(
	payload: Record<string, unknown>,
	options?: jwt.SignOptions | undefined
) {
	const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY as string;
	return jwt.sign(payload, secretKey, {
		...(options && options),
	});
}

export function verifyJwt<T>(token: string, key: string, opts: any): T | null {
	try {
		const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY as string;
		return jwt.verify(token, secretKey, opts) as T;
	} catch (error) {
		console.error(error);
		return null;
	}
}
