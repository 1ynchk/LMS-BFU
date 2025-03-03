import { createSlice, isRejected } from "@reduxjs/toolkit";
import { fetchEnrollmentStudent } from "../queries/Enrollment/post-enrollment-student";


const AdminFunctionsSlice = createSlice(
    {
        name: 'admin-functions',

        initialState: {
            loading: false,
            isRejected: null, 
            isPopup: false,

        },

        reducers: {
            closePopup(state, action) {
                state.isRejected = null
                state.isPopup = false 
            }
        },

        extraReducers: (builder) => {
            builder
                .addCase(
                    fetchEnrollmentStudent.fulfilled, (state, action) => {
                        state.loading = false
                        state.isRejected = false
                        state.isPopup = true
                    }
                )
                .addCase(
                    fetchEnrollmentStudent.pending, (state, action) => {
                        state.loading = true
                    }
                )
                .addCase(
                    fetchEnrollmentStudent.rejected, (state, action) => {
                        state.loading = false
                        state.isPopup = true
                        state.isRejected = true
                    }
                )
        }
    }
)

export const { closePopup } = AdminFunctionsSlice.actions

export default AdminFunctionsSlice.reducer