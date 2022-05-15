import store from "./store";
import { Provider } from 'react-redux'
import { getImgAsync } from './reducer'
import { useSelector, useDispatch } from 'react-redux'


function Img() {
    const imgUrl = useSelector(state => state.imgReducer.imgUrl)
    const dispatch = useDispatch()
    const url = 'https://api.waifu.im/random'
    return (
        <div>
            <button onClick={() => dispatch(getImgAsync(url))}>get img</button>
            <img src={imgUrl} alt="" />
        </div>
    )
}


function App() {
    return <Provider store={store}>
        <Img />
    </Provider>
}

export default App