import Home from "./pages/home/Home";
import "./App.scss";
import Watch from "./pages/watch/Watch";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  const user = true;
  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={user ? <Home /> : <Navigate to="/register" />}
        />
        <Route
          exact
          path="/register"
          element={!user ? <Register /> : <Navigate to="/" />}
        />
        <Route
          exact
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          exact
          path="/movies"
          element={user ? <Home type={"movies"} /> : <Navigate to="/login" />}
        />
        <Route
          exact
          path="/series"
          element={user ? <Home type={"series"} /> : <Navigate to="/login" />}
        />
        <Route
          exact
          path="/watch"
          element={user ? <Watch /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
