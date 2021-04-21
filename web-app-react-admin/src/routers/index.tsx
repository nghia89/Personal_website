import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { PATH } from '@/constants/paths'

import { PrivateRoute } from './privateRoute';
import Layout from '@/layouts/index';
import { Error401 } from '@/pages/index'
const Dashboard = React.lazy(() => import('@/pages/dashboard/index'));
const Home = React.lazy(() => import('@/pages/home/index'));


//#region  auth
const Callback = React.lazy(() => import('@/pages/auth/callback'));
const SilentRenewClient = React.lazy(() => import('@/pages/auth/silentRenewClient'));
//#endregion


//#region  systems
const User = React.lazy(() => import('@/pages/users/index'));
const Role = React.lazy(() => import('@/pages/roles/index'));
const Org = React.lazy(() => import('@/pages/org/index'));
const PermissionFunction = React.lazy(() => import('@/pages/permissionFunction/index'));
//#endregion



export const Routes = (
    <Layout >
        <Switch >
            {/* <Route
            
            path="/:lng(en|es|de|fr|pt|it)/register/:form?"
            component={Register}
        /> */}
            <Route exact path="/auth-callback" component={Callback} />
            <Route exact path="/silent-renew" component={SilentRenewClient} />
            <Route exact path="/error401" component={Error401} />

            <PrivateRoute path={PATH.Dashboard} component={Dashboard} />

            <PrivateRoute path={PATH.USER} component={User} />
            <PrivateRoute path={PATH.ROLE} component={Role} />
            <PrivateRoute path={PATH.PERMISSION} component={PermissionFunction} />
            <PrivateRoute path={PATH.ORG} component={Org} />
            {/* <PrivateRoute path={PATH.PRODUCT} component={Product} />
            <PrivateRoute path={PATH.PRODUCT + '/:idProduct'} component={Product} /> */}

            <PrivateRoute path={PATH.HOME} component={Home} />


        </Switch>
    </Layout >

);