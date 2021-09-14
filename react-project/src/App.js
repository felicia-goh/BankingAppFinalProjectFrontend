import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import LandingPage from './components/landing-page.component';
import TransactionList from './components/transaction-list.component';
import CreateTransaction from './components/transaction-create.component';

function App() {
  return (
    <div className="App">
      <div class="container">
        {/* <UserList /> */}
        {/* <AccountList /> */}
        <LandingPage />
        {/* <TransactionList />
        <CreateTransaction /> */}
      </div>
    </div>
  );
}

export default App;
