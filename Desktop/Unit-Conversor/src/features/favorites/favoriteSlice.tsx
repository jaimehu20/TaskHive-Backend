import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { FavoriteConversion, FavoriteState } from "../../interfaces/interfaces";

const storedFavorites = localStorage.getItem("favoriteConversions");
const initialState : FavoriteConversion[] = storedFavorites ? JSON.parse(storedFavorites) : [];

export const favoriteSlice = createSlice({
    name : "favorite",
    initialState: {
        favoriteConversions: initialState,
    } as FavoriteState,
    reducers: {
        addFavorite : (state, action) => {
            state.favoriteConversions = [...state.favoriteConversions, action.payload]
            localStorage.setItem("favoriteConversions", JSON.stringify(state.favoriteConversions));
        },
        deleteFavorite: (state, action) => {
            state.favoriteConversions = state.favoriteConversions.filter((conversion:any) => conversion.to !== action.payload.to )
            localStorage.setItem("favoriteConversions", JSON.stringify(state.favoriteConversions));
        }
    }
})

export const { addFavorite, deleteFavorite } = favoriteSlice.actions