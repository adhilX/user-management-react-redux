import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import adminTokenReducer from "./adminTokenSlice";

export type RootState = ReturnType<typeof store.getState>;

const store = configureStore({
    reducer: {
        auth: authReducer,
        adminToken: adminTokenReducer,
    },
});

export type AppDispatch = typeof store.dispatch; 
export default store;
