import React from 'react';
import Header from './Header';
import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="home-header">
          <Header />
          <div className = "centered App">
            <div>
              <p className='main-title'>geode</p>
              <p>reveal the emotion within</p>
            </div>
            <div>
              <Link to="/journal">
                <button>Journal</button>
              </Link>
              <Link to="/">
                <button>Logs</button>
              </Link>
            </div>
          </div>
        </div>
      );
}

export default Home;