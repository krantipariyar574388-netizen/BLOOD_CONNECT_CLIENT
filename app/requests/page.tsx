import BloodRequestForm from "@/components/form/bloodRequest.form";

export default function NewBloodRequestPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF9F4] px-6 py-12">
      <div className="w-full max-w-lg bg-white border border-[#E5D3BC] rounded-2xl p-8">
        <h1 className="font-serif text-2xl font-semibold mb-1">Request Blood</h1>
        <p className="text-sm text-[#6b5f58] mb-6">
          Fill in the patient's details — nearby matching donors will be notified instantly.
        </p>
        <BloodRequestForm />
      </div>
    </div>
  );
}