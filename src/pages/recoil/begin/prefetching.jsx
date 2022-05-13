import {
    RecoilRoot,
    selector,
    useRecoilCallback, atom, selectorFamily, useRecoilValue
} from 'recoil'
import { Suspense } from 'react'

// 请求数据
const fetchData = selectorFamily({
    key: 'fetchData',
    get: (id) => async () => {
        if (!id) return ''
        console.log('发送请求...');
        const res = await fetch(`/api/user?id=${id}`).then((res) => res.json());
        console.log('请求完成');
        return res.data;
    }
})

// 用户id
const userId = atom({
    key: 'userId',
    default: ''
})

// 根据用户id改变请求数据，返回请求的结果
const userInfo = selector({
    key: 'userInfo',
    get: ({ get }) => {
        return fetchData(get(userId))
    }
})

const User = () => {
    const info = useRecoilValue(userInfo) // 获取请求的用户数据

    const getUserInfo = useRecoilCallback(({ snapshot, set }) => (id) => {
        snapshot.getLoadable(fetchData(id)) // 预读取数据
        set(userId, id) // 更新渲染
    })

    return (
        <div>
            <button onClick={() => getUserInfo(1)}>获取用户信息</button>
            <div>{info}</div>
        </div>
    )
}

const App = () => {
    return (
        <RecoilRoot>
            <Suspense fallback={<div>loading...</div>}>
                <User />
            </Suspense>
        </RecoilRoot>
    );
}

export default App;