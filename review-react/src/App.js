import './App.css';
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux'; // 导入Provider组件
import store from '../src/store/store'; // 导入Redux store
import { lazyLoadComponent } from './方法实现/react.lazy.practice';
import { DialogProvider } from './component/React实现全局Modal/DialogContext';

// 使用 React.lazy() 动态加载路由组件
const Home = lazyLoadComponent(() => import('./component/Home'));
const About = lazyLoadComponent(() => import('./component/About'));
const GlobalDialog = lazyLoadComponent(() => import('./component/React实现全局Modal/GlobalDialog'));
const TodoList = lazyLoadComponent(() => import('./component/React数据持久化有什么实践/2.ReduxTodoList'));

function App() {
  return (
    <Provider store={store}> {/* 使用Provider组件包裹整个应用，并传入Redux store */}
      <DialogProvider>
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/about' element={<About />} />
              <Route path='/globalDialog' element={<GlobalDialog />} />
              <Route path='/todoList' element={<TodoList />} />
            </Routes>
          </Suspense>
        </Router>
      </DialogProvider>
    </Provider>
  );
}

export default App;
