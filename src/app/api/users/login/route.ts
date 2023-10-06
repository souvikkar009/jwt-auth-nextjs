import { connectMongoDB } from "@/db/connectDB";
import User from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
    try {
        await connectMongoDB();
        const reqBody = await req.json();
        const { userEmail, userPassword }: any = reqBody;
        const user = await User.findOne({ userEmail });

        const validPassword = await bcrypt.compare(
            userPassword,
            user.userPassword
        );

        if (!validPassword) {
            return NextResponse.json({ message: "Invalid Credentials" });
        }

        const tokenData = {
            userId: user._id,
            userEmail: user.userEmail,
            userName: user.userName,
        };

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
            expiresIn: "1d",
        });

        const response = NextResponse.json({
            message: "User Login Successful",
        });

        response.cookies.set("token", token, {
            httpOnly: true,
        });
        return response;
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}
