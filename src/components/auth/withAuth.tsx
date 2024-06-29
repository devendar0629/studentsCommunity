"use client";

import { useRouter } from "next/navigation";
import { useEffect, ComponentType } from "react";
import { useAppSelector } from "@/redux/hooks/hooks";
import Spinner from "../custom/Spinner/Spinner";

interface AuthProps {
    // Define any additional props
}

const withAuth = <P extends AuthProps>(WrappedComponent: ComponentType<P>) => {
    console.log("NJHBJH ");
    const ComponentWithAuth = (props: P) => {
        const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
        const router = useRouter();

        useEffect(() => {
            if (!isLoggedIn) {
                router.push("/login");
            }
        }, [isLoggedIn, router]);

        if (!isLoggedIn)
            return (
                <Spinner classname="h-[5rem] w-[5rem] lg:h-[6rem] lg:w-[6rem]" />
            );

        return <WrappedComponent {...props} />;
    };

    return ComponentWithAuth;
};

export default withAuth;
