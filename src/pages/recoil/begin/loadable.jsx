import { RecoilRoot, selector, useRecoilValueLoadable } from 'recoil'

const userInfo = selector({
    key: 'userInfo',
    get: async () => {
        const res = await fetch(`/api/user?id=1`).then((res) => res.json());
        return res.data;
    }
})

const UserInfo = () => {
    const info = useRecoilValueLoadable(userInfo)
    switch (info.state) {
        case 'hasValue':
            return <div>{info.contents}</div>
        case 'hasError':
            throw info.contents
        case 'loading':
            console.log(info.toPromise());
            return <div>loading ...</div>
    }
}

const App = () => {
    return (
        <RecoilRoot>
            <UserInfo />
        </RecoilRoot>
    );
}

export default App;