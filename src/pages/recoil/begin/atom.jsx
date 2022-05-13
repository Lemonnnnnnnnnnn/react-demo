import { atom, useRecoilState , RecoilRoot , useRecoilValue } from "recoil";
import React, { Component } from 'react';


const fontSizeState = atom({
  key: "fontSizeState", // 必须是string
  default: 14,
});

function FontButton() {
  const [fontSize, setFontSize] = useRecoilState(fontSizeState); // 获取atom状态和修改方法
  return (
    <button
      onClick={() => setFontSize((size) => size + 1)}
      style={{ fontSize }}
    >
      Click to Enlarge
    </button>
  );
}

function Text() {
  const fontSize = useRecoilValue(fontSizeState); // 如果我们不用修改atom状态，可以用useRecoilValue来替代useRecoilState
  return <p style={{ fontSize }}>This text will increase in size too.</p>;
}


class Atom extends Component {
    render() { 
        return (
        <RecoilRoot>
            <FontButton />
            <Text />
        </RecoilRoot>)
    }
}
 
export default Atom;
