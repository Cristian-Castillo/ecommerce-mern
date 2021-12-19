import { createSlice } from '@reduxjs/toolkit'

export const userSlice = new createSlice({
    name:"user",
    initialState:{
        username:"",
        email:"",
        token:""
    },
    reducers:{
        login:(state,action) => {
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.token = action.payload.token
        },
        reset:(state,action) => {
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.token = action.payload.token
        }
    }
});

export const { login,reset } = userSlice.actions
export default userSlice.reducer