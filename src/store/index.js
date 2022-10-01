import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from './slices/userSlice'
import favoriteReducer from './slices/favoriteSlice'


const rootReducer = combineReducers({
     user: userReducer,
     favorite: favoriteReducer,
})
const store = configureStore({
     reducer: rootReducer
})

export default store;