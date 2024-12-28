import './style/style.css';
import './style/vendor.css';
import { BrowserRouter as Router, Routes, Route, Navigate  } from "react-router-dom";

import {Home, Search, LoginSignin, VerifyAccount, Profile, Students, Levels, StudyField} from "./Routes"

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
        <Route path="/Dashboard/Students" element={<Students />} />
        <Route path="/Dashboard/Levels" element={<Levels />} />
        <Route path="/Dashboard/StudyField" element={<StudyField />} />
      </Routes>
    </Router>
  );
}

export default App;
