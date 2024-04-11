import React, { useState, useEffect } from 'react';

// ChildComponent 组件通过 useEffect 钩子保存了上一次渲染的 count 值。
// 然后在组件重新渲染时，比较当前 count 和上一次的 prevCount，根据它们是否相等来决定是否需要更新组件
function Counter() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={handleClick}>Increase Count</button>
      <ChildComponent count={count} />
    </div>
  );
}

function ChildComponent({ count }) {
  // 保存上一次渲染的 count 值
  const prevCountRef = React.useRef();
  useEffect(() => {
    prevCountRef.current = count;
  });

  const prevCount = prevCountRef.current;

  // 进行新旧 DOM 对比
  if (count === prevCount) {
    return <p>Child Component: {count}</p>;
  } else {
    // 如果 count 发生了变化，重新渲染子组件
    return <p>Child Component: {count} (Updated)</p>;
  }
}

export default Counter;
