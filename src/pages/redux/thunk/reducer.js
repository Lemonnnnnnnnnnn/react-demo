import { createSlice } from '@reduxjs/toolkit'

const imgSlice = createSlice({
    name: 'img',
    initialState: {
        imgUrl: ''
    },
    reducers: {
        // 把请求到的url地址放入state中
        getImg: (state, action) => { 
            console.log(action);
            state.imgUrl = action.payload 
        }
    }
})

export const { getImg } = imgSlice.actions
export default imgSlice.reducer

export const getImgAsync = (url) => (dispatch , getState) => {
    const stateBefore = getState()
    fetch(url).then(res => res.json()).then(({images}) => {
        const url = images[0].url
        // 执行真正的dispatch action
        dispatch(getImg(url)) // 参数会作为action.payload传入
    })
}

