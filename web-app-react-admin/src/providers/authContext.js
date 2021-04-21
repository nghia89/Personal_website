import React from "react";

export const AuthContext = React.createContext({
    signInRedirectCallback: () => ({}),
    signOutRedirect: () => ({}),
    signOutRedirectCallback: () => ({}),
    isAuthenticated: () => ({}),
    signInRedirect: () => ({}),
    signInSilent: () => ({}),
    getUser: () => ({})
});