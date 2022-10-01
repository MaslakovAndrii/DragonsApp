import { createSlice } from "@reduxjs/toolkit";


const favoriteSlice = createSlice({
     name: 'favorite',
     initialState: [],
     reducers: {
          setFavorite(state, action) {
               if(!state.includes(action.payload)) {
                    state.push(action.payload)
               }
          },
          removeFavorite(state, action) {
               const current = state.findIndex((item) => item === action.payload)
               state.splice(current, 1)
          } 
     }
});

export const { setFavorite, removeFavorite} = favoriteSlice.actions;

export default favoriteSlice.reducer;