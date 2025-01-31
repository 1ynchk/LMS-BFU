import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'

import { host } from '../../root';

export const fetchScratch = createAsyncThunk('news/fetchScratch',
    async (form, token) => {
        
        const data = await axios.post(
            `${host}/api_news/post-scratch/`,
            form, 
            { 
                headers: { 
                    'X-CSRFToken': token,
                    'Content-Type': 'multipart/form-data' 
                }, 
                withCredentials: true,
            }
        )

        return data.data
    })