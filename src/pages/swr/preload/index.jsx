import React, { useState } from 'react';
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

function fetchPageData(page) {
    const { data, error } = useSWR(`https://animechan.vercel.app/api/quotes/anime?title=naruto&page=${page}`, fetcher, {
        dedupingInterval: 60 * 1000 // 删除一段时间内相同 key 的重复请求（以毫秒为单位） ,默认2000
    })

    return {
        data,
        isLoading: !error && !data, // 非失败非成功 = 加载中
        isError: error,
    }
}

const Page = ({ page, show = true }) => {
    const { data, isLoading } = fetchPageData(page)

    if (!show) return null
    if (isLoading) return <div>loading ...</div>
    return data.map((item, key) => <div key={key}>{item.quote}</div>)
}

const Preload = () => {
    const [page, setPage] = useState(1)
    return (
        <div>
            <Page page={page} />
            <Page page={page + 1} show={false} />
            {Array(10).fill(1).map((item, key) => <button onClick={() => setPage(key + 1)}>{key + 1}页</button>)}
        </div>
    )
}

export default Preload;