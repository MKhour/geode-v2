import React, { Component } from 'react';
import './styles.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Journal from './components/Journal';
import Home from './components/Home';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='journal' element={<Journal/>} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;