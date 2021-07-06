import React from "react";
import { Route } from "react-router-dom";
import { AuthConsumer } from "@/providers/authProvider";
import Error404 from '@/pages/error/error404'
import { checkPath } from '@/helpers/utils';

export const PrivateRoute = ({ component, ...rest }) => {
  const renderFn = Component => props => (
    <AuthConsumer>
      {
        ({ isAuthenticated, signInRedirect }) => {
          let pathname = props?.location?.pathname;
          if (isAuthenticated() && !checkPath(pathname)) return <Error404 />
          else if (Component && isAuthenticated()) {
            return <Component  {...props} />;
          } else {
            signInRedirect();
            return <span>loading</span>;
          }
        }}
    </AuthConsumer>
  );

  return <Route path={rest.path} exact={rest.exact} component={renderFn(component)} />;
};
