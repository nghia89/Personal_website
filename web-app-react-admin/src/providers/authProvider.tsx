import React, { Component } from "react";
import AuthService from "@/services/auth.service";
import { AuthContext } from '@/providers/authContext';
import history from "@/history";
import { LoadingPage } from '@/components/loaders/index'

export const AuthConsumer = AuthContext.Consumer;

export class AuthProvider extends Component {
    authService;
    constructor(props) {
        super(props);
        this.authService = new AuthService();
    }
    // componentWillMount() {
    //     if (this.checkAuthentication()) {
    //         this.authService.signInRedirect();
    //     }
    // }

    componentDidMount() {
        if (this.checkAuthentication()) {
            this.authService.signInRedirect();
        }
    }

    checkAuthentication = () => {
        let pathName = history?.location?.pathname;
        return (!this.authService.isAuthenticated() && pathName !== "/auth-callback")
    }

    checkRender() {
        if (this.checkAuthentication()) return <LoadingPage />
        else return <AuthContext.Provider value={this.authService}>{this.props.children}</AuthContext.Provider>
    }

    render() {
        return this.checkRender();
    }
}
