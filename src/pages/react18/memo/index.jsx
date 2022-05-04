import React from "react";
import { useState, useReducer } from "react";

const Parent = () => {
  const [foo, setFoo] = useState(1);
  const [_, forceRender] = useReducer((num) => num + 1, 0); // 强制刷新
  console.log("渲染父组件");
  return (
    <div>
      <Optimized foo={foo} />
      <button onClick={() => setFoo((pre) => pre + 1)}>change props</button>
      <button onClick={() => forceRender()}>force render</button>
    </div>
  );
};
const Child = ({ foo }) => {
  console.log("渲染子组件");
  return <div>{foo}</div>;
};

const Optimized = React.memo(Child);

export default Parent;
