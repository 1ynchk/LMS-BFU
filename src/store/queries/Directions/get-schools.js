import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { host } from "../../root";

export const fetchGetSchools = createAsyncThunk('directions/fetchGetSchools',
    async () => {
        const response = await axios.get(
            `${host}/api_directions/get-schools/`, 
            {withCredentials: true})

        return response.data
    })