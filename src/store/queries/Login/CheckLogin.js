import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

import { host } from "../../root";
import { getCSRFToken } from "../../../components/bll/cookies/getCSRF";

export const fetchCheckLogin = createAsyncThunk('user/fetchCheckLogin', async () => {
    const token = getCSRFToken()

    const data = await axios.get(
        `${host}/api_users/login/check`,
        {
            headers: {'X-CSRFToken': token},
            withCredentials: true
        },
    )

    return data.data   
})