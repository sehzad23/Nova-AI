import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { connectSocket } from "../socket/socket";
import { toast } from "sonner";
import { loginUser } from "../api/auth.api";

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // const response = await axios.post(
      //   "http://localhost:3000/api/auth/login",
      //   data,
      //   {
      //     withCredentials: true,
      //   },
      // );


      const response = await loginUser(data)

      connectSocket();
      navigate("/");
      toast.success("Welcome back! 👋", {
        description: "You're now signed in to Nova AI.",
      });
      console.log("Login Response", response.data);
    } catch (error) {
      toast.error("Oops! Something went wrong", {
        description: "Please check your details and try again.",
      });
      console.error("Login error:", error.response?.data || error.message);
    }
  };

  return (
    <main className="min-h-screen bg-[#121212] px-4 py-8 sm:px-6 lg:px-8">
      <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl items-center justify-center">
        <div className="w-full max-w-md rounded-[2rem] border border-slate-800 bg-[#171717] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.35)] sm:p-10">
          <div className="mb-8 text-center">
            <h1 className="mt-3 md:text-3xl text-xl font-semibold text-slate-100">
              Login
            </h1>
            <p className="mt-3 text-sm text-slate-400">
              Welcome back to Nova AI.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                className="mb-2 block text-sm font-medium text-slate-300"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="w-full rounded-3xl border border-slate-800 bg-[#121212] px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                id="email"
                placeholder="you@example.com"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Enter a valid email",
                  },
                })}
              />
              {errors.email && (
                <p className="mt-2 text-sm text-rose-400">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                className="mb-2 block text-sm font-medium text-slate-300"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="w-full rounded-3xl border border-slate-800 bg-[#121212] px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                id="password"
                placeholder="Enter your password"
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 4,
                    message: "Password must be at least 4 characters",
                  },
                })}
              />
              {errors.password && (
                <p className="mt-2 text-sm text-rose-400">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              className="w-full rounded-3xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
              type="submit"
            >
              Login
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Don’t have an account?{" "}
            <Link
              className="font-semibold text-emerald-300 hover:text-emerald-200"
              to="/register"
            >
              Register
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Login;
