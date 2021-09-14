import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import UserDetails from './components/user-details.component';
import AccountList from './components/account-list.component';
import LandingPage from './components/landing-page.component';

function App() {
  return (
    <div className="App">
      <div class="container">
        {/* <UserDetails /> */}
        {/* <AccountList /> */}
        <LandingPage />
      </div>
    </div>
  );
}

export default App;
