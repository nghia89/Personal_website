
import React from "react";
import { AuthConsumer } from "../../providers/authProvider";
import { LoadingPage } from '@/components/loaders/index'

export default function LogoutCallback() {
    return <AuthConsumer>
        {({ signOutRedirectCallback }) => {
            signOutRedirectCallback();
            return <LoadingPage />;
        }}
    </AuthConsumer>
}