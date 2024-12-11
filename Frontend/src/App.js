import './style/style.css';
import './style/vendor.css';
import { BrowserRouter as Router, Routes, Route, Navigate  } from "react-router-dom";
import Home from "./pages/Home"
import Search from './pages/Search';
import LoginSignin from './pages/LogInSign'
import VerifyAccount from './pages/verifyAcount';
import Profile from './pages/profile';

function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Auth" element={!user ? <LoginSignin /> : <Navigate to="/" />} />
        <Route path="/verifyAccount/:userId/:token" element={!user ? <VerifyAccount /> : <Navigate to="/"/>} />
        <Route path="/search/:domaine/:grade/:year" element={user ? <Search /> : <Navigate to="/Auth"/>} />
        <Route path="/profile/:id" element={user ? <Profile /> : <Navigate to="/Auth" />} />
      </Routes>
    </Router>
  );
}

export default App;
