import jwt from "jsonwebtoken"

const getIdFromToken = (token: string) => {
    try {
        if (!token) return undefined;

        const decodedPayload: any = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, { maxAge: process.env.ACCESS_TOKEN_EXPIRY })

        if(!decodedPayload) return null;

        return decodedPayload.id

    } catch (error: any) {
        console.log(error.message);
    }
}