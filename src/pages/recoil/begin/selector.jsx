import { atom, useRecoilValue, selector , useRecoilState , RecoilRoot } from "recoil";
import React, { Component } from "react";

const fontSizeState = atom({
  key: "fontSizeState",
  default: 14,
});

const fontSizeLabelState = selector({
  key: "fontSizeLabelState",
  get: ({ get }) => {
    const fontSize = get(fontSizeState); // 访问了fontSizeState , 创建了与fontSizeStated的依赖关系
    const unit = "px";
    return `${fontSize}${unit}`; 
  },
});

function FontButton() {
  const fontSizeLabel = useRecoilValue(fontSizeLabelState); //计算依赖值
  const [fontSize, setFontSize] = useRecoilState(fontSizeState);
  return (
    <>
      <div>current font size : {fontSizeLabel}</div>
      <button
          onClick={() => setFontSize((size) => size + 1)}
        style={{ fontSize }}
      >
        Click to Enlarge
      </button>
    </>
  );
}

class Selector extends Component {
  render() {
    return (
      <RecoilRoot>
        <FontButton />
      </RecoilRoot>
    );
  }
}

export default Selector;
