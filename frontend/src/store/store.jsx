import { configureStore, combineReducers} from '@reduxjs/toolkit'

import UserReducer from './slices/UserSlice'

const reducers = combineReducers(
    {
        user: UserReducer 
    }
)

export const store = configureStore(
    {
        reducer: reducers 
    }
)