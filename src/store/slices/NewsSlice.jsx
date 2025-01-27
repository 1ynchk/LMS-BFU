import { createSlice } from '@reduxjs/toolkit';
import { fetchScratch } from './../queries/News/SaveScratch';

const NewsSlice = createSlice(
    {
        name: 'news',

        initialState: {
            scratches: 0
        },

        reducers: {

        },

        extraReducers: (builder) => {
            builder 
                .addCase(
                    fetchScratch.fulfilled, (state, action) => {

                    }
                )
        }
    }
)

export default NewsSlice.reducer