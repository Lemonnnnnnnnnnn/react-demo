import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'

export default configureStore({
    reducer: {// 创建store时，传入所有Reducer
      counter: counterReducer , // 一个reducer就是一个state数据，可通过useSelector查询
    }
  })