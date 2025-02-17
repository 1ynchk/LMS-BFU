import { createSlice, current } from '@reduxjs/toolkit';

import { fetchGetDirections } from './../queries/Directions/get-directions';
import { fetchGetSchools } from './../queries/Directions/get-schools';
import { fetchGetSubjects } from './../queries/Directions/get-subjects';

const DirectionsSlice = createSlice(
    {
        name: 'directions',

        initialState: {
            schools: [],
            directions: [],
            subjects: [],
            loading: false,

            // pagination
            count: 0,
            prev_page: null,
            next_page: null,
            current_page: 1,

            // filters
            schoolsFilter: [],
            formatedSchools: '',
            choisenSubjects: [],
            formatedSubjects: ''
        },

        reducers: {
            setChosenSchools(state, action) {
                state.schoolsFilter = action.payload
                if (action.payload.length != 0) {
                    state.formatedSchools = action.payload.join(',')
                } else {
                    state.formatedSchools = ''
                }
            },
            setChosenSubjects(state, action) {
                state.choisenSubjects = action.payload
                if (action.payload.length != 0) {
                    state.formatedSubjects = action.payload.join(',')
                } else {
                    state.formatedSubjects = ''
                }
            }
        },

        extraReducers: (builder) => {
            builder
                .addCase(
                    fetchGetDirections.fulfilled, (state, action) => {
                        state.directions = action.payload.results
                        state.count = action.payload.count
                        state.prev_page = action.payload.previous
                        state.next_page = action.payload.next
                        if (state.prev_page == null && state.next_page == null) {
                            state.current_page = 1
                        }
                        if (state.prev_page == null && state.next_page != null) {
                            state.current_page = 1
                        }
                        if (state.next_page == null && state.prev_page != null) {
                            const urlObj = new URL(state.prev_page)
                            let pageParam = (urlObj.searchParams.get('page'))
                            if (pageParam == null) {
                                state.current_page = 2
                            } else {
                                const urlObj = new URL(state.prev_page)
                                state.current_page = +(urlObj.searchParams.get('page')) + 1
                            }
                        }
                        if (state.next_page != null && state.prev_page != null) {
                            const urlObj = new URL(state.next_page)
                            state.current_page = +(urlObj.searchParams.get('page')) - 1
                        }
                        state.loading = false
                    }
                )
                .addCase(
                    fetchGetDirections.pending, (state, action) => {
                        state.loading = true
                    }
                )
                .addCase(
                    fetchGetSchools.fulfilled, (state, action) => {
                        state.schools = action.payload
                    }
                )
                .addCase(
                    fetchGetSubjects.fulfilled, (state, action) => {
                        state.subjects = action.payload
                    }
                )
        }
    }
)

export const { setChosenSchools, setChosenSubjects } = DirectionsSlice.actions

export default DirectionsSlice.reducer