import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice';
import adminTokenReducer from './adminTokenSlice';


const store = configureStore({
    reducer:{
        auth: authReducer,
        AdminToken: adminTokenReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export default store

