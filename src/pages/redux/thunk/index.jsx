import store from "./store";
import { Provider } from 'react-redux'
import { getImgAsync, getImgSelector } from './reducer-createAsyncThunk'
import { useSelector, useDispatch } from 'react-redux'

function Img() {
    const {imgUrl, status, fail} = useSelector(getImgSelector)
    const dispatch = useDispatch()
    const url = 'https://api.waifu.im/random'

    if (status === 'idle') return <button onClick={() => dispatch(getImgAsync(url))}>get img</button>
    if (status === 'pending') return <div>loading ...</div>
    if (status === 'failed') return <div>{fail}</div>
    return <img src={imgUrl} alt="" />
}


function App() {
    return <Provider store={store}>
        <Img />
    </Provider>
}

export default App