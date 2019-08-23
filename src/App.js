import React from 'react';
import { useCookies } from 'react-cookie';
import jwt from 'jsonwebtoken';
import atob from 'atob';
import './App.css';

import config from "./config/config";

function decodeToken(token){
  const base64Payload = token.split('.')[1];
  if (base64Payload) {
    const jsonPayload = atob(base64Payload);
    if (jsonPayload) {
      const payload = JSON.parse(atob(base64Payload));
      return payload
  }}
  return null
};


function App() {
  const [cookies, setCookie] = useCookies('jwt');
  let claims = decodeToken(cookies.jwt) ||  {};

  console.log(config);
  console.log(cookies);
  console.log(cookies.jwt);
  console.log('Dcode:',decodeToken(cookies.jwt));
  // if (cookies.jwt && Array.isArray())
  // claims = jwt_decode(cookies.jwt)
  if (claims.loggedIn) {
  //   console.log(claims.loggedIn);
  //   console.log(`Welcome ${claims.loggedIn}`);
  //   console.log(claims.loggedIn);

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
  return null
}


export default App;
