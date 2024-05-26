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
import { useAppDispatch } from "@/redux/hooks/hooks";
import lockSVG from "../../../public/lock.svg";
import usernameSVG from "../../../public/username.svg";
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
                                <img
                                    className="absolute left-3 h-[40px] w-[1.35rem]"
                                    src={usernameSVG.src}
                                    alt=""
                                />
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
                                <img
                                    className="absolute left-3 h-[1.45rem] w-[1.425rem]x"
                                    src={lockSVG.src}
                                    alt=""
                                />
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
