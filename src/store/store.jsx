import { configureStore, combineReducers} from '@reduxjs/toolkit'

import UserReducer from './slices/UserSlice'
import NewsSliceReducer from './slices/NewsSlice'
import DirectionsReducer from './slices/DirectionsSlice';
import AdminFunctionsReducer from './slices/AdminFunctionsSlice'

const reducers = combineReducers(
    {
        user: UserReducer,
        news: NewsSliceReducer,
        directions: DirectionsReducer,
        admin_functions: AdminFunctionsReducer
    }
)

export const store = configureStore(
    {
        reducer: reducers 
    }
)