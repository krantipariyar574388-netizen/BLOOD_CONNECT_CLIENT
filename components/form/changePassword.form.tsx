"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import Input from "../ui/input";
import { changePasswordSchema } from "@/schema/profile.schema";
import { TChangePassword } from "@/types/profile.types";
import { changePassword } from "@/api/user.api";

const ChangePasswordForm = () => {
  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TChangePassword>({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    resolver: yupResolver(changePasswordSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: { oldPassword: string; newPassword: string }) =>
      changePassword(data),
    onSuccess: (res) => {
      toast.success(res.message ?? "Password changed successfully");
      reset();
    },
    onError: (error: any) => {
      toast.error(error?.message ?? "Something went wrong. Please try again.");
    },
  });

  const onSubmit = (data: TChangePassword) => {
    mutate({ oldPassword: data.oldPassword, newPassword: data.newPassword });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <Input
        register={formRegister}
        id="oldPassword"
        label="Current Password"
        name="oldPassword"
        placeholder="Enter current password"
        type="password"
        error={errors?.oldPassword?.message}
      />

      <Input
        register={formRegister}
        id="newPassword"
        label="New Password"
        name="newPassword"
        placeholder="Enter new password"
        type="password"
        error={errors?.newPassword?.message}
      />

      <Input
        register={formRegister}
        id="confirmNewPassword"
        label="Confirm New Password"
        name="confirmNewPassword"
        placeholder="Re-enter new password"
        type="password"
        error={errors?.confirmNewPassword?.message}
      />

      <button
        type="submit"
        disabled={isPending}
        className="bg-[#A8201A] hover:bg-[#7A1712] text-white font-bold w-full py-3 cursor-pointer rounded-sm transition-all duration-300 disabled:opacity-60"
      >
        {isPending ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

export default ChangePasswordForm;
