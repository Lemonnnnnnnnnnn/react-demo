import { createSlice, nanoid } from '@reduxjs/toolkit'

const listSlice = createSlice({
    name: 'list',
    initialState: [{
        id : nanoid(),
        title : 'first title',
        content : 'first content'
    }],
    reducers: {
        add: {
            reducer(state, {payload}) {
                state.push(payload)
            },
            prepare(title, content) { // 返回一个对象，对象中的内容会和slice自动生成的内容（如type）合并,对象中必须有payload对象
                return {
                    payload: {
                        id: nanoid(), // 随机id
                        title,
                        content
                    }
                }
            }

        }
    }
})

export const { add } = listSlice.actions
export default listSlice.reducer