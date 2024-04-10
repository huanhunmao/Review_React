
// 问题： 为啥 react 这样写 就可将数据传递给 子组件 <ChildrenComponent data={data}/>
//      子组件 ChildrenComponent 可使用 props.data /  const { data } = props 来访问

// 传递参数时 【React.createElement 根据传入的参数创建一个描述 React 元素的 JavaScript 对象，用于描述要渲染的组件或 HTML 标签以及其属性和子元素】
React.createElement(ChildComponent, { data: data });



// 比如 
<div className="container">Hello, world!</div>
// 这个 会变成 下面这样
React.createElement("div", { className: "container" }, "Hello, world!");

// 实际上，React.createElement（type, props, children） 函数接收三个参数：

// type：表示要创建的元素的类型，可以是一个字符串表示 HTML 标签名（比如 "div"），也可以是一个表示 React 组件的函数或类（比如 ChildComponent）。
// props：一个对象，包含了要传递给创建的元素的属性，这些属性在创建时被挂载到元素的 props 属性上。
// children：可选参数，表示要作为子元素添加到创建的元素中的内容。可以是单个元素或者是一个元素数组。