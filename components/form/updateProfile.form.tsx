"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import Input from "../ui/input";
import FileInput from "../ui/file-input";
import { updateProfileSchema } from "@/schema/profile.schema";
import { TUpdateProfile } from "@/types/profile.types";
import { updateProfile } from "@/api/user.api";
import { TUser } from "@/types/user.types";

interface Props {
  user: TUser;
}

const UpdateProfileForm = ({ user }: Props) => {
  const queryClient = useQueryClient();

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm<TUpdateProfile>({
    defaultValues: {
      fullName: user.fullName,
      phone: user.phone,
      district: user.district,
    },
    resolver: yupResolver(updateProfileSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) => updateProfile(data),
    onSuccess: (res) => {
      toast.success(res.message ?? "Profile updated successfully");
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
    onError: (error: any) => {
      toast.error(error?.message ?? "Something went wrong. Please try again.");
    },
  });

  const onSubmit = (data: TUpdateProfile) => {
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <Input
        register={formRegister}
        id="fullName"
        label="Full Name"
        name="fullName"
        placeholder="Enter your full name"
        type="text"
        error={errors?.fullName?.message}
      />

      <Input
        register={formRegister}
        id="phone"
        label="Phone"
        name="phone"
        placeholder="Enter phone number"
        type="text"
        error={errors?.phone?.message}
      />

      <Input
        register={formRegister}
        id="district"
        label="District"
        name="district"
        placeholder="Enter district"
        type="text"
        error={errors?.district?.message}
      />

      <FileInput
        register={formRegister}
        id="profile_image"
        label="Profile Photo (optional)"
        name="profile_image"
        accept="image/*"
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

export default UpdateProfileForm;
