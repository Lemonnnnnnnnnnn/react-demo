import {
  atom,
  useRecoilValue,
  selector,
  useRecoilState,
  RecoilRoot,
} from "recoil";
import React, { Component } from "react";

const idState = atom({
  key: "idState",
  default: "",
});

const messageState = selector({
  key: "messageState",
  get: async ({ get }) => {
    return await fetch(`/api/user?id=${get(idState)}`).then((res) =>
      res.json()
    );
  },
});

function Input() {
  const [id, setId] = useRecoilState(idState);
  let message;
  fetch(`/api/user?id=123`)
    .then((res) => res.json())
    .then((res) => console.log(res));

  function handleClick() {
    messageState;
    // console.log(useRecoilValue(messageState));
    // message = useRecoilValue(messageState);
  }

  return (
    <>
      <input
        type="text"
        placeholder="请输入id"
        onChange={(e) => setId(e.target.value)}
      />
      <button onClick={handleClick}>查询</button>
      <div>{message}</div>
    </>
  );
}

class Selector extends Component {
  render() {
    return (
      <RecoilRoot>
        <Input />
      </RecoilRoot>
    );
  }
}

export default Selector;
