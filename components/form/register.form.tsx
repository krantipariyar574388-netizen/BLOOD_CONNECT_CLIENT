"use client"
import { useState } from "react";
import Input from "../ui/input";

const LoginForm = () => {

const [formData, setFormData] = useState({
    fullName : '',
    email : '',
    password : '',
    cpassword : '',
    phone : ''
  })

  const onChange = (e : React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    setFormData((prev: any) => {
      return {
        ...prev,
        [e.target.name] : e.target.value
      }
    })
  }

  const onSubmit = (e : React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Register submitted', formData)
  }


  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5 mt-4">
        <Input
        onChange={onChange}
        id="fullName"
        label="Full Name"
        name="fullName"
        placeholder="Enter your full name"
        type={"text"}
      />

      <Input
      onChange={onChange}
        id="email"
        label="Email"
        name="email"
        placeholder="Enter email or phone number"
        type={"email"}
      />

      <Input
      onChange={onChange}
        id="password"
        label="Password"
        name="password"
        placeholder="Enter your password"
        type={"password"}
      />

      <Input
      onChange={onChange}
        id="cpassword"
        label="Confirm Password"
        name="cpassword"
        placeholder="Enter your confirm password"
        type={"password"}
      />

      <Input
      onChange={onChange}
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
