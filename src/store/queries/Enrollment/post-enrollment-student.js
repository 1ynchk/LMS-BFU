import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { host } from "../../root";

export const fetchEnrollmentStudent = createAsyncThunk('admin/fetchEnrollmentStudent',
    async ({formData, csrftoken}) => {
        const response = await axios.post(
            `${host}/api_students/post-enrollment-student/`, 
            formData,
            {
                withCredentials: true, 
                headers: {
                    'X-CSRFToken': csrftoken 
                }
            }
        )

        return response.data
    })