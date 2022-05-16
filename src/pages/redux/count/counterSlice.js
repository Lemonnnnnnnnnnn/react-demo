import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0
  },
  reducers: {
    increment: (state, { payload }) => { // 默认不带参
      console.log(payload);
      state.value += Number(payload || 1)
    },
  }
})

/**
 * createSlice自动生成相关的actions，导出给View层使用
 * 默认不带payload参数
 */
export const { increment } = counterSlice.actions // 通过increment()生成action

export default counterSlice.reducer // 导出reducer给store