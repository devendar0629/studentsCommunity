"use client";
import { useRef } from "react";
import { AppStore, makeStore } from "./store";
import { Provider } from "react-redux";

function StoreProvider({ children }: { children: React.ReactNode }) {
    const storeRef = useRef<AppStore>();

    if (!storeRef.current) {
        // To make the store render only first time it renders .
        storeRef.current = makeStore();
    }

    return (
        <>
            <Provider store={storeRef.current}>{children}</Provider>
        </>
    );
}

export default StoreProvider;
