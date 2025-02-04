import { createSlice } from "@reduxjs/toolkit";

import { fetchLogin } from "../queries/Login/Login.js";
import { fetchCheckLogin } from './../queries/Login/CheckLogin';
import { fetchLogout } from './../queries/Login/Logout';

const UserSlice = createSlice(
    {
        name: 'user',

        initialState: {
            userName: '',
            isLogin: false,
            role: '',
            avatar: null,
            loading: false
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
                        state.loading = false
                        if (action.payload.auth) {

                            localStorage.setItem('auth', 'True')
                            state.name = action.payload.name
                            state.avatar = action.payload.avatar 
                            state.role = action.payload.role
                            state.loading = false
                        } else {
                            localStorage.clear()
                            state.name = ''
                            state.avatar = ''
                            state.role = ''
                            state.loading = false
                        }
                    }
                )
                .addCase(
                    fetchCheckLogin.pending, (state, action) => {
                        state.loading = true
                    }
                )
                .addCase(
                    fetchCheckLogin.rejected, (state, action) => {
                        localStorage.clear()
                        state.name = ''
                        state.role = ''
                        state.isLogin = false
                        state.loading = false
                    }
                )
                .addCase(
                    fetchLogout.fulfilled, (state, action) => {
                        localStorage.clear()
                        window.location.reload()
                        state.isLogin = false
                    }
                )
                .addCase(
                    fetchLogout.rejected, (state, action) => {

                    }
                )
        }
    }
)

export default UserSlice.reducer