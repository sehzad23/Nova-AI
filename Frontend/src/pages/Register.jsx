import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { registerUser } from "../api/auth.api";

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // const response = await axios.post(
      //   "http://localhost:3000/api/auth/register",
      //   {
      //     fullName: {
      //       firstName: data.firstName,
      //       lastName: data.lastName,
      //     },
      //     email: data.email,
      //     password: data.password,
      //   },
      //   {
      //     withCredentials: true,
      //   },
      // );

      const response = await registerUser({
        fullName: {
          firstName: data.firstName,
          lastName: data.lastName,
        },
        email: data.email,
        password: data.password,
      });

      console.log("Register details", response.data);
      toast.success("Account created successfully!", {
        description: "Welcome to Nova AI. Sign in to start chatting.",
      });
      navigate("/login");
    } catch (error) {
      toast.error("Registration failed", {
        description:
          error.response?.data?.message ||
          "Something went wrong. Please try again.",
      });
      console.log("Register Error", error.response?.data || error.message);
    }
  };

  return (
    <main className="min-h-screen bg-[#121212] px-4 py-8 sm:px-6 lg:px-8">
      <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl items-center justify-center">
        <div className="w-full max-w-md rounded-[2rem] border border-slate-800 bg-[#171717] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.35)] sm:p-10">
          <div className="mb-8 text-center">
            <h1 className="mt-3 md:text-3xl text-xl font-semibold text-slate-100">
              Register
            </h1>
            <p className="mt-3 text-sm text-slate-400">
              Create your account to start using Nova AI.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  className="mb-2 block text-sm font-medium text-slate-300"
                  htmlFor="firstName"
                >
                  First name
                </label>
                <input
                  className="w-full rounded-3xl border border-slate-800 bg-[#121212] px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                  id="firstName"
                  placeholder="First name"
                  type="text"
                  {...register("firstName", {
                    required: "First name is required",
                    minLength: {
                      value: 2,
                      message: "First name must be at least 2 characters",
                    },
                  })}
                />
                {errors.firstName && (
                  <p className="mt-2 text-sm text-rose-400">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  className="mb-2 block text-sm font-medium text-slate-300"
                  htmlFor="lastName"
                >
                  Last name
                </label>
                <input
                  className="w-full rounded-3xl border border-slate-800 bg-[#121212] px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                  id="lastName"
                  placeholder="Last name"
                  type="text"
                  {...register("lastName", {
                    required: "Last name is required",
                    minLength: {
                      value: 2,
                      message: "Last name must be at least 2 characters",
                    },
                  })}
                />
                {errors.lastName && (
                  <p className="mt-2 text-sm text-rose-400">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

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
                placeholder="Create a password"
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                  maxLength: {
                    value: 20,
                    message: "Password cannot exceed 20 characters",
                  },
                  pattern: {
                    value:
                      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()[\]{}_\-+=|\\:;"'<>,./~`]).{8,20}$/,
                    message:
                      "Password must contain at least 1 uppercase letter, 1 number and 1 special character",
                  },
                })}
              />
              {errors.password && (
                <p className="mt-2 text-sm text-rose-400">
                  {errors.password.message}
                </p>
              )}
            </div>
            <p className="mt-2 text-xs text-slate-400 text-center">
              8–20 characters, including 1 uppercase letter, 1 number, and 1
              special character.
            </p>

            <button
              className="w-full rounded-3xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
              type="submit"
            >
              Register
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link
              className="font-semibold text-emerald-300 hover:text-emerald-200"
              to="/login"
            >
              Login
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Register;
