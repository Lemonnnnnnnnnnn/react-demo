import { useEffect } from "react";
import { useState } from "react";


function usePage(Component) {
    return (props) => {
        const [loaded, setLoaded] = useState(false)
        useEffect(() => {
            setTimeout(() => {
                setLoaded(true)
                console.log('数据加载完成');
            }, 1000)
        }, [])

        if (!loaded) return <div>loading...</div>
        return (
            <div>
                <header>{props.title}</header>
                <Component />
                <footer>footer</footer>
            </div>)
    }
}

const Content = () => <div>content</div>


const App = () => {
    const Page = usePage(Content)

    return <Page title={'title'} />
}

export default App;