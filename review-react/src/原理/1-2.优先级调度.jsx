import React, { useState, useEffect } from 'react';

// 模拟了两种不同优先级的任务：高优先级任务和低优先级任务。当剩余时间足够时，我们将任务优先级设为高，并连续递增计数器的值；
// 当剩余时间较少时，我们将任务优先级设为低，并且每递增10次计数器的值，就会暂停一次任务执行，并设置更长的超时时间来模拟低优先级任务
function Counter() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  useEffect(() => {
    const workLoop = (deadline) => {
      let priority = deadline.timeRemaining() > 1 ? 'high' : 'low'; // 根据剩余时间决定任务优先级
      let start = 0;

      while (start < count) {
        setCount(start++);
        if (priority === 'low' && start % 10 === 0) { // 模拟低优先级任务
          requestIdleCallback(workLoop, { timeout: 1000 }); // 如果是低优先级任务，设置更长的超时时间
          return;
        }
      }

      if (start < count) {
        requestIdleCallback(workLoop); // 继续在下一个空闲时段执行
      }
    };

    requestIdleCallback(workLoop);

    return () => {
      // 清理操作
    };
  }, [count]);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={handleClick}>Increase Count</button>
    </div>
  );
}

export default Counter;

