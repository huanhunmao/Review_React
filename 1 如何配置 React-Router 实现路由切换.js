import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Home from './Home';
import Test from './Test';

const App = () => (
  <Router>
    <nav>
      <NavLink to='/'>首页</NavLink>
      <NavLink to='/test'>测试</NavLink>
    </nav>

    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/test' element={<Test />} />
    </Routes>
  </Router>
);

export default App;
