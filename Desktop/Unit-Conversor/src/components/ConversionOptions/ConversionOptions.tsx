import React from "react";

interface ConversionOptionsProps {
    from: string,
    to: string
}

export const ConversionOptions : React.FC<ConversionOptionsProps> = (props : ConversionOptionsProps) => {
    return <>
        <option>
            <p>{`${props.from} → ${props.to}`}</p>
        </option>
    </>
}