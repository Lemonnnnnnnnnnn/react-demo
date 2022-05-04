import React from "react";
import { useState, useReducer } from "react";

const Parent = () => {
  const [foo, setFoo] = useState(1);
  console.log("渲染父组件");
  return (
    <div>
      <Optimized foo={foo} />
      <button onClick={() => setFoo((pre) => pre + 1)}>change props</button>
    </div>
  );
};
const Child = ({ foo }) => {
  console.log("渲染子组件");
  return <div>{foo}</div>;
};

function areEqual(preProps, nextProps) {
  if (nextProps.foo > 2) { // 大于2就不再渲染
    return true; // 为true时表示比较相同，重用上一次渲染内容
  }
  return false; // 重新渲染
}
const Optimized = React.memo(Child, areEqual);

export default Parent;
