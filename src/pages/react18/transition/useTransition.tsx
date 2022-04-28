import React, { useTransition, useState } from "react";

function Transition() {
  /**
   *  isPending： 低优先级任务是否在队列等待
   * startTransition : 和直接使用startTransition效果相同，定义低优先级任务
   */
  const [isPending, startTransition] = useTransition();
  const [count, setCount] = useState(0);
  const [btnValue, setBtnValue] = useState("add , current number is 0");

  function handleClick() {
    setCount((c) => c + 1); // count优先更新

    // btnValue设为低优先任务
    startTransition(() => {
      setBtnValue(`add , current number is ${count}`);
    });
  }
  return (
    <div>
      {isPending ? (
        <div>adding ...</div>
      ) : (
        <button onClick={handleClick}>{btnValue}</button>
      )}

      <div>{count}</div>
    </div>
  );
}

export default Transition;
