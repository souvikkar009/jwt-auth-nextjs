import { connectMongoDB } from "@/db/connectDB";
import User from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectMongoDB();
        const result = await req.json();
        const { userEmail } = result;
        const existingUser = await User.findOne({ userEmail });
        return NextResponse.json({ user: existingUser });
    } catch (err: any) {
        return NextResponse.json({ message: err, success: 0 }, { status: 500 });
    }
}
