"use client";

import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import React, { useState } from "react";
import { poppins } from "../ui/fonts";
import Spinner from "@/components/custom/Spinner/Spinner";
import ServerErrorSVG from "../../../public/server-error.svg";
import verifySuccessSVG from "@/../public/tickmark.svg";
import verifyFailSVG from "@/../public/wrongmark.svg";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import Loader from "@/components/custom/Loader/Loader";

function ResetPassword() {
    const searchParams = useSearchParams();
    const newPasswordRef = React.useRef<HTMLInputElement>(null);
    const confirmPasswordRef = React.useRef<HTMLInputElement>(null);
    const [error, setError] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);

    const resetPassword = async () => {
        if (
            !newPasswordRef.current?.value ||
            !confirmPasswordRef.current?.value
        ) {
            setError("Please fill both fields");
            return;
        } else if (
            newPasswordRef.current?.value !== confirmPasswordRef.current?.value
        ) {
            setError("Password don't match");
            return;
        }
        try {
            const token = searchParams.get("token");

            setLoading(true);
            const resp = await axios.post(
                `/api/v1/users/resetpassword?token=${token}`,
                {
                    newPassword: newPasswordRef.current?.value,
                    confirmPassword: confirmPasswordRef.current?.value,
                }
            );
            setLoading(false);

            if (resp.status == 200) {
                setStatus("COMPLETED");
            } else if (resp.status >= 500) {
                setError(resp.data.error.message);
                setStatus("FAILED-BY-SERVER");
            } else {
                setError(resp.data.error.message);
                setStatus("FAILED-BY-EXPIRY");
            }
        } catch (error: any) {
            setLoading(false);
            setStatus("FAILED-BY-SERVER");
        }
    };

    const [status, setStatus] = useState<
        | "PENDING"
        | "NOT-STARTED"
        | "FAILED-BY-SERVER"
        | "FAILED-BY-EXPIRY"
        | "COMPLETED"
    >("NOT-STARTED");

    return (
        <>
            <main className="h-screen flex flex-col justify-center items-center">
                <Card
                    className={`lg:h-[55%] lg:w-[67%] md:w-[75%] md:h-[50%] w-[80%] border-[#ccc] flex flex-col gap-8 justify-start items-center lg:pt-16 py-14 ${poppins.className}`}
                >
                    {status == "PENDING" && (
                        <div className="lg:pt-10 lg:mb-0.5 pt-4">
                            <Spinner classname="h-[3rem] w-[3rem] lg:h-[3.85rem] lg:w-[3.85rem]" />
                        </div>
                    )}
                    {status == "FAILED-BY-SERVER" && (
                        <section className="mt-2">
                            <img
                                className="h-16 w-16 lg:h-24 lg:w-24"
                                src={ServerErrorSVG.src}
                                alt="Server error image"
                            />
                        </section>
                    )}
                    {(status == "FAILED-BY-EXPIRY" ||
                        status == "COMPLETED") && (
                        <section className="">
                            <img
                                className="h-[6rem] w-[6rem]"
                                src={((): string => {
                                    if (status == "FAILED-BY-EXPIRY")
                                        return verifyFailSVG.src;
                                    else if (status == "COMPLETED")
                                        return verifySuccessSVG.src;
                                    return "";
                                })()}
                                alt={((): string => {
                                    if (status == "FAILED-BY-EXPIRY")
                                        return "Verification unsuccessful image";
                                    else if (status == "COMPLETED")
                                        return "Verification successful image";
                                    return "";
                                })()}
                            />
                        </section>
                    )}

                    <CardTitle className="lg:text-[2.85rem] md:text-[2.45rem] text-[1.6rem] lg:font-semibold">
                        {status === "NOT-STARTED" && "Reset Your Password"}
                        {status == "PENDING" && "Resetting . . ."}
                        {status == "COMPLETED" && "Reset Complete"}
                        {(status == "FAILED-BY-EXPIRY" ||
                            status == "FAILED-BY-SERVER") && (
                            <span className="lg:text-[2.2rem] text-[1.2rem]">
                                Password Reset unsuccessful
                            </span>
                        )}
                    </CardTitle>

                    <CardDescription className="lg:text-[1.175rem] w-[85%] mx-auto mt-4 lg:gap-3 text-center flex flex-col gap-4 flex-nowrap">
                        <div className="lg:text-[1.175rem] text-[0.9rem]">
                            {status === "NOT-STARTED" &&
                                "Please enter the new password and click on the button below, to reset your password"}
                            {status == "PENDING" &&
                                "Please wait, your password is being resetted by our servers."}
                            {status == "COMPLETED" &&
                                "Your Password reset was successfull, You can now leave this page."}
                            {status == "FAILED-BY-EXPIRY" &&
                                "Looks like mail validity has been expired, try again."}
                            {status == "FAILED-BY-SERVER" &&
                                "Uh oh , Something went wrong on our side. Try again later"}
                        </div>
                        <div>
                            {status === "NOT-STARTED" && (
                                <>
                                    <form
                                        className="flex flex-col flex-nowrap gap-4 w-[70%] lg:w-[45%] mx-auto mt-4"
                                        action=""
                                    >
                                        <Input
                                            className="text-[.925rem] lg:text-[1.05rem] px-4 py-5"
                                            placeholder="New password"
                                            type="password"
                                            ref={newPasswordRef}
                                        />
                                        <Input
                                            className="text-[.925rem] lg:text-[1.05rem] px-4 py-5"
                                            placeholder="Confirm password"
                                            type="password"
                                            ref={confirmPasswordRef}
                                        />
                                    </form>

                                    {error && (
                                        <p className="text-red-400 mt-8 text-center">
                                            {error}
                                        </p>
                                    )}

                                    <Button
                                        onClick={resetPassword}
                                        className={`mt-6 lg:text-[1.05rem] px-5 py-2 ${loading ? "cursor-not-allowed" : "cursor-pointer"}`}
                                        variant={"secondary"}
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <Loader circleClassname="bg-gray-400" />
                                        ) : (
                                            "Reset"
                                        )}
                                    </Button>
                                </>
                            )}
                            {status === "COMPLETED" && (
                                <>
                                    <span>Head to </span>
                                    <Button
                                        className={`lg:pl-[0.185rem] lg:pr-[0.4rem] pl-1 pr-1 inline-block ${poppins.className} text-[.85rem] lg:text-[1.025rem] hover:text-blue-400 transition-colors duration-75 text-white`}
                                        variant={"link"}
                                    >
                                        <Link href={"/login"}>login</Link>
                                    </Button>
                                    page <span className="pl-1">&rarr;</span>
                                </>
                            )}
                        </div>
                    </CardDescription>
                </Card>
            </main>
        </>
    );
}

export default ResetPassword;
