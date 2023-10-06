import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "Provide user's name!"],
    },
    userEmail: {
        type: String,
        required: [true, "Provide user's email"],
        unique: true,
    },
    userPassword: {
        type: String,
        required: [true, "Provide a password"],
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
