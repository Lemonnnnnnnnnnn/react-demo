import React from "react";

class Suspense extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  componentDidCatch(err, info) {
    console.log(err);
    console.log(info);
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    const { fallback } = this.props;
    if (this.state.hasError) {
      return fallback;
    }
    return <div>{this.props.children}</div>;
  }
}

function createResource(url) {
  let status = "loading";
  let result;

  let suspender = fetch(url)
    .then((res) => res.json())
    .then((res) => {
      status = "success";
      result = res;
    })
    .catch((error) => {
      status = "error";
      result = error;
    });

  return {
    read() {
      if (status === "loading") {
        throw suspender; // 抛出promise给Suspense
      } else if (status === "error") {
        throw new Error(result); // 抛出错误
      } else {
        return result; // 返回结果
      }
    },
  };
}

const resource = createResource("https://api.waifu.im/random");

const Content = () => {
  const data = resource.read();
  return <img src={data.images[0].url} alt="" />;
};

function App() {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Content />
    </Suspense>
  );
}

export default App;
