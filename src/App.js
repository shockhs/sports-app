import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Menu from './components/Menu/Menu';
import Content from './components/Content/Content';
import { Route } from 'react-router';

function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Route path='/matches' render={() => <Content />} />
    </div>
  );
}

export default App;
