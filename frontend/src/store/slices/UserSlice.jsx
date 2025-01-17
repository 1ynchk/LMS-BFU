import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice(
    {
        name: 'user',

        initialState: {
            userName: 'ynchk1',
            isLogin: false, 
            role: 'student'
        },

        reducers: {

        }, 

        extraReducers: (builder) => {
            
        }
    }
)

export default UserSlice.reducer