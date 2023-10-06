import mongoose from "mongoose";

export async function connectMongoDB() {
    try {
        mongoose.connect(process.env.MONGODB_URI!);

        const connection = mongoose.connection;

        connection.on("connected", () => {
            console.log("MongoDB Connected");
        });
    } catch (error) {
        console.log(error);
    }
}
