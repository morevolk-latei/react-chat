import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Chat from "./components/Chat";
import ContactUS from "./components/ContactUs";
import Gallery from "./components/Gallery";
import Homepage from "./components/Homepage";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";



export default function AppRoutes(props) {

  const routesConfig = [
    {
      path: '/chat',
      Component: Chat,
      exact: true
    },
    {
      path: '/our-work',
      Component: Gallery,
      exact: true
    },
    {
      path: '/contactus',
      Component: ContactUS,
      exact: true
    },
    {
      path: '/signin',
      Component: SignIn,
      exact: true
    },
    {
      path: '/signup',
      Component: SignUp,
      exact: true
    },
    {
      path: '/',
      Component: Homepage,
      exact: true
    }
  ]

  const renderRoutes = () => routesConfig.map((route, index) =>
    <Route
      path={route.path}
      component={route.Component}
      key={route.path}
      exact={route.exact || false}
    />
  )

  return (
    <BrowserRouter>
      <Switch>
        {renderRoutes()}
      </Switch>
    </BrowserRouter>
  )
}

