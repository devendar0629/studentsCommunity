import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import React from "react";
import { poppins } from "../ui/fonts";

function VerifyEmail() {
    return (
        <>
            <main className="h-screen flex flex-col flex-nowrap justify-center items-center">
                <Card
                    className={`lg:h-[60%] lg:w-[70%] w-[80%] border-[#ccc] flex flex-col gap-6 justify-start items-center lg:pt-16 py-14 ${poppins.className}`}
                >
                    <section className="">
                        <svg
                            width="5.75rem"
                            height="5.75rem"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M10 9.66679L11.3846 11.0001L14.5 8.00012M3.02832 10.0001L10.2246 14.8167C10.8661 15.2444 11.1869 15.4582 11.5336 15.5413C11.8399 15.6147 12.1593 15.6147 12.4657 15.5413C12.8124 15.4582 13.1332 15.2444 13.7747 14.8167L20.971 10.0001M10.2981 4.06892L4.49814 7.71139C3.95121 8.05487 3.67775 8.2266 3.4794 8.45876C3.30385 8.66424 3.17176 8.90317 3.09111 9.16112C3 9.45256 3 9.77548 3 10.4213V16.8001C3 17.9202 3 18.4803 3.21799 18.9081C3.40973 19.2844 3.71569 19.5904 4.09202 19.7821C4.51984 20.0001 5.0799 20.0001 6.2 20.0001H17.8C18.9201 20.0001 19.4802 20.0001 19.908 19.7821C20.2843 19.5904 20.5903 19.2844 20.782 18.9081C21 18.4803 21 17.9202 21 16.8001V10.4213C21 9.77548 21 9.45256 20.9089 9.16112C20.8282 8.90317 20.6962 8.66424 20.5206 8.45876C20.3223 8.2266 20.0488 8.05487 19.5019 7.71139L13.7019 4.06891C13.0846 3.68129 12.776 3.48747 12.4449 3.41192C12.152 3.34512 11.848 3.34512 11.5551 3.41192C11.224 3.48747 10.9154 3.68129 10.2981 4.06892Z"
                                stroke="#ffffff"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </section>
                    <CardTitle className="lg:text-[2.95rem] text-[1.6rem] lg:font-semibold">
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

export default VerifyEmail;
