import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from './slices/userSlice'
import favoriteReducer from './slices/favoriteSlice'
import {
     persistStore,
     persistReducer,
     FLUSH,
     REHYDRATE,
     PAUSE,
     PERSIST,
     PURGE,
     REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({
     // user: userReducer,
     favorite: favoriteReducer,
})

const persistConfig = {
     key: 'root',
     storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)


const store = configureStore({
     reducer: persistedReducer,
     middleware: (getDefaultMiddleware) =>
          getDefaultMiddleware({
               serializableCheck: {
                    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
               },
          }),
})

export const persistor = persistStore(store)

export default store;