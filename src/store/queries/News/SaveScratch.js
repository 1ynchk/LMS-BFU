import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'

import { host } from '../../root';
import { getCSRFToken } from '../../../components/bll/cookies/getCSRF';

export const fetchScratch = createAsyncThunk('news/fetchScratch', async () => {
    const token = getCSRFToken
    
    const data = await axios.post(
        `${host}/api_news/post-scratch/`,
        {},
        {headers: {'X-CSRFToken': token}, withCredentials: true}
    )

    return data.data
})