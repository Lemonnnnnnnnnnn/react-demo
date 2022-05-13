import {
    atom,
    useRecoilValue,
    RecoilRoot,
    selector,
    selectorFamily,
} from "recoil";
import React, { Component, Suspense } from "react";

// 当前用户的信息
const currentUserInfo = atom({
    key: 'userList',
    default: { friendList: [1, 2, 3] }
})

// 发送请求获取用户信息
const getUserInfo = selectorFamily({
    key: 'getUserInfo',
    get: (id) => async () => {
        const res = await fetch(`/api/user?id=${id}`).then((res) =>
            res.json()
        );
        return res.data;
    }
})

// 根据当前用户的朋友id，获取朋友的信息
const fetchFriend = selector({
    key: 'messageState',
    get: ({ get }) => {
        const { friendList } = get(currentUserInfo)
        return friendList.map(friendId => get(getUserInfo(friendId))) // 通过get获取getUserInfo返回的数据
    }
})


function UserInfo() {
    const friends = useRecoilValue(fetchFriend)
    return (
        <div>
            {friends.map(item => <div key={item}>{item}</div>)}
        </div>
    );
}

class Selector extends Component {
    render() {
        return (
            <RecoilRoot>
                <Suspense fallback={<div>loading ...</div>}>
                    <UserInfo />
                </Suspense>
            </RecoilRoot>
        );
    }
}

export default Selector;
