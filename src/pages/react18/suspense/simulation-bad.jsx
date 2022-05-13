import React from "react";

class MySuspense extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  
  static getDerivedStateFromError() { // 没有捕获到Promise错误，因为throw出的Promise会在React底层被内部的ComponentDidCatch捕获（非生命周期中的）
    console.log('捕获错误！');
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
        console.log('抛出promise被底层错误catcher捕获');
        throw new Error(result)
        throw suspender; 
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
  console.log('进入Content渲染');
  const data = resource.read();
  console.log('请求完成')
  return <img src={data.images[0].url} alt="" />;
};

function App() {
  return (
    <MySuspense fallback={<div>loading...</div>}>
      <Content />
    </MySuspense>
  );
}

export default App;
