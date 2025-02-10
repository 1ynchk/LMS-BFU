import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

import { host } from "../../root";

export const fetchGetDirections = createAsyncThunk('directions/fetchGetDirections', async () => {
    const response = await axios.get(`${host}/api_directions/get-directions/`)

    return response.data
})