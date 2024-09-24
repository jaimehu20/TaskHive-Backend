import React from "react";
import { Heart } from "../Icons/Heart";

export const Footer : React.FC = () => {
    return <>
        <footer>
            <div>
                <span>© 2024 
                    <a href="https://jaimehurtado-porfolio.netlify.app/" > Jaime Hurtado.</a>
                    Made with <Heart />
                </span>
            </div>
        </footer>
    </>
}