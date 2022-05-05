import React, { Component } from "react";

class ErrorBoundary extends Component {
  state = {
    hasError : false
  };
  componentDidCatch(err, info) {
    console.log(err);
    console.log(info);
  }

  static getDerivedStateFromError(error){
      return {
        hasError : true
      }
  }
  render() {
    if(this.state.hasError) return <div>There are something is wrong</div>    
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
