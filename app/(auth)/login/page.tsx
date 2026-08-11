import LoginForm from "@/components/form/login.form";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Login | Blood connect App",
  description: "Blood connect App login Page",
};

const LoginPage = () => {
  return (
    <main className="flex justify-center items-center min-h-screen">
      <section className="border border-gray-300 px-5 py-6 rounded-lg min-w-80">
        <div>
          <h1 className="text-xl font-semibold text-center text-sky-600">
            Login
          </h1>
          <p className="text-sm font-normal text-gray-700 mt-0.5">
            Welcome Back
          </p>
        </div>

        <LoginForm />
        <div className="mt-1">
          <Link href={"/forgot-password"}>
            <p className="text-sky-500 text-center text-[14px]">
              Forgot password?
            </p>
          </Link>

          <p className="text-center text-[14px]">
            Don&apos;t have an account?
            <Link href={"/register"}>
              <span className="text-sky-500 font-semibold">Sign Up</span>
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
