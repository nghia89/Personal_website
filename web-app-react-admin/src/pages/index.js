import Home from './home';
import Dashboard from './dashboard/index';
import { Product } from './Product/index';
import Error404 from './error/error404.js';
import Error401 from './error/error401';
import Callback from './auth/callback';
import LogoutCallback from './auth/logoutCallback';
import silentRenewClient from './auth/silentRenewClient';
import User from './users/index';
import Role from './roles/index';
import PermissionFunction from './permissionFunction/index'


export {
    Home,
    Dashboard,
    Product,
    Error404,
    Error401,
    Callback,
    LogoutCallback,
    silentRenewClient,
    User,
    Role,
    PermissionFunction
};