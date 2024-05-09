"use client";

import React from "react";

type Props = {
    username: string;
    email: string;
};

function Success({ username, email }: Readonly<Props>) {
    return (
        <>
            <div>Success component</div>
            <div>
                Hello {username}, we have sent a link to your email: {email}.
                Click the link to complete the verification process and activate
                your account
            </div>
        </>
    );
}

export default Success;
