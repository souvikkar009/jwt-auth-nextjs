import { connectMongoDB } from "@/db/connectDB";
import { getDataFromToken } from "@/helper/getTokenData";
import User from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await connectMongoDB();
        const userId = await getDataFromToken(req);
        const user = await User.findById({ _id: userId }).select(
            "-userPassword"
        );
        return NextResponse.json({
            user
        });
    } catch (error) {
        return NextResponse.json(
            {
                error: error,
            },
            { status: 400 }
        );
    }
}
