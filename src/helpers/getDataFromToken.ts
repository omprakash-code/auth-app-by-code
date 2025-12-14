// import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export async function getDataFromToken(request: any) {
    try {
        const token = request.cookies.get("token")?.value || "";

        const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!)
        return decodedToken.id;
    } catch (error) {
        throw new Error("Invalid or expired token");
    }
}