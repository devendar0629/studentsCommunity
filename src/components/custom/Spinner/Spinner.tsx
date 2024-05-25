import React from "react";
import "./Spinner.css";

const Spinner = ({ classname = "" }: { classname?: string }) => {
    return <div className={`spinner ${classname}`}></div>;
};

export default Spinner;
