import { Navigate, Outlet } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login_user } from "../actions/userActions";
import { userIsAuth } from "../api/loginApis";

const PrivateRoute = () => {
  /* Track the state of your app instead. Start with a "loading" state */
  const [state, setState] = useState("loading");
  const dispatch = useDispatch();

  useEffect(() => {
    (async function () {
      try {
        /* Update effect logic to track correct state */
        const isUserLogged = await userIsAuth();
        if (isUserLogged) {
          setState(isUserLogged ? "loggedin" : "redirect");
          dispatch(login_user({ ...isUserLogged }));
        } else {
          dispatch(
            login_user({
              firstname: null,
              lastname: null,
              email: null,
              phone: null,
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

  return state === "loggedin" ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
