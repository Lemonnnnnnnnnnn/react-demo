import React from "react";
import { RecoilRoot } from "recoil";

class Wrapper extends React.Component {
  render() {
    return <RecoilRoot>{this.props.children}</RecoilRoot>;
  }
}


export default Wrapper;
