"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../redux/usersApiSlice";
import { setCredentials } from "../redux/authSlice";

const page = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();

  const { userInfo } = useSelector((state) => state.auth);

  const [register, { isLoading }] = useRegisterMutation();

  useEffect(() => {
    if (userInfo) {
      router.push("/");
    }
  }, [userInfo]);
  const handleSubmit = async (e) => {
    console.log(name, email, password, confirmPassword);
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("passwords do not match");
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="p-5 bg-gray-300 flex flex-col gap-2"
      >
        <div className="flex gap-2 justify-between items-center">
          <label>Name</label>
          <input
            placeholder="Enter Name"
            value={name}
            name="name"
            onChange={(e) => setName(e.target.value)}
            className="rounded-md p-2"
          />
        </div>
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

        <div className="flex gap-2 justify-between items-center">
          <label>Confirm Password</label>
          <input
            placeholder="Confirm Password"
            value={confirmPassword}
            name="confirmPassword"
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="rounded-md p-2"
          />
        </div>
        <button className="px-3 py-2 bg-black text-white rounded-md">
          Sign up
        </button>
        <span>
          Already have an account? <Link href="/signin">Sign In</Link>
        </span>
        {isLoading && <span>Loading...</span>}
      </form>
    </div>
  );
};

export default page;
