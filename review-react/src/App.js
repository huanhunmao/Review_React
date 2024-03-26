import './App.css';
import React, { Suspense } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { lazyLoadComponent } from './方法实现/react.lazy.practice'; 
// import Home from './component/Home';
// import About from './component/About';

// 使用 React.lazy() 动态加载路由组件
const Home = lazyLoadComponent(() => import('./component/Home'))
const About = lazyLoadComponent(() => import('./component/About'))

function App() {
  return (
    <Router>
        <Suspense fallback={<div>Loading...</div>}>
        <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        </Routes>
        </Suspense>
    </Router>
  );
}

export default App;
