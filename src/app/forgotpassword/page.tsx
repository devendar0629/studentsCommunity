"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
} from "@/components/ui/card";
import React, { MouseEventHandler, useRef, useState } from "react";
import { poppins } from "../ui/fonts";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Button } from "@/components/ui/button";
import Loader from "@/components/custom/Loader/Loader";
import MailSentSuccessfull from "./Success";

function page() {
    const [error, setError] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);

    const handleSubmit: MouseEventHandler<HTMLButtonElement> = async (e) => {
        try {
            e.preventDefault();
            const email = emailRef.current?.value;

            setLoading(true);
            const resp = await axios.post("/api/v1/users/forgotpassword", {
                email: email,
            });

            setLoading(false);

            if (resp.status !== 200) {
                setError(resp.data.error?.message);
                return;
            }

            setSuccess(true);
        } catch (error: any) {
            setLoading(false);
            setError(error?.message);
        }
    };

    const emailRef = useRef<any>();

    return (
        <>
            <main
                className={`${poppins.className} h-screen flex justify-center items-center flex-col flex-nowrap`}
            >
                <Card className="lg:h-[53%] lg:w-[60%] w-[80%] gap-10 flex flex-nowrap flex-col justify-start py-20 items-center">
                    {!success ? (
                        <>
                            <CardTitle>
                                <p className="lg:text-[2.85rem] text-center text-[1.35rem]">
                                    Reset your Password
                                </p>
                            </CardTitle>

                            <CardDescription className="lg:text-lg px-5 pl-8">
                                <p>
                                    To reset your password enter your email and
                                    click submit.
                                </p>
                                <p>
                                    An mail containing a link to reset your
                                    password will be sent.
                                </p>
                            </CardDescription>

                            <CardContent className="w-full mt-10">
                                <form className="h-full flex flex-col lg:flex-row flex-nowrap gap-3 lg:min-w-[50%] lg:max-w-[60%] md:min-w-[60%] md:max-w-[70%] sm:min-w-[80%] sm:max-w-[90%] mx-auto">
                                    <Input
                                        ref={emailRef}
                                        placeholder="Email"
                                        className="lg:text-[1rem] text-[.925rem] px-4 pl-5 py-5"
                                        type="email"
                                    ></Input>

                                    <Button
                                        className="lg:text-[1rem] py-auto min-w-[9rem] text-[.925rem] px-5 h-full"
                                        variant={"secondary"}
                                        onClick={handleSubmit}
                                        disabled={loading}
                                    >
                                        {!loading ? (
                                            "Submit"
                                        ) : (
                                            <Loader circleClassname="bg-gray-300" />
                                        )}
                                    </Button>

                                    {error && (
                                        <p className="block text-sm text-red-400 text-center mx-auto">
                                            {error}
                                        </p>
                                    )}
                                </form>
                            </CardContent>
                        </>
                    ) : (
                        <MailSentSuccessfull />
                    )}
                </Card>
            </main>
        </>
    );
}

export default page;
