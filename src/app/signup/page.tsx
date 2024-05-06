"use client";
import React from "react";
import { poppins } from "../ui/fonts";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

interface Inputs {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

function Signup() {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

    const handleSignup: SubmitHandler<Inputs> = async (data) => {
        console.log(data);
    };

    return (
        <>
            <AspectRatio className="" ratio={16 / 7}>
                <div className="bg-[#30364b] rounded-lg flex w-[74%] h-[70%] mx-auto mt-10 flex-row flex-nowrap p-6">
                    {/* Form */}
                    <div
                        className={`${poppins.className} font-semibold items-center gap-4 justify-center flex flex-col h-full w-full`}
                    >
                        <h2 className="text-3xl">Create Account</h2>
                        <form
                            className="w-[75%] mt-5 flex flex-col flex-nowrap gap-5 justify-center"
                            onSubmit={handleSubmit(handleSignup)}
                        >
                            <Input
                                className="py-5 pl-3.5 font-medium"
                                {...register("name")}
                                placeholder="Name"
                                required={true}
                                type="text"
                            />
                            <Input
                                className="py-5 pl-3.5 font-medium"
                                {...register("email")}
                                placeholder="Email"
                                required={true}
                                type="email"
                            />
                            <Input
                                className="py-5 pl-3.5 font-medium"
                                {...register("password")}
                                placeholder="Password"
                                required={true}
                                type="password"
                            />
                            <Input
                                className="py-5 pl-3.5 font-medium"
                                {...register("confirmPassword")}
                                placeholder="Confirm Password"
                                required={true}
                                type="password"
                            />

                            <Button
                                className="py-5 pt-[1.270rem]"
                                type="submit"
                                variant={"secondary"}
                            >
                                Signup
                            </Button>

                            <p className="font-medium">
                                Have an account ?
                                <Button
                                    onClick={() => router.push("/login")}
                                    className="px-4 py-1"
                                    variant={"link"}
                                >
                                    Login
                                </Button>
                            </p>
                        </form>
                    </div>
                    {/* Image */}
                    <div className="w-full h-full flex flex-col flex-nowrap justify-center items-center">
                        <img
                            className="rounded-md w-full h-full"
                            src="/signup-cover.jpg"
                            alt="A orange bursty background for signup page cover"
                        />
                    </div>
                </div>
            </AspectRatio>
        </>
    );
}

export default Signup;
