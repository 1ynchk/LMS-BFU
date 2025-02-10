import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { host } from '../../root'

export const fetchLogin = createAsyncThunk('user/fetchLogin', async (
    { email, pswrd, csrftoken }) => {

    const data = await axios.post(
        `${host}/api_users/login/`,
        { 'email': email, 'password': pswrd },
        {
            headers: { 'X-CSRFToken': csrftoken },
            withCredentials: true
        }
    )

    return data.data
})