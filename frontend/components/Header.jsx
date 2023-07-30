"use client";
import { logout } from "@/app/redux/authSlice";
import { useLogoutMutation } from "@/app/redux/usersApiSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const [user, setUser] = useState({});
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const router = useRouter();

  useEffect(() => {
    setUser(userInfo);
    console.log(userInfo, "this ran");
  }, [userInfo]);

  const [logoutApiCall] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="h-[70px] px-5 w-full fixed z-10 bg-black p-2 flex justify-between items-center">
      <h1 className="text-xl font-semibold text-white">JWT STUDY</h1>
      <div className="flex gap-4">
        {user === null ? (
          <>
            <Link href="/signin" className="text-white text-lg ">
              Sign In
            </Link>
            <Link href="/signup" className="text-white text-lg ">
              Sign Up
            </Link>
          </>
        ) : (
          <div className="flex items-center gap-4">
            <h1 className="text-white">Logged in as {user.name}</h1>
            <button
              onClick={handleLogout}
              className="px-3 py-2 bg-black text-white rounded-md"
            >
              Log out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
