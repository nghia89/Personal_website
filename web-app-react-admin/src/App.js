import React, { Component } from "react";
import { AuthProvider } from "@/providers/authProvider";
//import { BrowserRouter as Router } from "react-router-dom";
import { Router } from "react-router-dom";
import { Routes } from "@/routers/index";
import history from "@/history";
import { NotificationProvider } from '@/components/index'


export default class App extends Component {
  render() {
    return (
      <AuthProvider>
        <NotificationProvider>
          <Router basename={'/'} history={history} children={Routes} />
        </NotificationProvider>
      </AuthProvider>
    );
  }
}
