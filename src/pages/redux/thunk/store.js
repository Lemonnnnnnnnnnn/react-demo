import { configureStore } from '@reduxjs/toolkit'

import imgReducer from './reducer'
import reducerLoadStatus from './reducer-loadStatus'
import reducerCreateAsyncThunk from './reducer-createAsyncThunk'

export default configureStore({
    reducer: { 
        reducerLoadStatus,
        imgReducer,
        reducerCreateAsyncThunk,
    },
})