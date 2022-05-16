import { configureStore } from '@reduxjs/toolkit'

import imgReducer from './reducer'
import reducerLoadStatus from './reducer-loadStatus'

export default configureStore({
    reducer: { 
        reducerLoadStatus,
        imgReducer,
    },
})