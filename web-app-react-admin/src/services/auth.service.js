import { Log, UserManager } from 'oidc-client';
import { env } from '@/environments/config';
import { PATH } from '@/constants/paths'
import history from '@/history';

export default class AuthService {

    userManager;

    constructor() {
        this.userManager = new UserManager(getClientSettings());

        Log.logger = console;
        Log.level = Log.INFO;

        this.userManager.events.addUserLoaded((user) => {
            if (window.location.href.indexOf(PATH.AuthCallback) !== -1) {
                this.navigateToScreen();
            }
        });

        this.userManager.events.addSilentRenewError((e) => {
            console.log("silent renew error", e.message);
        });

        this.userManager.events.addAccessTokenExpired(() => {
            console.log("token expired");
            this.signInRedirect();
        });
    }

    getUser = async () => {
        return await this.userManager.getUser();
    }

    signInRedirectCallback = () => {
        return this.userManager.signinRedirectCallback();

        // return this.userManager.signinRedirectCallback().then(() => {
        //     this.navigateToScreen();
        // });
    }
    signInSilentCallback = () => {
        return this.userManager.signinSilent();
    }

    signOutRedirect = () => {
        this.userManager.signoutRedirect();
        this.userManager.clearStaleState();
    }
    signInRedirect = () => {
        // localStorage.setItem("redirectUri", window.location.pathname);
        this.userManager.signinRedirect();
    };

    isAuthenticated = () => {
        const oidcUser = sessionStorage.getItem(`oidc.user:${env.baseApiUrl}:${env.clientId}`);
        const oidcStorage = oidcUser ? JSON.parse(oidcUser) : null;
        return (!!oidcStorage && !!oidcStorage.access_token)
    };

    signOutRedirectCallback = () => {
        this.userManager.signoutRedirectCallback().then(() => {
            localStorage.clear();
            window.location.replace(env.baseApiUrl);
        });
        this.userManager.clearStaleState();
    };

    navigateToScreen = () => {
        history.push(PATH.Dashboard)
        // window.location.replace(PATH.Dashboard);
    };

    handleError = (error) => {
        return console.error("Error authentication: ", error);
    }
}

export function getClientSettings() {
    return {
        authority: env.authorityUrl,
        client_id: env.clientId,
        redirect_uri: env.adminUrl + '/auth-callback',
        post_logout_redirect_uri: env.adminUrl,
        response_type: 'code',
        scope: 'api.webApp openid profile',
        filterProtocolClaims: true,
        loadUserInfo: true,
        automaticSilentRenew: true,
        silent_redirect_uri: env.adminUrl + '/silent-renew',
        // response_mode: "query"
    };
}