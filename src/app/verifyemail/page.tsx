"use client";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import React, { useState } from "react";
import { poppins } from "../ui/fonts";
import verifyFailSVG from "../../../public/mail-xmark-svgrepo-com.svg";
import verifySuccessSVG from "../../../public/mail-check-svgrepo-com.svg";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Spinner from "@/components/custom/Spinner/Spinner";
import ServerErrorSVG from "../../../public/server-error.svg";

function VerifyEmail() {
    const [status, setStatus] = useState<
        "PENDING" | "COMPLETED" | "FAILED-BY-EXPIRY" | "FAILED-BY-SERVER"
    >("PENDING");

    const searchParams = useSearchParams();

    const verifyEmail = async () => {
        try {
            const token = searchParams.get("token");

            const resp = await axios.post(
                `/api/v1/users/verifyemail?token=${token}`
            );

            if (resp.status == 200) {
                setStatus("COMPLETED");
            } else if (resp.status >= 500) {
                setStatus("FAILED-BY-SERVER");
            } else {
                setStatus("FAILED-BY-EXPIRY");
            }
        } catch (error) {
            setStatus("FAILED-BY-SERVER");
        }
    };

    React.useEffect(() => {
        verifyEmail();
    }, []);

    return (
        <>
            <main className="h-screen flex flex-col flex-nowrap justify-center items-center">
                <Card
                    className={`lg:h-[60%] lg:w-[70%] w-[80%] border-[#ccc] flex flex-col gap-8 justify-start items-center lg:pt-16 py-14 ${poppins.className}`}
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
                    <CardTitle className="lg:text-[2.95rem] text-[1.6rem] lg:font-semibold">
                        {status == "PENDING" && "Verifying . . ."}
                        {status == "COMPLETED" && "Verification Complete"}
                        {(status == "FAILED-BY-EXPIRY" ||
                            status == "FAILED-BY-SERVER") && (
                            <span className="lg:text-[2.5rem] text-[1.5rem]">
                                Verification unsuccessful
                            </span>
                        )}
                    </CardTitle>

                    <CardDescription className="lg:text-[1.175rem] w-[85%] mx-auto mt-4 lg:gap-3 text-center flex flex-col gap-4 flex-nowrap">
                        <div>
                            {status == "PENDING" &&
                                "Please wait, your email is being verified by our servers."}
                            {status == "COMPLETED" &&
                                "Your email is verified successfully, You can now leave this page."}
                            {status == "FAILED-BY-EXPIRY" &&
                                "Looks like mail validity has been expired, try signing up again."}
                            {status == "FAILED-BY-SERVER" &&
                                "Uh oh , Something went wrong on our side. Try again later"}
                        </div>
                        <div>
                            {status == "COMPLETED" && (
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
                            {status == "FAILED-BY-EXPIRY" && (
                                <>
                                    <span>Head to</span>
                                    <Button
                                        className="lg:pl-[0.45rem] lg:pr-[0.4rem] pl-1 pr-1 inline-block ${poppins.className} text-[.85rem] lg:text-[1.025rem] hover:text-blue-400 transition-colors duration-75 text-white"
                                        variant={"link"}
                                    >
                                        <Link href={"/signup"}>signup</Link>
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

export default VerifyEmail;
