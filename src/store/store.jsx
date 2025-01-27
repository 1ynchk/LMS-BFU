import { configureStore, combineReducers} from '@reduxjs/toolkit'

import UserReducer from './slices/UserSlice'
import NewsSlice from './slices/NewsSlice'

const reducers = combineReducers(
    {
        user: UserReducer,
        news: NewsSlice 
    }
)

export const store = configureStore(
    {
        reducer: reducers 
    }
)