import {
  atom,
  useRecoilValue,
  selector,
  useRecoilState,
  RecoilRoot,
} from "recoil";
import React, { Component } from "react";

const CNY = atom({
  key: "CNY",
  default: 0,
});

const USD = selector({
  key: "USD",
  get: ({ get }) => {
    const rate = 0.15;
    return get(CNY) * rate;
  },
});

const EUR = selector({
  key: "EUR",
  get: ({ get }) => {
    const rate = 0.94;
    return get(USD) * rate;
  },
});

function Input() {
  const [cny, setcny] = useRecoilState(CNY);
  const usd = useRecoilValue(USD);
  const eur = useRecoilValue(EUR);

  return (
    <>
      <div>
        人民币：￥
        <input
          type="text"
          onChange={(e) => setcny(e.target.value)}
          placeholder="请输入人民币"
        />
      </div>
      <div>美元：$<span>{usd}</span></div>
      <div>欧元：€<span>{eur}</span></div>
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
