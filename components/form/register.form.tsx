"use client"
import { useState } from "react";
import Input from "../ui/input";
import { useForm } from 'react-hook-form';
import * as yup from "yup";

type TRegister = {
  fullName : string,
  email : string,
  password : string,
  cpassword : string,
  phone : string
}

const registerSchema = yup.object({
    fullName:yup.string().required(),
    email:yup.string().email().required(),
    password:yup.string().required(),
    cpassword:yup.string().required(),
    phone:yup.string().required()
})

const LoginForm = () => {

  const { register, handleSubmit} = useForm<TRegister>({
    defaultValues : {
    fullName : '',
    email : '',
    password : '',
    cpassword : '',
    phone : ''
    }
  })

  const onSubmit = (data: TRegister) => {
    console.log("form Submitted", data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 mt-4">
        <Input
        register = {register}
        id="fullName"
        label="Full Name"
        name="fullName"
        placeholder="Enter your full name"
        type={"text"}
      />

      <Input
      register = {register}
        id="email"
        label="Email"
        name="email"
        placeholder="Enter email or phone number"
        type={"email"}
      />

      <Input
      register = {register}
        id="password"
        label="Password"
        name="password"
        placeholder="Enter your password"
        type={"password"}
      />

      <Input
      register = {register}
        id="cpassword"
        label="Confirm Password"
        name="cpassword"
        placeholder="Enter your confirm password"
        type={"password"}
      />

      <Input
      register = {register}
        id="phone"
        label="Phone"
        name="phone"
        placeholder="Enter phone number"
        type={"text"}
      />

      <div className="mt-5">
        <button
            type={"submit"}
            className="bg-sky-500 text-white font-bold w-full py-3 cursor-pointer rounded-sm hover:bg-sky-400 active:bg-sky-600 transition-all duration-300">Sign Up</button>
      </div>
    </form>
  );
};

export default LoginForm;
