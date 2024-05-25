"use client";
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { logout } from "@/redux/features/auth/authSlice";

function Dashboard() {
    const router = useRouter();
    const { toast } = useToast();
    const appDispatch = useAppDispatch();

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

            appDispatch(logout());
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
