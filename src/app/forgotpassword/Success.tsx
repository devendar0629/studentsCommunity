import React from "react";
import TickMarkSVG from "@/../public/tickmark.svg";

function Success() {
    return (
        <>
            <img
                className="h-[4.5rem] w-[4.5rem] lg:h-[7rem] lg:w-[7rem]"
                src={TickMarkSVG.src}
                alt="tick mark image"
            />

            <p className="lg:text-3xl text-xl text-center">
                Mail sent successfully
            </p>
        </>
    );
}

export default Success;
