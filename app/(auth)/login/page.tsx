import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Blood connect App",
  description: "Blood connect App login Page",
};

const LoginPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form className="bg-white p-8 rounded-lg shadow-md w-75">
        <h1 className="text-center mb-5 text-xl font-semibold">Login</h1>

        <input 
          className="w-full px-2 py-2 mb-4 rounded border border-gray-300 outline-none focus-border-gray-500 box-border"
          type="email"
          id="email"
          placeholder="Enter your email"
          required
        />

        <input
          className="w-full px-2 py-2 mb-4 rounded border border-gray-300 outline-none focus:border-gray-500 box-border"
          type="password"
          id="password"
          placeholder="Enter your password"
          required
        />

        <button
          className="w-full py-2 bg-green-600 text-white rounded cursor-pointer text-base hover:bg-green-700 transition-colors"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;