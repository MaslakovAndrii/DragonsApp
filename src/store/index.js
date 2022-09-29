import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slices/userSlice'
import favoriteReducer from './slices/userSlice'

const store = configureStore({
     reducer: {
          user: userReducer,
          favorite: favoriteReducer
     }
})

export default store;