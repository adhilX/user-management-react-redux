import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface AdminTokenState {
    token:string | null
}

const initialState : AdminTokenState = {
    token : null
}

const AdminTokenState = createSlice({
    name: 'admimToken',
    initialState,
    reducers:{
        setAdminToken(state,action:PayloadAction <string>){
            state.token = action.payload
        },
        logoutAdmin(state){
            state.token = null
        }
    }
})

export const {setAdminToken,logoutAdmin} = AdminTokenState.actions
export default AdminTokenState.reducer