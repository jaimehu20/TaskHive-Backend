import React, { useEffect, useState } from "react";
import { ConversionOptions } from "../ConversionOptions/ConversionOptions";
import { ConversionIcon } from "../Icons/ConversionIcon";
import { Like } from "../Icons/Like";
import { useAppDispatch } from "../../app/hooks";
import { addFavorite } from "../../features/favorites/favoriteSlice";
import { FavoriteConversionProps } from "../../interfaces/interfaces";

export const ConversorBox : React.FC<FavoriteConversionProps> = ({setMyConversions}) => {

    const [ unit, setUnit ] = useState<string>("km");
    const [ conversion, setConversion ] = useState<number>(0);
    const [ resultUnit, setResultUnit ] = useState<string>("milles");
    const [userInput, setUserInput] = useState<number>(0);
    const dispatch = useAppDispatch();

    const handleSelect = (event : React.ChangeEvent<HTMLSelectElement>) => {
        setConversion(0);
        setUserInput(0);
        switch (event.target.value) {
            case "km → milles" :
                setUnit("km")
                setResultUnit("milles")
                setConversion(0)
                break;
            case "milles → km" : 
                setUnit("milles")
                setResultUnit("km")
                setConversion(0)
                break;
            case "feet → m" : 
                setUnit("feet")
                setResultUnit("m")
                setConversion(0)
                break;
            case "m → feet" : 
                setUnit("m")
                setResultUnit("feet")
                setConversion(0)
                break;
            case "cm → inches" :
                setUnit("cm")
                setResultUnit("inches")
                setConversion(0)
                break;
            case "inches → cm" :
                setUnit("inches")
                setResultUnit("cm")
                setConversion(0)
                break;
            default : 
                setUnit("km")
        }
    }

    const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        const str = event.target.value;
        const num = parseInt(str, 10)
        setUserInput(num);
        switch (unit) {
            case "km" :
                setConversion(parseFloat((num * 0.621371).toFixed(2)))
                break;
            case "milles" : 
                setConversion(parseFloat((num * 1.60934).toFixed(2)))
                break;
            case "feet" : 
                setConversion(parseFloat((num * 0.3048).toFixed(2)))
                break;
            case "m" :
                setConversion(parseFloat((num * 3.28084).toFixed(2))) 
                break;
            case "cm" :
                setConversion(parseFloat((num * 0.393701).toFixed(2)))
                break;
            case "inches" :
                setConversion(parseFloat((num * 2.54).toFixed(2)))
                break;
            default : 
                setUnit(unit)    
        }
    }

    const handleInversor = () => {
        const tempUnit = unit;
        setUnit(resultUnit);
        setResultUnit(tempUnit);

        const tempConversion = conversion;
        setConversion(userInput);
        setUserInput(tempConversion);
    }

    const updateConversions = () => {
        const updatedFavorites = JSON.parse(localStorage.getItem("favoriteConversions") || '[]');
        setMyConversions(updatedFavorites);
    };

    const handleSaveConversion = () => {
        const conversionObject = {
            from: userInput,
            fromUnit: unit,
            to: conversion,
            toUnit: resultUnit,
        };
        dispatch(addFavorite(conversionObject))
        updateConversions();
    }

    return <>
        <section className="conversion-box">
            <h1>convert</h1>
            <div className="conversion-box-main">
                <div className="conversion-box-selector">
                    <select onChange={handleSelect}>
                        <ConversionOptions from="km" to="milles"/>
                        <ConversionOptions from="milles" to="km"/>
                        <ConversionOptions from="feet" to="m"/>
                        <ConversionOptions from="m" to="feet"/>
                        <ConversionOptions from="cm" to="inches"/>
                        <ConversionOptions from="inches" to="cm"/>
                    </select>
                    <ConversionIcon color="#EDEDED" handler={handleInversor}/>
                </div>
                <div className="conversion-box-input">
                    <input type="number" value={userInput} onChange={handleChange}/>
                    <p>{unit}</p>
                </div>
            </div>
            <div className="conversion-box-results">
                <Like handler={handleSaveConversion} />
                <div>
                    <p>{conversion}</p>
                    <p>{resultUnit}</p>
                </div>
            </div>
        </section>
    </>
} 