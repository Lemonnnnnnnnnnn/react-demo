import React from 'react';
import useSWR from 'swr'

function fetchData() {
    const { data, error } = useSWR(`https://animechan.vercel.app/api/random`, fetcher)

    return {
        data,
        isLoading: !error && !data,
        isError: error,
    }
}

const fetcher = (...args) => fetch(...args).then((res) => res.json())

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

// # snippet
function Character() {
    const { data, isLoading } = fetchData()
    if (isLoading) return <div>Loading...</div>
    return <div>动漫的特征是：{data.character}</div>
}
// # snippet
function Quote() {
    const { data, isLoading } = fetchData()
    if (isLoading) return <div>Loading...</div>
    return <div>有什么名句：{data.quote}</div>
}

export default Page;