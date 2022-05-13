import {
  atom,
  useRecoilValue,
  selector,
  RecoilRoot,
} from "recoil";
import React, { Component, Suspense } from "react";

const idState = atom({
  key: "idState",
  default: 1,
});

const messageState = selector({
  key: "messageState",
  get: async ({ get }) => {
    const res = await fetch(`/api/user?id=${get(idState)}`).then((res) =>
      res.json()
    );
    return res.data;
  },
});

function UserInfo() {
  const message = useRecoilValue(messageState);

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
