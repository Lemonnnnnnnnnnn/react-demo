import { Provider } from 'react-redux'
import store from './store';
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { listSelector } from './selector'
import { add } from './reducer'

const List = () => {
    const list = useSelector(listSelector)
    const dispatch = useDispatch()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const handleClick = () => {
        dispatch(add(title, content))
        setTitle('')
        setContent('')
    }

    return (
        <div>
            <div>
                <span>title</span>
                <input value={title} type="text" onChange={e => setTitle(e.target.value)} />
            </div>
            <div>
                <span>content</span>
                <input value={content} type="text" onChange={e => setContent(e.target.value)} />
            </div>

            <button onClick={handleClick}>add</button>
            {list.map(item => <div key={item.id}>
                <div>title : {item.title}</div>
                <div>content : {item.content}</div>
            </div>)}
        </div>
    )
}

const App = () => {
    return (
        <Provider store={store}>
            <List />
        </Provider>
    );
}

export default App;