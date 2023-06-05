import React from 'react';
import Header from './Header';

function Home() {
    return (
        <div className="home-header">
          <Header />
          <div class = "centered App">
            <div class = "main-title">
              <h1>geode</h1>
              <p>Reveal the emotion within</p>
            </div>
            <div>
              <button>Journal</button>
              <button>Logs</button>
            </div>
          </div>
        </div>
      );
}

export default Home;