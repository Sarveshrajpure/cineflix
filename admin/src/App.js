import React from "react";
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./app.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MovieList from "./pages/movieList/movieList";
import Movie from "./pages/movie/Movie";
import AddContent from "./pages/addContent/AddContent";
import Login from "./pages/login/Login";
import PrivateRoute from "./utilities/PrivateRoute";
import PreventSigninRoute from "./utilities/PreventSigninRoute";
import { Toaster } from "react-hot-toast";

function App() {
  // console.log(user);
  return (
    <Router>
      <Switch>
        <PreventSigninRoute exact path="/login">
          <Login />
        </PreventSigninRoute>
        <>
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#FFFFFF",
                color: "#5063F0",
              },
            }}
          ></Toaster>
          <Topbar />
          <div className="container">
            <Sidebar />
            <PrivateRoute exact path="/">
              <Home />
            </PrivateRoute>
            <PrivateRoute path="/movies">
              <MovieList />
            </PrivateRoute>
            <PrivateRoute path="/movie/:id">
              <Movie />
            </PrivateRoute>
            <Route path="/addcontent">
              <AddContent />
            </Route>
          </div>
        </>
      </Switch>
    </Router>
  );
}

export default App;
