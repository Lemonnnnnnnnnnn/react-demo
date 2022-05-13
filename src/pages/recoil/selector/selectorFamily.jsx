import {
    atom,
    useRecoilValue,
    selectorFamily,
    RecoilRoot,
} from "recoil";
import React, { Component, Suspense } from "react";

const fetchUser = selectorFamily({
    key: 'messageState',
    get: (id) => async () => {
        const res = await fetch(`/api/user?id=${id}`).then((res) =>
            res.json()
        );
        return res.data;
    }
})

function UserInfo() {
    const message = useRecoilValue(fetchUser(1));

    return (
        <div>
            {message}
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
