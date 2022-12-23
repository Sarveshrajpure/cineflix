import React from "react";
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./app.css";
import Home from "./pages/home/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Lists from "./pages/listsList/Lists";
import MovieList from "./pages/movieList/movieList";
import Movie from "./pages/movie/Movie";
import AddContent from "./pages/addContent/AddContent";
import AddList from "./pages/addLists/AddList";
import Login from "./pages/login/Login";
import PrivateRoute from "./utilities/PrivateRoute";
import PreventSigninRoute from "./utilities/PreventSigninRoute";
import { Toaster } from "react-hot-toast";
import List from "./pages/list/List";

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
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            <PrivateRoute exact path="/home">
              <Home />
            </PrivateRoute>
            {/* LISTS */}

            <PrivateRoute path="/lists">
              <Lists />
            </PrivateRoute>
            <PrivateRoute path="/list/:id">
              <List />
            </PrivateRoute>
            <PrivateRoute path="/addlist">
              <AddList />
            </PrivateRoute>

            {/* Movies */}
            <PrivateRoute path="/movies">
              <MovieList />
            </PrivateRoute>
            <PrivateRoute path="/movie/:id">
              <Movie />
            </PrivateRoute>
            <PrivateRoute path="/addcontent">
              <AddContent />
            </PrivateRoute>
          </div>
        </>
      </Switch>
    </Router>
  );
}

export default App;
