import React, { Component } from 'react';
import './styles.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Journal from './components/Journal';
import Header from './components/Header';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Header />} />
          <Route path='journal' element={<Journal/>} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;