import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

import { host } from "../../root"

export const fetchGetStudentsList = createAsyncThunk('admin/fetchGetStudentsList', 
    async () => {
        const response = await axios.get()
    }
)