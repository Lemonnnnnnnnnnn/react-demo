import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

//#region createAsyncThunk
export const getImgAsync = createAsyncThunk('img/getImg', async (url) => {
    const response = await fetch(url).then(res => res.json()).then(({ images }) => images[0].url)
    return response
})
//#endregion createAsyncThunk

const imgSlice = createSlice({
    name: 'img',
    initialState: {
        imgUrl: '',
        status: 'idle',
        error: null
    },
    //#region extraReducers
    extraReducers: builder => {
        builder
            .addCase(getImgAsync.pending, (state, action) => {
                state.status = 'pending'
            })
            .addCase(getImgAsync.fulfilled, (state, { payload }) => {
                state.status = 'fulfilled'
                state.imgUrl = payload
            })
            .addCase(getImgAsync.rejected, (state, { payload }) => {
                state.status = 'failed'
                state.error = payload
            })

    }
    //#endregion extraReducers
})

export const { getImg } = imgSlice.actions
export default imgSlice.reducer


export const getImgSelector = ({ reducerCreateAsyncThunk }) => {
    const { imgUrl, status, error } = reducerCreateAsyncThunk
    return { imgUrl, status, error }
}
