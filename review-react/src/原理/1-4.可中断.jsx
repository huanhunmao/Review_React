import React, { useState } from 'react';

// 模拟了一个长时间执行的任务 performWork，并通过检查任务执行的时间来判断是否需要中断任务。当任务执行时间超过了时间片（16毫秒），
// 即超过了浏览器的空闲时间，我们使用 requestIdleCallback 来中断当前任务，并在下一个空闲时段继续执行任务。
// 这样就实现了 React Fiber 的可中断性
function Counter() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  const performWork = () => {
    let start = performance.now();

    while (performance.now() - start < 100) { // 模拟一个任务执行100毫秒
      // 执行任务
    }

    // 检查是否需要中断任务
    if (performance.now() >= start + 16) { // 如果任务执行超过16毫秒，即超过了时间片，就中断任务
      requestIdleCallback(performWork); // 在下一个空闲时段继续执行任务
    }
  };

  React.useEffect(() => {
    // 在组件挂载时开始执行任务
    requestIdleCallback(performWork);

    return () => {
      // 在组件卸载时清理操作
    };
  }, []);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={handleClick}>Increase Count</button>
    </div>
  );
}

export default Counter;
