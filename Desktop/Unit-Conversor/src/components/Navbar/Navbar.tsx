import React from "react";
import { ConversionIcon } from "../Icons/ConversionIcon";


export const Navbar : React.FC = () => {
    return <>
        <nav>
            <div>
                <ConversionIcon color="#2E0039"/>
                <p>unit converter</p>
            </div>
        </nav>
    </>
}