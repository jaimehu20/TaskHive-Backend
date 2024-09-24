import React, { useEffect, useState } from "react";
import { DeleteIcon } from "../Icons/Delete";
import { useAppDispatch } from "../../app/hooks";
import { deleteFavorite } from "../../features/favorites/favoriteSlice";
import { FavoriteConversion, FavoriteConversionProps } from "../../interfaces/interfaces";

export const FavoriteBox : React.FC<FavoriteConversionProps> = ({myConversions, setMyConversions}) => {

    const dispatch = useAppDispatch();

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem("favoriteConversions") || '[]');
        setMyConversions(favorites)
    }, [])

    const updateConversions = () => {
        const updatedFavorites = JSON.parse(localStorage.getItem("favoriteConversions") || '[]');
        setMyConversions(updatedFavorites);
    };

    const favoritesList = myConversions.map((conversion : FavoriteConversion) => {

        const handleRemove = () => {
            dispatch(deleteFavorite(conversion))
            updateConversions();
        }

        return (
            <>
                <div className="favorite-item">
                    <p>{`${conversion.from} ${conversion.fromUnit} → ${conversion.to} ${conversion.toUnit}`}</p>
                    <DeleteIcon handler={handleRemove} />
                </div>
            </>
         )
    })

    return <>
        <section className="favorites-box">
            <h1>saved</h1>
            {myConversions.length > 0 ? favoritesList : <p>No saved conversions</p>}
        </section>
    </>
}