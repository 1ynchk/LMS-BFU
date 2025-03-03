import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { host } from "../../root";
import { getCSRFToken } from "../../../components/bll/Common-bll/get-csrf-token";

export const fetchEnrollmentStudent = createAsyncThunk('admin/fetchEnrollmentStudent',
    async ({formData}) => {
        const token = getCSRFToken()
        const response = await axios.post(
            `${host}/api_students/post-enrollment-student/`, 
            formData,
            {
                withCredentials: true, 
                headers: {
                    'X-CSRFToken': token 
                }
            }
        )

        return response.data
    })