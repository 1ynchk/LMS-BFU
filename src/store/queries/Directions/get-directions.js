import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

import { host } from "../../root";

export const fetchGetDirections = createAsyncThunk('directions/fetchGetDirections',
    async (params) => {

        let search = params.search || null
        let schools = params.filters?.schools ?? null
        let subjects = params.filters?.subjects ?? null
        let form_education = params.filters?.form_education ?? null

        const response = await axios.get(
            `${host}/api_directions/get-directions/`,
            {
                params: {
                    'search': search,
                    'page': params.page,
                    'schools': schools,
                    'subjects': subjects,
                    'form_education': form_education
                },
            }
        )
        return response.data
    })