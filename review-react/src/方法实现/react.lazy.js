import React from 'react';

//需要组件时 才进行 加载 而不是 立即全部加载 

export function lazyLoadComponent(importComponent) {
    return class LazyLoadComponent extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          component: null
        };
      }
  
      async componentDidMount() {
        // 使用动态 import 方法加载组件模块
        const { default: component } = await importComponent();
        // 将加载得到的组件存储在状态中
        this.setState({
          component: component
        });
      }
  
      render() {
        const LoadedComponent = this.state.component;
        // 渲染加载得到的组件
        return LoadedComponent ? <LoadedComponent {...this.props} /> : null;
      }
    };
  }
  