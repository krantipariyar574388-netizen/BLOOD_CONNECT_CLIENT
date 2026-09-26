"use client"
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from '@tanstack/react-query';
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation';
import Input from "../ui/input";
import Select from "../ui/select";
import FileInput from "../ui/file-input";
import { bloodRequestSchema } from "@/schema/bloodRequest.schema";
import { TCreateBloodRequest } from "@/types/bloodRequest.types";
import { BLOOD_GROUP_OPTIONS } from "@/constants/bloodGroup";
import { URGENCY_OPTIONS } from "@/constants/urgency";
import { createBloodRequest } from "@/api/bloodRequest.api";

const BloodRequestForm = () => {
  const router = useRouter();

  const { register: formRegister, handleSubmit, formState: { errors } } = useForm<TCreateBloodRequest>({
    defaultValues: {
      patient: '',
      bloodGroup: '',
      hospital: '',
      district: '',
      phone: '',
      requiredDate: '',
      urgency: '',
    },
    resolver: yupResolver(bloodRequestSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: TCreateBloodRequest) => createBloodRequest(data),
    onSuccess: (data) => {
      toast.success(data.message ?? "Blood request created successfully");
      router.replace('/dashboard/requester');
    },
    onError: (error: any) => {
      toast.error(error?.message ?? "Something went wrong. Please try again.");
    },
  });

  const onSubmit = (data: TCreateBloodRequest) => {
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 mt-4">
      <Input
        register={formRegister}
        id="patient"
        label="Patient Name"
        name="patient"
        placeholder="Enter patient's full name"
        type="text"
        error={errors?.patient?.message}
      />

      <Select
        register={formRegister}
        id="bloodGroup"
        label="Blood Group Needed"
        name="bloodGroup"
        placeholder="Select blood group"
        options={BLOOD_GROUP_OPTIONS}
        error={errors?.bloodGroup?.message}
      />

      <Input
        register={formRegister}
        id="units"
        label="Units Needed"
        name="units"
        placeholder="e.g. 2"
        type="number"
        error={errors?.units?.message}
      />

      <Input
        register={formRegister}
        id="hospital"
        label="Hospital"
        name="hospital"
        placeholder="Enter hospital name"
        type="text"
        error={errors?.hospital?.message}
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

      <Input
        register={formRegister}
        id="phone"
        label="Contact Phone"
        name="phone"
        placeholder="Enter contact phone number"
        type="number"
        error={errors?.phone?.message}
      />

      <Input
        register={formRegister}
        id="requiredDate"
        label="Required Date"
        name="requiredDate"
        type="date"
        error={errors?.requiredDate?.message}
      />

      <Select
        register={formRegister}
        id="urgency"
        label="Urgency"
        name="urgency"
        placeholder="Select urgency level"
        options={URGENCY_OPTIONS}
        error={errors?.urgency?.message}
      />

      <FileInput
        register={formRegister}
        id="medicalDocument"
        label="Medical Document / Prescription"
        name="medicalDocument"
        error={errors?.medicalDocument?.message as string}
      />

      <div className="mt-5">
        <button
          type="submit"
          disabled={isPending}
          className="bg-red-600 text-white font-bold w-full py-3 cursor-pointer rounded-sm hover:bg-red-500 active:bg-red-700 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isPending ? "Submitting..." : "Submit Request"}
        </button>
      </div>
    </form>
  );
};

export default BloodRequestForm;