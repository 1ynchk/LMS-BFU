import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

import { host } from "../../root";

export const fetchCheckLogin = createAsyncThunk('user/fetchCheckLogin', async () => {

    const data = await axios.get(
        `${host}/api_users/login/check/`,
        {
            withCredentials: true
        },
    )

    return data.data   
})