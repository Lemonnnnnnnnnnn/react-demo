import React, { Component } from "react";

class ErrorBoundary extends Component {
  state = {};
  componentDidCatch(err, info) {
    // console.log(err);
    // console.log(info);
  }

  static getDerivedStateFromError(error){
      console.log(error)
  }
  render() {
    return <div>{this.props.children}</div>;
  }
}

function Middle() {
  throw new Error("error");
}

function App() {
  return (
    <ErrorBoundary>
      <Middle />
    </ErrorBoundary>
  );
}

export default App;
