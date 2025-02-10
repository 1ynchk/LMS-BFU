import { createSlice } from '@reduxjs/toolkit';

import { fetchGetDirections } from './../queries/Directions/get-directions';

const DirectionsSlice = createSlice(
    {
        name: 'directions',

        initialState: {
            directions: [],
            loading: false
        },

        reducers: {

        },

        extraReducers: (builder) => {
            builder
                .addCase(
                    fetchGetDirections.fulfilled, (state, action) => {
                        state.directions = action.payload
                        state.loading = false
                    }
                )
                .addCase(
                    fetchGetDirections.pending, (state, action) => {
                        state.loading = true
                    }
                )
        }
    }
)

export default DirectionsSlice.reducer