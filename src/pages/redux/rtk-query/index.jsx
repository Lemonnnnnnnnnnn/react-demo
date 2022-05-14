import { Provider } from 'react-redux'
import store from './store'
import { useGetAnimeInfoQuery } from './service'


function Anime() {
    const id = '28884aff8b33732a'
    const { data, error, isLoading } = useGetAnimeInfoQuery(id)
    if (isLoading) return <div>loading ...</div>
    if (error) return <div>error</div>
    return <div>{data.images[0].tags[0].description}</div>
}

function App() {
    return (
        <Provider store={store}>
            <Anime />
        </Provider>
    )
}

export default App