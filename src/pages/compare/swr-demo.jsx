import React from 'react';
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

function fetchData() {
    const { data, error } = useSWR(`https://animechan.vercel.app/api/random`, fetcher)  // useSWR的第一个参数会传入fetcher方法中

    return {
        data,
        isLoading: !error && !data, // 非失败非成功 = 加载中
        isError: error,
    }
}

function Page() {
    return (
        <div>
            <Header />
            <Content />
        </div>
    );
}

function Header() {
    const { data, isLoading } = fetchData()
    if (isLoading) return <div>Loading...</div>
    return <div>
        动漫的名字是：{data.anime}
    </div>
}

function Content() {
    return (
        <div>
            <Character  />
            <Quote/>
        </div>)
}

// #region snippet
function Character() {
    const { data, isLoading } = fetchData()
    if (isLoading) return <div>Loading...</div>
    return <div>角色有：{data.character}</div>
}
// #endregion snippet
function Quote() {
    const { data, isLoading } = fetchData()
    if (isLoading) return <div>Loading...</div>
    return <div>有什么名句：{data.quote}</div>
}

export default Page;