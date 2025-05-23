import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import User from "../types/User"


interface AuthState {
    token : string | null
    user: User| null
}

const initialState :AuthState ={
    token: null,
    user : null
}

const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers:{
        setToken(state,action: PayloadAction <string>){
            state.token = action.payload;
        },    setUser(state, action: PayloadAction<User>) {
            state.user = action.payload;
          },
        logout(state){
            state.token = null;
        }
    }
})

export const {setToken,setUser, logout } = authSlice.actions
export default authSlice.reducer