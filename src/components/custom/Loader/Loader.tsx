"use client";
import "./Loader.css";

export default function Loader({
    classname,
    circleClassname,
}: {
    classname?: string;
    circleClassname?: string;
}) {
    return (
        <>
            <div className={`flex ${classname}`}>
                <div className="flex flex-nowrap justify-center items-center w-[16px] h-[16px]">
                    <span className={`load one ${circleClassname}`}></span>
                </div>
                <div className="flex flex-nowrap justify-center items-center w-[16px] h-[16px]">
                    <span className={`load two ${circleClassname}`}></span>
                </div>
                <div className="flex flex-nowrap justify-center items-center w-[16px] h-[16px]">
                    <span className={`load three ${circleClassname}`}></span>
                </div>
            </div>
        </>
    );
}
