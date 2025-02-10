import { configureStore, combineReducers} from '@reduxjs/toolkit'

import UserReducer from './slices/UserSlice'
import NewsSliceReducer from './slices/NewsSlice'
import DirectionsReducer from './slices/DirectionsSlice';

const reducers = combineReducers(
    {
        user: UserReducer,
        news: NewsSliceReducer,
        directions: DirectionsReducer
    }
)

export const store = configureStore(
    {
        reducer: reducers 
    }
)