import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { host } from '../../root'
import { getCSRFToken } from '../../../components/bll/Common-bll/get-csrf-token'

export const fetchLogin = createAsyncThunk('user/fetchLogin', async (
    { email, pswrd }) => {

        const token = getCSRFToken()
    const data = await axios.post(
        `${host}/api_users/login/`,
        { 'email': email, 'password': pswrd },
        {
            headers: { 'X-CSRFToken': token },
            withCredentials: true
        }
    )

    return data.data
})