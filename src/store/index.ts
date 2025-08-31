import { configureStore, combineReducers} from "@reduxjs/toolkit";
import walletReducer from "./walletSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
    wallet: walletReducer,
});


const persistConfig = {
    key: "root",
    storage,
    whiteList: ["wallet"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
     middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState =  ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;