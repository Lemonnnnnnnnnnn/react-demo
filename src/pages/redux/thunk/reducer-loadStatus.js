import { createSlice } from '@reduxjs/toolkit'

const imgSlice = createSlice({
    name: 'img',
    initialState: {
        imgUrl: '',
        status: 'idle',
        error: null
    },
    reducers: {
        getImg: (state, { payload }) => {
            return payload 
        }
    }
})

export const { getImg } = imgSlice.actions
export default imgSlice.reducer

//#region getImgAsync
export const getImgAsync = (url) => (dispatch) => {
    dispatch(getImg({
        imgUrl: '',
        status: 'pending',
        error: null
    }))
    fetch(url).then(res => res.json())
        .then(({ images }) => {
            const url = images[0].url
            dispatch(getImg({ // 不会调用渲染
                imgUrl: url,
                status: 'complete',
                error: null
            }))
        })
        .catch(e => {
            dispatch(getImg({
                imgUrl: '',
                status: 'failed',
                error: e
            }))
        })
}
//#endregion getImgAsync

export const getImgSelector = ({ reducerLoadStatus }) => {
    const { imgUrl, status, error } = reducerLoadStatus

    return {imgUrl, status, error}
}
