function createElement(type, props, ...children) {
    return {
      type: type, // 元素类型，可以是字符串（HTML 标签名）或函数（React 组件）
      props: {
        ...props, // 将传入的 props 对象展开
        children: children.length <= 1 ? children[0] : children // 处理子元素，如果只有一个子元素，则直接将子元素作为 children，否则将子元素放入数组中
      }
    };
  }
  