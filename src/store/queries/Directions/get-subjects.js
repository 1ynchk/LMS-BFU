import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { host } from "../../root";

export const fetchGetSubjects = createAsyncThunk('directions/fetchGetSubjects', 
    async () => {
        const response = await axios.get(
            `${host}/api_directions/get-subjects/`,
            {
                withCredentials: true
            }
        )
        return response.data
})