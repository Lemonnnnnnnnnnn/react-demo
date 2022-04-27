import React, {  memo } from "react";
/*  模拟数据  */
const mockDataArray = new Array(3000).fill(1);
/* 高量显示内容 */
function ShowText({ query }) {
  const text = "asdfghjk";
  let children;
  if (query !== "" && (text.indexOf(query) > 0 || text.indexOf(query) === 0)) {
    /* 找到匹配的关键词 */
    const arr = text.split(query);
    console.log(arr);
    children = (
      <div>
        {arr[0]}
        <span style={{ color: "pink" }}>{query}</span>
        {arr[1]}{" "}
      </div>
    );
  }
  return <div>{children}</div>;
}
/* 列表数据 */
function List({ query }) {
  console.log("List渲染");
  return (
    <div>
      {mockDataArray.map((item, index) => (
        <div key={index}>
          <ShowText query={query} />
        </div>
      ))}
    </div>
  );
}
/* memo 做优化处理  */
const NewList = memo(List);

function TransitionExpense() {
  const [value, setInputValue] = React.useState("");
  const [isTransition, setTransion] = React.useState(false);
  const [query, setSearchQuery] = React.useState("");
  const handleChange = (e) => {
    /* 高优先级任务 —— 改变搜索条件 */
    setInputValue(e.target.value);
    if (isTransition) {
      /* transition 模式 */
      React.startTransition(() => {
        /* 低优先级任务 —— 改变搜索过滤后列表状态  */
        setSearchQuery(e.target.value);
      });
    } else {
      /* 不加优化，传统模式 */
      setSearchQuery(e.target.value);
    }
  };
  return (
    <div>
      <button onClick={() => setTransion(!isTransition)}>
        {isTransition ? "transition" : "normal"}{" "}
      </button>
      <input onChange={handleChange} placeholder="输入搜索内容" value={value} />
      <NewList query={query} />
    </div>
  );
}

export default TransitionExpense