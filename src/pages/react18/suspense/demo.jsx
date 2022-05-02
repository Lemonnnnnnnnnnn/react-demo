import React, { Component } from "react";

class Suspense extends Component {
  state = {};
  componentDidCatch(err, info) {
    // console.log(err);
    // console.log(info);
  }

  static getDerivedStateFromError(error) {
    console.log(error);
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

function Middle() {
  //   throw new Error("error");
  throw Promise.resolve("error");
}

function App() {
  return (
    <Suspense fallback={<div>loading ...</div>}>
        <Middle />
      <div>4</div>
    </Suspense>
  );
}

export default App;
