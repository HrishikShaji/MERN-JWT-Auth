"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../redux/usersApiSlice";
import { setCredentials } from "../redux/authSlice";

const page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const [login, { isLoading, error }] = useLoginMutation();

  console.log(userInfo, "this ran");

  useEffect(() => {
    if (userInfo) {
      router.push("/");
    }
  }, [userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);

    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      router.push("/");
    } catch (err) {
      console.log(err?.data?.message);
    }
  };
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="p-5 bg-gray-300 flex flex-col gap-2"
      >
        <div className="flex gap-2 justify-between items-center">
          <label>Email</label>
          <input
            placeholder="Enter Email"
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-md p-2"
          />
        </div>
        <div className="flex gap-2 justify-between items-center">
          <label>Password</label>
          <input
            placeholder="Enter Password"
            value={password}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-md p-2"
          />
        </div>

        <button className="px-3 py-2 bg-black text-white rounded-md">
          Login
        </button>
        <span>
          New User? <Link href="/signup">Sign Up</Link>
        </span>
        {isLoading && <span>Loading...</span>}
      </form>
    </div>
  );
};

export default page;
