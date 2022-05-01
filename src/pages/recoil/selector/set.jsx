import {
  atom,
  useRecoilValue,
  selector,
  useRecoilState,
  RecoilRoot,
} from "recoil";
import React, { Component } from "react";

const rate = 0.15;
const CNY = atom({
  key: "CNY",
  default: 0,
});

const USD = selector({
  key: "USD",
  get: ({ get }) => {
    return get(CNY) * rate;
  },
  set: ({ set }, newVal ) => {
    set(CNY, newVal / rate);
  },
});

function Input() {
  const [cny, setcny] = useRecoilState(CNY);
  const [usd, setUsd] = useRecoilState(USD);

  return (
    <>
      <div>
        人民币：￥
        <input
          value={cny}
          type="text"
          onChange={(e) => setcny(e.target.value)}
          placeholder="请输入人民币"
        />
      </div>
      <div>
        美元：$
        <input
          value={usd}
          type="text"
          onChange={(e) => setUsd(e.target.value)}
          placeholder="请输入人民币"
        />
      </div>
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
