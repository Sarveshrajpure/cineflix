import Home from "./pages/home/Home";
import "./App.scss";
import PreventSigninRoute from "./utilities/PreventSigninRoute";
import PrivateRoute from "./utilities/PrivateRoute";

import Watch from "./pages/watch/Watch";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Profile from "./pages/profile";
import EditProfile from "./pages/profile/components/editProfile";
import AddProfile from "./pages/profile/components/addProfile";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/login" element={<Login />} />

      <Route path="/" element={<PrivateRoute />}>
        <Route exact path="/" element={<Profile />} />
        <Route exact path="/editProfile" element={<EditProfile />} />
        <Route exact path="/addProfile" element={<AddProfile />} />
        <Route exact path="/home" element={<Home />} />

        <Route exact path="/movies" element={<Home type={"movies"} />} />
        <Route exact path="/series" element={<Home type={"series"} />} />
        <Route exact path="/watch" element={<Watch />} />
      </Route>
    </Routes>
  );
}

export default App;
