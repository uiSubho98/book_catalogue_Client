import React, { useEffect, useState } from "react";
import { Label } from "./ui/AuthFormLabel";
import { Input } from "./ui/AuthForm";
import { cn } from "../utils/cn";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { authenticateUser } from "../Redux/features/AuthSlice";
import { useNavigate } from "react-router-dom";
import MultiStepLoaderDemo from "./Loading";

const SignIn = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const { status, user, error, loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);
  if (loading) {
    return <MultiStepLoaderDemo loading={loading} />;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      authenticateUser({ email: formData.email, password: formData.password })
    );
  };

  const handleLoginAsGuest = () => {
    dispatch(
      authenticateUser({ email: "dsubhojit063@gmail.com", password: "123456" })
    );
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-[80%] h-[70%]  overflow-auto">
        <div className="max-w-md w-full h-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-black dark:bg-black">
          <h2 className="font-bold text-xl text-white dark:text-neutral-200">
            Welcome to BookNest
          </h2>
          <p className="text-white text-sm max-w-sm mt-2 dark:text-neutral-300">
            Login to BookNest if you can, otherwise login as a guest.
          </p>

          <form className="my-8" onSubmit={handleSubmit}>
            {isRegistering && (
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                <LabelInputContainer>
                  <Label className="text-white" htmlFor="firstname">
                    Name
                  </Label>
                  <Input
                    style={{ border: "1px solid white" }}
                    id="firstname"
                    placeholder="Tyler"
                    className="bg-transparent text-white "
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </LabelInputContainer>
              </div>
            )}
            <LabelInputContainer className="mb-4">
              <Label className="text-white" htmlFor="email">
                Email Address
              </Label>
              <Input
                id="email"
                placeholder="projectmayhem@fc.com"
                type="email"
                className="bg-transparent text-white "
                style={{ border: "1px solid white" }}
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label className="text-white" htmlFor="password">
                Password
              </Label>
              <Input
                id="password"
                placeholder="••••••••"
                type="password"
                value={formData.password}
                className="bg-transparent text-white "
                style={{ border: "1px solid white" }}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </LabelInputContainer>
            <button
              className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              type="submit"
            >
              {isRegistering ? "Sign Up" : "Sign In"} &rarr;
              <BottomGradient />
            </button>

            <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

            <div className="flex flex-col space-y-4">
              {!isRegistering && (
                <button
                  className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input border border-white bg-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                  type="button"
                  onClick={handleLoginAsGuest}
                >
                  <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                  <span className="text-white  dark:text-neutral-300 text-sm">
                    Login as Guest
                  </span>
                  <BottomGradient />
                </button>
              )}

              <button
                className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-black border border-white dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                type="button"
                onClick={() => setIsRegistering(!isRegistering)}
              >
                <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                <span className="text-white dark:text-neutral-300 text-sm">
                  {isRegistering ? "Login" : "Register"}
                </span>
                <BottomGradient />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

export default SignIn;
