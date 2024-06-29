"use client";

import withAuth from "@/components/auth/withAuth";

function page() {
    return (
        <>
            <div>Noobj next component</div>
        </>
    );
}

export default withAuth(page);
