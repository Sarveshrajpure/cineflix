import { Redirect, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login_user } from "../Actions/userActions";
import { userIsAuth } from "../apis/userApis";

const PreventSigninRoute = ({ children, ...rest }) => {
  /* Track the state of your app instead. Start with a "loading" state */
  const [state, setState] = useState("loading");
  const dispatch = useDispatch();

  useEffect(() => {
    (async function () {
      try {
        /* Update effect logic to track correct state */
        const isUserLogged = await userIsAuth();
        console.log(isUserLogged);
        if (isUserLogged) {
          setState(isUserLogged ? "loggedin" : "redirect");
        } else {
          dispatch(
            login_user({
              loginInfo: {
                _id: null,
                email: null,
                password: null,
                isAdmin: false,
              },
            })
          );
          setState(isUserLogged ? "loggedin" : "redirect");
        }
      } catch {
        setState("redirect");
      }
    })();
  }, [dispatch]);

  /* If in loading state, return loading message while waiting for 
 isValidToken to complete */
  if (state === "loading") {
    return <div>Loading..</div>;
  }
  return (
    <Route
      {...rest}
      render={() => {
        return state === "loggedin" ? <Redirect to="/" /> : children;
      }}
    />
  );
};

export default PreventSigninRoute;
