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
          // removeFavorite(state, action) {
          //      const current = state.findIndex((item) => {
          //           // item === action.payload
          //      })
          //      state = [...state.slice(0, current), ...state(current + 1, state.length)]
          // } 
     }
});

export const { setFavorite, removeFavorite} = favoriteSlice.actions;

export default favoriteSlice.reducer;