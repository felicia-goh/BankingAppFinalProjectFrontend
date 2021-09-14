import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import LandingPage from './components/landing-page.component';

function App() {
  return (
    <div className="App">
      <div class="container">
        {/* <UserList /> */}
        {/* <AccountList /> */}
        <LandingPage />
      </div>
    </div>
  );
}

export default App;
