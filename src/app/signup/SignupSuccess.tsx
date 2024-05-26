import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import React from "react";
import { poppins } from "../ui/fonts";
import mailSentSVG from "@/../public/openmaillogo.svg";

function SignupSuccess() {
    return (
        <>
            <main className="h-screen flex flex-col flex-nowrap justify-center items-center">
                <Card
                    className={`lg:h-[60%] lg:w-[70%] w-[80%] border-[#ccc] flex flex-col gap-6 justify-start items-center lg:pt-16 py-14 ${poppins.className}`}
                >
                    <section>
                        <img
                            className="h-[5.75rem] w-[5.75rem]"
                            src={mailSentSVG.src}
                            alt=""
                        />
                    </section>
                    <CardTitle className="lg:text-[2.95rem] pb-4 text-[1.6rem] lg:font-semibold">
                        Verify your Email
                    </CardTitle>

                    <CardDescription className="lg:text-lg w-[85%] mx-auto mt-4 lg:gap-1 text-center flex flex-col gap-4 flex-nowrap">
                        <div>
                            We have sent a link to your email account. Click on
                            the link in the mail to activate your account.
                        </div>
                        <div>
                            It is valid for only{" "}
                            <span className="font-bold text-slate-400">
                                1 hour
                            </span>{" "}
                            .
                        </div>
                    </CardDescription>
                </Card>
            </main>
        </>
    );
}

export default SignupSuccess;
