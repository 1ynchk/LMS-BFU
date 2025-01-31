import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { host } from "../../root";

export const fetchLogout = createAsyncThunk('user/fetchLogout', async (token) => {
    const data = await axios.post(`${host}/api_users/logout/`, {}, 
    {headers: {'X-CSRFToken': token}} 
    )

    return data.data
})