"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

const LongIn = () => {
    const [user, setUser] = useState({
        userEmail: "",
        userPassword: "",
    });
    const [errorInLogIn, setErrorInLogIn] = useState("");
    const [successInLogIn, setSuccessInLogIn] = useState("");
    const router = useRouter();

    const onSignIn = async (e: any) => {
        e.preventDefault();
        if (!user.userEmail || !user.userPassword) {
            setErrorInLogIn("All fields are required!");
            return;
        }

        const resUserExists = await axios.post("api/users/userExists", user);
        if (!resUserExists.data.user) {
            setErrorInLogIn("User Doesn't Exists");
            return;
        }

        await axios
            .post("api/users/login", user)
            .then((res) => {
                if (res.data.message === "Invalid Credentials") {
                    setErrorInLogIn(res.data.message);
                } else {
                    setSuccessInLogIn("SuccessFully Logged In");
                    setTimeout(() => {
                        router.replace("/profile");
                    }, 3000);
                }
            })
            .catch((err) => {
                setErrorInLogIn("Problem In Logging In");
            });
    };
    return (
        <div className="grid place-content-center h-screen">
            <div className="p-5 shadow-xl rounded-lg bg-gray-100 flex flex-col items-center gap-3">
                <h1 className="text-lg text text-gray-600 font-semibold">
                    Enter Your Details
                </h1>
                <form
                    className="flex flex-col gap-3 relative"
                    onSubmit={onSignIn}
                >
                    <input
                        type="email"
                        placeholder="Email"
                        onChange={(e) => {
                            setErrorInLogIn("");
                            setUser({ ...user, userEmail: e.target.value });
                        }}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => {
                            setErrorInLogIn("");
                            setUser({ ...user, userPassword: e.target.value });
                        }}
                    />
                    <button
                        type="submit"
                        className="rounded-lg bg-green-600 text-white py-2 px-6 w-fit mx-auto"
                    >
                        Log In
                    </button>
                    {errorInLogIn && (
                        <div className="bg-red-500 text-white w-fit text-sm px-2 py-1 rounded-md absolute -bottom-16 right-1/2 translate-x-1/2">
                            {errorInLogIn}
                        </div>
                    )}
                    {successInLogIn && (
                        <div className="text-white bg-green-600 w-fit text-sm px-2 py-1 rounded-md absolute -bottom-16 right-1/2 translate-x-1/2">
                            {successInLogIn}
                        </div>
                    )}
                    <div className="text-end">
                        Don&#39;t have an account?{" "}
                        <Link
                            href={"/signup"}
                            className="p-0 underline hover:text-green-600"
                        >
                            SignUp
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LongIn;
