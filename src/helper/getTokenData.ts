import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export const getDataFromToken = async (req: NextRequest) => {
    try {
        const token = req.cookies.get("token")?.value || "";

        const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
        return decodedToken.userId;
    } catch (error: any) {
        throw new Error(error.message);
    }
};
