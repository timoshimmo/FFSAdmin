import React from "react";
import { Navigate } from "react-router-dom";

//Dashboard
import Users from "../pages/Users";
import Sponsors from "../pages/Sponsors";
import Partners from "pages/Partners";

//AuthenticationInner pages
/*
import Basic404 from '../pages/AuthenticationInner/Errors/Basic404';
import Cover404 from '../pages/AuthenticationInner/Errors/Cover404';
import Alt404 from '../pages/AuthenticationInner/Errors/Alt404';
import Error500 from '../pages/AuthenticationInner/Errors/Error500';
import Offlinepage from "../pages/AuthenticationInner/Errors/Offlinepage";
*/



//login
import Login from "../pages/Authentication/Login";
import ForgetPasswordPage from "../pages/Authentication/ForgetPassword";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";

// User Profile
import UserProfile from "../pages/Authentication/user-profile";




const authProtectedRoutes = [
  { path: "/users", component: <Users /> },
  { path: "/index", component: <Users /> },

  { path: "/sponsors", component: <Sponsors /> },
  { path: "/partners", component: <Partners /> },
  

  //User Profile
  { path: "/profile", component: <UserProfile /> },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  {
    path: "/",
    exact: true,
    component: <Navigate to="/users" />,
  },
  { path: "*", component: <Navigate to="/users" /> },
];

const publicRoutes : any= [
  // Authentication Page
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "/forgot-password", component: <ForgetPasswordPage /> },
  { path: "/register", component: <Register /> },

  //AuthenticationInner pages

  /*
  { path: "/auth-404-basic", component: <Basic404 /> },
  { path: "/auth-404-cover", component: <Cover404 /> },
  { path: "/auth-404-alt", component: <Alt404 /> },
  { path: "/auth-500", component: <Error500 /> },

  { path: "/auth-offline", component: <Offlinepage /> },

  */

];

export { authProtectedRoutes, publicRoutes };