import './style/style.css';
import './style/vendor.css';
import { BrowserRouter as Router, Routes, Route, Navigate  } from "react-router-dom";

import {Home, Search, LoginSignin, VerifyAccount, Profile,Chat, Students, Levels, StudyField, ViewAlumni, Page404} from "./Routes"

function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Auth" element={!user ? <LoginSignin /> : <Navigate to="/" />} />
        <Route path="/verifyAccount/:userId/:token" element={!user ? <VerifyAccount /> : <Navigate to="/"/>} />
        <Route
          path="/search/:domaine/:grade?/:year?"
          element={user ? <Search /> : <Navigate to="/" />}
        />
        <Route path="/profile/:id" element={user ? <Profile /> : <Navigate to="/" />} />
        <Route path="/Chat/:id" element={user ? <Chat /> : <Navigate to="/"/> }/>
        <Route path="/alumni/:id" element={user ? <ViewAlumni /> : <Navigate to="/"/> }/>
        <Route path="/Dashboard/Students" element={user?.role === "admin" ? <Students /> : <Navigate to="/"/>} />
        <Route path="/Dashboard/Levels" element={user?.role === "admin" ? <Levels /> : <Navigate to="/"/>} />
        <Route path="/Dashboard/StudyField" element={<StudyField />} />
        <Route path='*' element={<Page404/>} />
      </Routes>
    </Router>
  );
}

export default App;
