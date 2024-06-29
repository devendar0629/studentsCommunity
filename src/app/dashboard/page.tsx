"use client";

import axios from "axios";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { logout } from "@/redux/features/auth/authSlice";
import withAuth from "@/components/auth/withAuth";

function Dashboard() {
    const { toast } = useToast();
    const appDispatch = useAppDispatch();

    const handleLogout = async () => {
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

export default withAuth(Dashboard);
