"use client";

import React from "react";
import { poppins, ubuntu } from "../ui/fonts";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Loader from "@/components/custom/Loader/Loader";
import { useAppSelector, useAppDispatch } from "@/redux/hooks/hooks";
import { login } from "@/redux/features/auth/authSlice";

interface FormInputs {
    username_or_email: string;
    password: string;
}

function Login() {
    const router = useRouter();
    const appDispatch = useAppDispatch();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<FormInputs>();

    const handleLogin: SubmitHandler<FormInputs> = async (data) => {
        try {
            const response = await axios.post("/api/v1/users/login", data);

            if (!response) throw new Error("Error while login");

            if (response.status === 404) {
                setError("username_or_email", {
                    message: "User not found",
                });
            } else if (response.status !== 200) {
                setError("root", {
                    message: response.statusText,
                });
            } else {
                appDispatch(login());
                router.push("/dashboard");
            }
        } catch (error: any) {
            setError("root", {
                message: error?.response?.data?.error,
            });
        }
    };

    return (
        <>
            <main className="h-screen w-screen flex flex-col flex-nowrap justify-center items-center">
                <div className="bg-[#3b425b] my-4 lg:my-0 lg:mb-5 rounded-lg lg:gap-6 lg:justify-center flex w-[74%] mx-auto flex-col-reverse lg:flex-row flex-nowrap py-6 lg:py-10 lg:px-8">
                    {/* Form */}
                    <div
                        className={`${poppins.className} w-[87.5%] lg:w-[75%] font-semibold items-center gap-7 mx-auto justify-center flex flex-col h-full`}
                    >
                        <h2 className="text-[2.5rem] whitespace-nowrap">
                            Login
                        </h2>
                        <form
                            className="w-full mt-5 flex flex-col flex-nowrap gap-6 justify-center"
                            onSubmit={handleSubmit(handleLogin)}
                        >
                            <section className="flex relative flex-row-reverse flex-nowrap items-center">
                                <Input
                                    className="py-5 pl-[3.25rem] font-medium dark:placeholder:text-[#ccc]"
                                    {...register("username_or_email", {
                                        required: {
                                            value: true,
                                            message:
                                                "Username or email is required",
                                        },
                                    })}
                                    placeholder="Email or username"
                                    type="text"
                                />
                                <svg
                                    fill="#000000"
                                    width="1.35rem"
                                    height="40px"
                                    className="absolute left-3"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M12,1a11,11,0,0,0,0,22,1,1,0,0,0,0-2,9,9,0,1,1,9-9v2.857a1.857,1.857,0,0,1-3.714,0V7.714a1,1,0,1,0-2,0v.179A5.234,5.234,0,0,0,12,6.714a5.286,5.286,0,1,0,3.465,9.245A3.847,3.847,0,0,0,23,14.857V12A11.013,11.013,0,0,0,12,1Zm0,14.286A3.286,3.286,0,1,1,15.286,12,3.29,3.29,0,0,1,12,15.286Z" />
                                </svg>
                            </section>
                            {errors.username_or_email && (
                                <div className="text-red-300 text-sm font-light text-center">
                                    {errors.username_or_email.message}
                                </div>
                            )}

                            <section className="flex flex-row-reverse flex-nowrap relative items-center">
                                <Input
                                    className="py-5 pl-[3.25rem] font-medium dark:placeholder:text-[#ccc]"
                                    {...register("password", {
                                        minLength: {
                                            value: 6,
                                            message:
                                                "Password should contain atleast 6 characters",
                                        },
                                        required: {
                                            value: true,
                                            message: "Password is required",
                                        },
                                    })}
                                    placeholder="Password"
                                    type="password"
                                />
                                <svg
                                    width="1.425rem"
                                    height="1.45rem"
                                    viewBox="0 0 24 24"
                                    className="absolute left-3"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M7 10.0288C7.47142 10 8.05259 10 8.8 10H15.2C15.9474 10 16.5286 10 17 10.0288M7 10.0288C6.41168 10.0647 5.99429 10.1455 5.63803 10.327C5.07354 10.6146 4.6146 11.0735 4.32698 11.638C4 12.2798 4 13.1198 4 14.8V16.2C4 17.8802 4 18.7202 4.32698 19.362C4.6146 19.9265 5.07354 20.3854 5.63803 20.673C6.27976 21 7.11984 21 8.8 21H15.2C16.8802 21 17.7202 21 18.362 20.673C18.9265 20.3854 19.3854 19.9265 19.673 19.362C20 18.7202 20 17.8802 20 16.2V14.8C20 13.1198 20 12.2798 19.673 11.638C19.3854 11.0735 18.9265 10.6146 18.362 10.327C18.0057 10.1455 17.5883 10.0647 17 10.0288M7 10.0288V8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8V10.0288"
                                        stroke="#000000"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </section>

                            {errors.password && (
                                <div className="text-red-300 text-sm font-light text-center">
                                    {errors.password.message}
                                </div>
                            )}

                            <Button
                                className={`py-5 pt-[1.270rem] ${isSubmitting ? "opacity-40" : "opacity-100"}`}
                                type="submit"
                                variant={"secondary"}
                            >
                                {!isSubmitting ? "Login" : <Loader />}
                            </Button>

                            {errors.root && (
                                <div className="text-red-300 text-sm font-light text-center">
                                    {errors.root.message ??
                                        "Network connection error"}
                                </div>
                            )}

                            <p className="font-light">
                                New to Students Community ?
                                <Button
                                    className="px-3 hover:text-blue-400 transition-colors duration-75 py-1 text-[.955rem] text-white"
                                    variant={"link"}
                                >
                                    <Link href={"/signup"}>Signup</Link>
                                </Button>
                            </p>
                        </form>
                    </div>

                    <Separator
                        className="bg-[#212121] hidden lg:block w-[1.55px]"
                        orientation="vertical"
                    />

                    {/* Image */}
                    <div className="w-full min-h-fit grow flex flex-col flex-nowrap justify-center items-center">
                        <img
                            className="rounded-b-xl lg:rounded-none lg:rounded-l-xl shadow-sm shadow-card lg:w-full h-[100%] lg:h-full mb-8 lg:mb-1 w-[87.5%]"
                            src="./signup-cover.jpg"
                            alt="A orange bursty background for signup page cover"
                        />
                    </div>
                </div>
            </main>
        </>
    );
}

export default Login;
