"use client"
import { useState } from "react";
import Input from "../ui/input";
import { useForm } from 'react-hook-form';

type TLogin = {
  email : string,
  password : string
}

const LoginForm = () => {

  const { register, watch, handleSubmit} = useForm<TLogin>({
    defaultValues : {
      email : '',
      password : '',
    }
  })

  const onSubmit = (data: TLogin) => {
    console.log("form Submitted", data)
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 mt-4">
      <Input
      register = {register}
        id="email"
        label="Email"
        name="email"
        placeholder="Enter email or phone number"
        type={"email"}
      />

      <Input
        register = {register}        id="password"
        label="Password"
        name="password"
        placeholder="Enter your password"
        type={"password"}
      />

      <div className="mt-5">
        <button
            type={"submit"}
            className="bg-sky-500 text-white font-bold w-full py-3 cursor-pointer rounded-sm hover:bg-sky-400 active:bg-sky-600 transition-all duration-300">Login</button>
      </div>
    </form>
  );
};

export default LoginForm;
