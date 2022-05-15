// 
import { configureStore } from '@reduxjs/toolkit'

import imgReducer from './reducer'

export default configureStore({
    reducer: { imgReducer },
})