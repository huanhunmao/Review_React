import React, { useState, useEffect } from 'react';

// 当用户点击按钮增加计数器的值时，useEffect 钩子会注册一个回调函数 workLoop 到浏览器的空闲时段执行。
// 在每次空闲时段，workLoop 函数会尽可能多地执行一小部分工作（递增计数器的值），直到任务单元执行完成或者达到了执行时间阈值。
// 然后，如果还有剩余的工作未完成，就会通过 requestIdleCallback 继续注册下一个空闲时段执行的回调函数
function Counter() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  useEffect(() => {
    let start = 0;
    let deadline = 1000; // 设置一个任务单元的执行时间阈值

    const workLoop = (deadline) => {
      while ((deadline.timeRemaining() > 0 || deadline.didTimeout) && start < count) {
        setCount(start++);
      }
      if (start < count) {
        requestIdleCallback(workLoop);
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
