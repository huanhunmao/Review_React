// connect.js

// connect 函数返回一个高阶组件，
// 1 该高阶组件在 componentDidMount 生命周期中订阅了 Redux store 的变化。
// 2 当 Redux store 变化时，会通过 handleStoreChange 方法强制更新组件，触发重新渲染。
// 3 在 render 方法中，通过 mapStateToProps 和 mapDispatchToProps 函数将 Redux store 的状态和 dispatch 映射到组件的 props。
// 4 使用原始组件 WrappedComponent 渲染，将映射后的 props 传递给它

import React from 'react';
import { bindActionCreators } from 'redux';

const connect = (mapStateToProps, mapDispatchToProps) => {
  return (WrappedComponent) => {
    return class ConnectedComponent extends React.Component {
      componentDidMount() {
        // Subscribe to the Redux store changes
        this.unsubscribe = this.context.store.subscribe(this.handleStoreChange);
      }

      componentWillUnmount() {
        // Unsubscribe when the component is unmounted
        this.unsubscribe();
      }

      handleStoreChange = () => {
        // Trigger a re-render when the store state changes
        this.forceUpdate();
      };

      render() {
        // Get the current state from the Redux store
        const state = this.context.store.getState();

        // Map state to props using mapStateToProps function
        const mappedState = mapStateToProps(state);
        // mapStateToProps 示例 
        // mapStateToProps 函数接收整个 Redux store 的状态作为参数，然后返回一个对象
        // const mapStateToProps = (state) => { 
        //     return {
        //       counter: state.counter
        //     };
        //   };

        // Map dispatch to props using mapDispatchToProps function
        const mappedDispatch = mapDispatchToProps(this.context.store.dispatch);

        // mapDispatchToProps 示例
        // mapDispatchToProps 函数接收 dispatch 函数作为参数，然后返回一个对象
        // const mapDispatchToProps = (dispatch) => {
        //     return {
        //       increment: () => dispatch(incrementCounter()),
        //       decrement: () => dispatch(decrementCounter())
        //     };
        //   };

        // Combine the props from state and dispatch
        const props = { ...this.props, ...mappedState, ...mappedDispatch };

        // Render the original component with the combined props
        return <WrappedComponent {...props} />;
      }
    };
  };
};

// Set the context type to access the Redux store
connect.contextTypes = {
  store: () => null,
};

export default connect;
