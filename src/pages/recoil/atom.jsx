import { atom, useRecoilState } from "recoil";
import Wrapper from './wrapper'
import React, { Component } from 'react';


const fontSizeState = atom({
  key: "fontSizeState",
  default: 14,
});

function FontButton() {
  const [fontSize, setFontSize] = useRecoilState(fontSizeState);
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
  const [fontSize, setFontSize] = useRecoilState(fontSizeState);
  return <p style={{ fontSize }}>This text will increase in size too.</p>;
}


class Atom extends Component {
    render() { 
        return (
        <Wrapper>
            <FontButton />
            <Text />
        </Wrapper>);
    }
}
 
export default Atom;
