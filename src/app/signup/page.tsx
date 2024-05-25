"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SignupSuccess from "./SignupSuccess";
import Loader from "@/components/custom/Loader/Loader";
import { poppins } from "../ui/fonts";
import lockSVG from "../../../public/lock.svg";
import emailSVG from "../../../public/mail-svgrepo-com.svg";
import usernameSVG from "../../../public/username.svg";

interface FormInputs {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

function Signup() {
    const [success, setSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        setError,
        formState: { errors, isSubmitting, isSubmitSuccessful },
    } = useForm<FormInputs>();

    const handleSignup: SubmitHandler<FormInputs> = async (data) => {
        if (data.password !== data.confirmPassword) {
            setError("confirmPassword", {
                message: "Passwords don't match",
            });
            return;
        }
        try {
            const response = await axios.post("/api/v1/users/signup", data);

            if (!response) {
                setError("root", {
                    message: "Error while sign up",
                });
                return;
            }

            if (response.status === 400) {
                setError("username", {
                    message: "Username already taken",
                });
            } else if (response.status === 201) {
                setSuccess(true);
            } else {
                setError("root", {
                    message: response.data.message,
                });
            }
        } catch (error: any) {
            setError("root", {
                message: error?.response?.data?.message,
            });
        }
    };

    return (
        <>
            {!success ? (
                <main className="h-screen w-screen flex flex-col flex-nowrap justify-center items-center">
                    <div className="bg-[#3b425b] my-4 lg:my-0 lg:mb-5 rounded-lg lg:gap-6 lg:justify-center flex w-[74%] mx-auto flex-col-reverse lg:flex-row flex-nowrap py-6 lg:py-10 lg:px-8">
                        {/* Form */}
                        <div
                            className={`${poppins.className} w-[87.5%] lg:w-[75%] font-semibold items-center gap-4 mx-auto justify-center flex flex-col h-full`}
                        >
                            <h2 className="lg:text-[2.5rem] text-3xl whitespace-nowrap">
                                Create Account
                            </h2>
                            <form
                                className="w-full mt-5 flex flex-col flex-nowrap gap-5 justify-center"
                                onSubmit={handleSubmit(handleSignup)}
                            >
                                <section className="flex relative flex-row-reverse flex-nowrap items-center">
                                    <Input
                                        className="py-5 pl-[3.25rem] font-medium dark:placeholder:text-[#ccc]"
                                        {...register("username", {
                                            required: {
                                                value: true,
                                                message: "Username is required",
                                            },
                                        })}
                                        placeholder="Username"
                                        type="text"
                                    />
                                    <img
                                        src={usernameSVG.src}
                                        className="absolute left-3 h-[40px] w-[1.45rem]"
                                        alt=""
                                    />
                                </section>

                                {errors.username && (
                                    <p className="text-red-300 text-sm font-light text-center">
                                        {errors.username.message}
                                    </p>
                                )}

                                <section className="flex relative flex-row-reverse flex-nowrap">
                                    <Input
                                        className="py-5 pl-[3.25rem] font-medium dark:placeholder:text-[#ccc]"
                                        {...register("email", {
                                            required: {
                                                value: true,
                                                message: "Email is required",
                                            },
                                            pattern: {
                                                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                                message: "Invalid email format",
                                            },
                                        })}
                                        placeholder="Email"
                                        type="email"
                                    />
                                    <img
                                        className="absolute left-[0.55rem] w-[1.7rem] h-[40px]"
                                        src={emailSVG.src}
                                        alt="Email image"
                                    />
                                </section>

                                {errors.email && (
                                    <p className="text-red-300 text-sm font-light text-center">
                                        {errors.email.message}
                                    </p>
                                )}

                                <section className="flex flex-row-reverse flex-nowrap relative items-center">
                                    <Input
                                        className="py-5 pl-[3.25rem] font-medium dark:placeholder:text-[#ccc]"
                                        {...register("password", {
                                            required: {
                                                value: true,
                                                message: "Password is required",
                                            },
                                            minLength: {
                                                value: 6,
                                                message:
                                                    "Password should contain minimum of 6 characters",
                                            },
                                        })}
                                        placeholder="Password"
                                        type="password"
                                    />

                                    <img
                                        src={lockSVG.src}
                                        className="absolute left-3 h-[1.45rem] w-[1.45rem]"
                                        alt=""
                                    />
                                </section>

                                {errors.password && (
                                    <p className="text-red-300 text-sm font-light text-center">
                                        {errors.password.message}
                                    </p>
                                )}

                                <section className="flex flex-row-reverse flex-nowrap relative items-center">
                                    <Input
                                        className="py-5 pl-[3.25rem] font-medium dark:placeholder:text-[#ccc]"
                                        {...register("confirmPassword", {
                                            required: {
                                                value: true,
                                                message: "Password is required",
                                            },
                                            minLength: {
                                                value: 6,
                                                message:
                                                    "Password should contain minimum of 6 characters",
                                            },
                                        })}
                                        placeholder="Confirm Password"
                                        type="password"
                                    />
                                    <img
                                        src={lockSVG.src}
                                        className="absolute left-3 h-[1.45rem] w-[1.45rem]"
                                        alt=""
                                    />
                                </section>

                                {errors.confirmPassword && (
                                    <p className="text-red-300 text-sm font-light text-center">
                                        {errors.confirmPassword.message}
                                    </p>
                                )}

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 h-9 px-4 py-5 pt-[1.270rem] ${isSubmitting ? "opacity-40" : "opacity-100"}`}
                                >
                                    {!isSubmitting ? (
                                        "Signup"
                                    ) : (
                                        <Loader classname="gap-0.5" />
                                    )}
                                </button>

                                {errors.root && (
                                    <p className="text-red-300 text-sm font-light text-center">
                                        {errors.root.message}
                                    </p>
                                )}

                                <p className="font-light">
                                    Have an account ?
                                    <Button
                                        className="px-3 hover:text-blue-400 transition-colors duration-75 py-1 text-[.925rem] text-white"
                                        variant={"link"}
                                    >
                                        <Link href={"/login"}>Login</Link>
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
            ) : (
                <SignupSuccess />
            )}
        </>
    );
}

export default Signup;
