import { configureStore } from '@reduxjs/toolkit';
import { favoriteSlice } from '../features/favorites/favoriteSlice';

export const store = configureStore({
  reducer: {
    favorites: favoriteSlice.reducer,
    
  },
  
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;