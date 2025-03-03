import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { host } from "../../root";
import { getCSRFToken } from "../../../components/bll/Common-bll/get-csrf-token";

export const fetchLogout = createAsyncThunk('user/fetchLogout', async () => {
    const token = getCSRFToken()
    const data = await axios.post(`${host}/api_users/logout/`, {}, 
    {headers: {'X-CSRFToken': token}} 
    )

    return data.data
})