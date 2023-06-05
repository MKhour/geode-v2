import React from 'react';
import Header from './Header';

function Home() {
    return (
        <div className="home-header">
          <Header />
          <div class = "centered App">
            <h1>Geode</h1>
            <h3>Buttons here</h3>
          </div>
        </div>
      );
}

export default Home;