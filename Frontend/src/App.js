import './style/style.css';
import './style/vendor.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import Search from './pages/Search';
import LoginSignin from './pages/LogInSign'
import VerifyAccount from './pages/verifyAcount';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Auth" element={<LoginSignin/>}/>
        <Route path="/verifyAccount" element={<VerifyAccount/>}/>
        <Route path="/search/:domaine/:grade/:year" element={<Search />} />
      </Routes>
    </Router>
  );
}

export default App;
