import React from "react";

interface IProps {
  name: string;
  type?: "text" | "password" | "email";
  label: string;
  placeholder?: string;
  id: string;
}

const Input = ({
  name,
  id,
  label,
  placeholder = "start typing..",
  type = "text",
}: IProps) => {
  return (
    <div className="flex flex-col gap-0.5">
      <label className="text-sm front-semibold text-grap-600" htmlFor="email">
        {label}
      </label>
      <input
        id={id}
        name={name}
        placeholder={placeholder}
        type={type}
        className="border border-gray-300 px-2 py-3 rounded-md focus : outline-sky-500 "
      />
    </div>
  );
};

export default Input;
