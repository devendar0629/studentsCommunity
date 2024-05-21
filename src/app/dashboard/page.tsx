"use client";
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

function Dashboard() {
    const router = useRouter();
    const { toast } = useToast();

    const handleLogout = async (): Promise<void> => {
        try {
            const resp = await axios.post("/api/v1/users/logout");
            if (resp.status !== 200) {
                console.log("Error while logging out..");
                toast({
                    title: "Error",
                    description: "Something went wrong while logging out",
                });
            }

            router.refresh();
        } catch (error: any) {
            console.log(error.message);
        }
    };

    return (
        <>
            <div className="">
                <Button onClick={handleLogout} variant={"secondary"}>
                    Logout
                </Button>
            </div>
        </>
    );
}

export default Dashboard;
