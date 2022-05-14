import { Provider } from 'react-redux'
import store from './store'
import { increment } from './counterSlice'
import { useSelector, useDispatch } from 'react-redux'

function Counter() {
    const count = useSelector(state => state.counter.value) 
    const dispatch = useDispatch() 
    return (
        <div>
            Value: {count}  <button onClick={() => dispatch(increment())}>Increment</button>
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