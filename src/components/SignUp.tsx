"use client";

import React from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

const SignUp = () => {
    const [user, setUser] = useState({
        userEmail: "",
        userPassword: "",
        userName: "",
    });
    const [errorInSignUp, setErrorInSignUp] = useState("");
    const [successInSignUp, setSuccessInSignUp] = useState("");
    const [direct, setDirect] = useState("Already have an account?");
    const router = useRouter();
    const onSignUp = async (e: any) => {
        e.preventDefault();
        if (!user.userEmail || !user.userName || !user.userPassword) {
            setErrorInSignUp("All fields are required!");
            return;
        }

        const resExistUser = await axios.post("api/users/userExists", user);
        if (resExistUser.data.user) {
            setErrorInSignUp("User Already Exists");
            return;
        }
        await axios
            .post("api/users/signup", user)
            .then(() => {
                setSuccessInSignUp("Successfully Signed In");
                setDirect("Go to")
            })
            .catch(() => {
                setErrorInSignUp("Problem in signed in");
            });
    };
    return (
        <div className="grid place-content-center h-screen">
            <div className="p-5 shadow-xl rounded-lg bg-gray-100 flex flex-col items-center gap-3">
                <h1 className="text-lg text text-gray-600 font-semibold">
                    SignUp
                </h1>
                <form
                    className="flex flex-col gap-3 relative"
                    onSubmit={onSignUp}
                >
                    <input
                        type="text"
                        placeholder="Full Name"
                        onChange={(e) => {
                            setErrorInSignUp("");
                            setUser({ ...user, userName: e.target.value });
                        }}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        onChange={(e) => {
                            setErrorInSignUp("");
                            setUser({ ...user, userEmail: e.target.value });
                        }}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => {
                            setErrorInSignUp("");
                            setUser({ ...user, userPassword: e.target.value });
                        }}
                    />
                    <button
                        type="submit"
                        className="rounded-lg bg-green-600 text-white py-2 px-6 w-fit mx-auto"
                    >
                        Register
                    </button>
                    {errorInSignUp && (
                        <div className="bg-red-500 text-white w-fit text-sm px-2 py-1 rounded-md absolute -bottom-16 right-1/2 translate-x-1/2">
                            {errorInSignUp}
                        </div>
                    )}
                    {successInSignUp && (
                        <div className="text-white bg-green-600 w-fit text-sm px-2 py-1 rounded-md absolute -bottom-16 right-1/2 translate-x-1/2">
                            {successInSignUp}
                        </div>
                    )}
                    {
                        <div className="text-end">
                            {direct}{" "}
                            <Link
                                href={"/login"}
                                className="p-0 underline hover:text-green-600"
                            >
                                LogIn
                            </Link>
                        </div>
                    }
                </form>
            </div>
        </div>
    );
};

export default SignUp;
