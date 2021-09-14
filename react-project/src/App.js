import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import UserList from './components/user-list.component';
import AccountList from './components/account-list.component';
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
