import { Provider } from 'react-redux'
import store from './store'
import { increment } from './counterSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'

function Counter() {
    const count = useSelector(state => state.counter.value)
    const [num, setNum] = useState(0)

    const dispatch = useDispatch()

    const incrementSpecialNum = () => {
        dispatch(increment(num))
        setNum(0)
    }

    return (
        <div>
            <div>
                Value: {count}
            </div>
            <button onClick={() => dispatch(increment())}>增加</button>
            <div>
                请输入要增加的数字<input type='number' onChange={(e) => setNum(Number(e.target.value))} />
            </div>

            <button onClick={incrementSpecialNum}>增加自定义数字</button>
        </div>
    )
}

function App() {
    return (
        <Provider store={store}>
            <Counter />
        </Provider>
    )
}

export default App