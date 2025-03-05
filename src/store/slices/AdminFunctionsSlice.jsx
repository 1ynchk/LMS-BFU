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
                    }
                )
                .addCase(
                    fetchEnrollmentStudent.pending, (state, action) => {
                        state.loading = true
                        state.isPopup = true
                    }
                )
                .addCase(
                    fetchEnrollmentStudent.rejected, (state, action) => {
                        console.log(action)
                        state.loading = false
                        state.isRejected = true
                    }
                )
        }
    }
)

export const { closePopup } = AdminFunctionsSlice.actions

export default AdminFunctionsSlice.reducer