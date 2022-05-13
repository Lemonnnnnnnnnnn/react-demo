import React, { useEffect, useRef, useState , startTransition } from "react";
import Mock from "mockjs";

const Random = Mock.Random;

//#region Debounce
const DebounceDemo = () => {
  const [inputValue, setInput] = useState(""); // 输入值
  const [searchKey, setSeachKey] = useState(""); // 搜索值
  
  const list = useRef(
    new Array(9000).fill(1).map((_, key) => ({ key, val: Random.word() }))
  ); // 生成9000条随机字母组成的数据
  const [showList, setShowList] = useState([]); // 展示的列表

  useEffect(() => {
    setShowList(list.current); // 将生成的随机数据展示
  }, []);

  const handleInput = (e) =>{
    setInput(e.target.value)
    // 将setSeachKey标识为低优先级的任务
    startTransition(()=>{
        setSeachKey(e.target.value)
    })
  }

  return (
    <div>
      <div>
        <span>请输入筛选条件：</span>
        <input value={inputValue} onChange={handleInput} type="text" />
        {!showList.length && <div>loading...</div>}
        {showList.map((item) => (
          <Item key={item.key} data={item.val} searchKey={searchKey} />
        ))}
      </div>
    </div>
  );
};
//#endregion Debounce

const Item = ({ searchKey, data }) => {
  if (searchKey === "") return <div>{data}</div>;
  if (data.indexOf(searchKey) !== -1) {
    for (let i = 0; i < 100; i++) {
        console.log("模拟处理耗时问题");
    }
    return <div style={{ color: "red" }}>{data}</div>;
  } else {
    return <div>{data}</div>;
  }
};

export default DebounceDemo;
