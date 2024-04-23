import React from "react"

function Input({ type = 'text', placeholder = '', className = '' }: { type: string, placeholder: string, className: string }) {
    return (
        <>
            <input
                type={type}
                placeholder={placeholder}
                className={`rounded-md focus:outline-none px-3 py-1 ${className}`}
            />
        </>
    )
}

export default Input