import { connectMongoDB } from "@/db/connectDB";
import User from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
    try {
        await connectMongoDB();
        const reqBody = await req.json();
        const { userName, userEmail, userPassword } = reqBody;
        const salt = await bcrypt.genSalt(10);
        const hashedPasswrod = await bcrypt.hash(userPassword, salt);

        await User.create({
            userName,
            userEmail,
            userPassword: hashedPasswrod,
        });
        return NextResponse.json(
            { message: "User registration successful", success: 1 },
            { status: 201 }
        );
    } catch (err: any) {
        return NextResponse.json({ err, success: 0 }, { status: 500 });
    }
}
