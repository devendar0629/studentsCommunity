"use client";
import "./Loader.css";

export default function Loader({ classname }: { classname?: string }) {
    return (
        <>
            <div className={`flex ${classname}`}>
                <div className="flex flex-nowrap justify-center items-center w-[16px] h-[16px]">
                    <span className="load one"></span>
                </div>
                <div className="flex flex-nowrap justify-center items-center w-[16px] h-[16px]">
                    <span className="load two"></span>
                </div>
                <div className="flex flex-nowrap justify-center items-center w-[16px] h-[16px]">
                    <span className="load three"></span>
                </div>
            </div>
        </>
    );
}
