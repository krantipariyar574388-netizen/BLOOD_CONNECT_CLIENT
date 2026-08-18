import RegisterForm from "@/components/form/register.form";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Register | Blood Connect App",
  description: "Blood connect App register Page",
};

const RegisterPage = () => {
  return (
    <main className="flex justify-center items-center min-h-screen">
      <section className="border border-gray-300 px-5 py-6 rounded-lg min-w-80">
        <div>
          <h1 className="text-xl font-semibold text-center text-sky-600">
            Create Account
          </h1>
        </div>

        <RegisterForm />
        <div className="mt-1">
          <p className="text-center text-[14px]">
            Already have an account?
            <Link href={"/login"}>
              <span className="text-sky-500 font-semibold">Login</span>
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default RegisterPage;
