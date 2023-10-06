"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Profile = () => {
    const router = useRouter();
    const [user, setUser] = useState({
        userName: "",
        userEmail: "",
    });

    useEffect(() => {
        axios
            .get("api/users/me")
            .then((res) => {
                setUser({
                    userName: res.data.user.userName,
                    userEmail: res.data.user.userEmail,
                });
            })
            .catch((err) => console.log(err));
    }, []);

    const handleLogOut = async (e: any) => {
        e.preventDefault();
        await axios
            .get("api/users/logout")
            .then(() => {
                setTimeout(() => {
                    router.replace("/login");
                }, 2000);
            })
            .catch((err) => console.log(err));
    };
    return (
        <div className="grid place-content-center h-screen">
            <div className="p-5 shadow-xl rounded-lg bg-gray-100 flex flex-col items-center gap-3 text-lg text-gray-600">
                <div>
                    Name: <span className="font-bold">{user.userName}</span>
                </div>
                <div>
                    Email: <span className="font-bold">{user.userEmail}</span>
                </div>
                <button
                    className="rounded-lg bg-green-600 text-white py-2 px-6 w-fit mx-auto"
                    onClick={handleLogOut}
                >
                    LogOut
                </button>
            </div>
        </div>
    );
};

export default Profile;
