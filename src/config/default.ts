export const customConfig: {
	secretKey: string;
	jwtExpiresIn: string;
} = {
	secretKey: process.env.NEXT_PUBLIC_SECRET_KEY as string,
	jwtExpiresIn: process.env.NEXT_PUBLIC_JWT_EXPIRES_IN as string,
};
