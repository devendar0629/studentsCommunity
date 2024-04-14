"use client";
import { Poppins } from "next/font/google";
import React from "react"

const poppins = Poppins({ weight: ["400", "500", "600", "700"], subsets: ["latin"] })

function Home() {
    return (
        <>
            <div className={`${poppins.className}`}>
                <p>Home component</p>
            </div>
        </>
    )
}

export default Home