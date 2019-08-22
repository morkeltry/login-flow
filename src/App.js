import React from 'react';
import { useCookies } from 'react-cookie';
import './App.css';

import config from "./config/config";

function App() {
  const [cookies, setCookie] = useCookies('stuff');

  console.log(config);
  console.log(cookies);
  console.log(`Welcome ${cookies}`);
  setCookie ('stuff', 'Things');
  console.log(cookies);

  return (
    <div className="Welcome">
      <header className="App-header">
        <p>
          Welcome { cookies.loggedInUser } <br/>
          Stuff { cookies.stuff }
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
