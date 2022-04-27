import React, { useEffect, useRef, useState } from "react";
import Mock from "mockjs";

const Random = Mock.Random;

const DebounceDemo = () => {
  const [searchKey, setSeachKey] = useState(""); // 搜索值
  const list = useRef(
    new Array(9000).fill(1).map((_, key) => ({ key, val: Random.word() }))
  ); // 生成9000条随机字母组成的数据
  const [showList, setShowList] = useState([]); // 展示的列表

  useEffect(() => {
    setShowList(list.current); // 将生成的随机数据展示
  }, []);

  return (
    <div>
      <div>
        <span>请输入筛选条件：</span>
        <input value={searchKey} onChange={(e) => setSeachKey(e.target.value)} type="text" />
        {!showList.length && <div>loading...</div>}
        {showList.map((item) => (
          <Item key={item.key} data={item.val} searchKey={searchKey} />
        ))}
      </div>
    </div>
  );
};

const Item = ({ searchKey, data }) => {
  if (searchKey === "") return <div>{data}</div>;
  if (data.indexOf(searchKey) !== -1) {
    for (let i = 0; i < 100; i++) {
        console.log("模拟处理严重渲染问题");
    }
    return <div style={{ color: "red" }}>{data}</div>;
  } else {
    return <div>{data}</div>;
  }
};

export default DebounceDemo;
