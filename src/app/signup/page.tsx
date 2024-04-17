import React from "react"

function page() {
    console.log("Hello world!");
    return (
        <>
            <section>
                <h2>Signup</h2>
                <form>
                    <section className="flex flex-row flex-nowrap gap-2 items-center">
                        <label>Email: </label>
                        <input className="rounded-md " placeholder="Email" type="text" />
                    </section>
                    <section className="flex flex-row flex-nowrap gap-2 items-center">
                        <label>Username: </label>
                        <input placeholder="Username" type="text" />
                    </section>
                    <section className="flex flex-row flex-nowrap gap-2 items-center">
                        <label>Password: </label>
                        <input placeholder="Password" type="text" />
                    </section>
                </form>
            </section>
        </>
    )
}

export default page