"use client"
import { useState } from "react";
import Input from "../ui/input";
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "@/schema/auth.schema";
import { TRegister } from "@/types/auth.types";
import {useMutation} from'@tanstack/react-query';
import { register as registerUser } from "@/api/auth.api";
import toast from "react-hot-toast";

const RegisterForm = () => {

  const { register: formRegister, handleSubmit,formState : {errors}} = useForm<TRegister>({
    defaultValues : {
    fullName : '',
    email : '',
    password : '',
    cpassword : '',
    phone : ''
    },
    resolver: yupResolver(registerSchema)
  })

    const {mutate, data, isPending, error} = useMutation({
      mutationFn: (data: TRegister) => registerUser(data),
      onSuccess: (data) => {
        console.log('Register success', data)
        toast.success(data.message ?? "Register success")
      },
      onError : (error) => {
        console.log("Register on error", error)
        toast.error(error?.message ?? "Register success")
      }
    })
  
    const onSubmit = async (data: TRegister) => {
      mutate(data)
    }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 mt-4">
        <Input
        register = {formRegister}
        id="fullName"
        label="Full Name"
        name="fullName"
        placeholder="Enter your full name"
        type={"text"}
        error={errors?.fullName?.message}
      />

      <Input
      register = {formRegister}
        id="email"
        label="Email"
        name="email"
        placeholder="Enter email or phone number"
        type={"email"}
        error={errors?.email?.message}
      />

      <Input
      register = {formRegister}
        id="password"
        label="Password"
        name="password"
        placeholder="Enter your password"
        type={"password"}
        error={errors?.password?.message}
      />

      <Input
      register = {formRegister}
        id="cpassword"
        label="Confirm Password"
        name="cpassword"
        placeholder="Enter your confirm password"
        type={"password"}
        error={errors?.cpassword?.message}
      />

      <Input
      register = {formRegister}
        id="phone"
        label="Phone"
        name="phone"
        placeholder="Enter phone number"
        type={"text"}
        error={errors?.phone?.message}
      />

      <div className="mt-5">
        <button
            type={"submit"}
            className="bg-sky-500 text-white font-bold w-full py-3 cursor-pointer rounded-sm hover:bg-sky-400 active:bg-sky-600 transition-all duration-300">Sign Up</button>
      </div>
    </form>
  );
};

export default RegisterForm;


