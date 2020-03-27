import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Menu from './components/Menu/Menu';
import Content from './components/Content/Content';

function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Content />
    </div>
  );
}

export default App;
