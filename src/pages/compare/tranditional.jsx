// 页面组件
import React, { useState, useEffect } from 'react';

function Page() {
    const [data, setData] = useState(null)

    // 请求数据
    useEffect(() => {
        fetch('https://animechan.vercel.app/api/random')
            .then((res) => res.json())
            .then((data) => setData(data))
    }, [])

    

    // 全局加载状态
    if (!data) return <div>Loading...</div>

    return <div>
        <Header data={data} />
        <Content data={data} />
    </div>
}


// 子组件
function Header({ data }) {
    return <div>
        动漫的名字是：{data.anime}
    </div>
}

function Content({ data }) {
    return (
        <div>
            <Character data={data} />
            <Quote data={data} />
        </div>)
}

function Character({ data }) {
    return <div>角色有：{data.character}</div>
}

function Quote({ data }) {
    return <div>有什么名句：{data.quote}</div>
}


export default Page
