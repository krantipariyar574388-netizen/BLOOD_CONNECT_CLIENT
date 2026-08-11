import Input from "../ui/input";

const LoginForm = () => {
  return (
    <form className="flex flex-col gap-5 mt-4">
      <Input
        id="email"
        label="Email"
        name="email"
        placeholder="Enter email or phone number"
        type={"email"}
      />

      <Input
        id="password"
        label="Password"
        name="password"
        placeholder="Enter your password"
        type={"password"}
      />

      <div className="mt-5">
        <button
            type={"submit"}
            className="bg-sky-500 text-white font-bold w-full py-3 cursor-pointer rounded-sm hover:bg-sky-400 active:bg-sky-600 transition-all duration-300">Login</button>
      </div>
    </form>
  );
};

export default LoginForm;
