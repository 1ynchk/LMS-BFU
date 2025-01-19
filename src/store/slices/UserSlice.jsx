import { createSlice } from "@reduxjs/toolkit";

import { fetchLogin } from "../queries/Login/Login.js";
import { fetchCheckLogin } from './../queries/Login/CheckLogin';

const UserSlice = createSlice(
    {
        name: 'user',

        initialState: {
            userName: '',
            isLogin: false,
            role: '',
            avatar: null
        },

        reducers: {
            
        }, 

        extraReducers: (builder) => {
           builder
                .addCase(
                    fetchLogin.fulfilled, (state, action) => {
                        state.isLogin = true
                        localStorage.setItem('auth', 'True')
                    }
                ) 
                .addCase(
                    fetchLogin.pending, (state, action) => {
                        
                    }
                )
                .addCase(
                    fetchLogin.rejected, (state, action) => {
                        localStorage.clear()
                    }
                )
                .addCase(
                    fetchCheckLogin.fulfilled, (state, action) => {
                        if (action.payload.auth) {
                            localStorage.setItem('auth', 'True')
                            state.isLogin = true
                            state.name = action.payload.name
                            state.avatar = action.payload.avatar 
                            state.role = action.payload.role
                        } else {
                            localStorage.clear()
                            state.isLogin = false
                            state.name = ''
                            state.avatar = ''
                            state.role = ''
                        }
                    }
                )
                .addCase(
                    fetchCheckLogin.rejected, (state, action) => {
                        localStorage.clear()
                        state.name = ''
                        state.role = ''
                        state.isLogin = false
                    }
                )
        }
    }
)

export default UserSlice.reducer