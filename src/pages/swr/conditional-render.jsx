import React, { useState } from 'react';
import useSWRImmutable from 'swr/immutable'
//#region snipper
import useSwr, { SWRConfig } from 'swr'

// SWRConfig 的 value属性可以设置全局配置
const Wrapper = (Component) => {
    return (props) => (
        <SWRConfig value={{ fetcher: (url, init) => fetch(url, init).then(res => res.json()) }}>
            <Component {...props} />
        </SWRConfig>
    )
}
//#endregion snipper

const ConditionalRender = () => {
    const [shouldFetchData, setShouldFetchData] = useState(false)

    return (
        <div >
            <button  onClick={() => setShouldFetchData(true)}>load data</button>
            <Content shouldFetchData={shouldFetchData} />
        </div>
    );
}

const Content = ({ shouldFetchData }) => {
    const { data: img } = useSWRImmutable(shouldFetchData ? 'https://api.waifu.im/random' : null)   // null不执行 
    const { data } = useSWRImmutable(() => `https://api.waifu.im/info/?images=${img.images[0].file}`)  // 函数抛出错误，不执行

    if (!shouldFetchData) return null
    if (!data) return <div>Loading...</div>
    return <div>
        <div>随机获取一张图片：</div>
        <img style={{ height: 200 }} src={img.images[0].url} alt="" />
        <div>{data.images[0].tags[0].description}</div>
    </div>
}

//#region export
export default Wrapper(ConditionalRender);
//#endregion export