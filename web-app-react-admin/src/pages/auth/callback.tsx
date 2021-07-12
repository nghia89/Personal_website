import * as React from "react";
import { LoadingPage } from '@/components/loaders/index'
import { AuthConsumer } from "@/providers/authProvider";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { Profile } from "oidc-client";
import { setClaimUser } from '@/reducer/claimUser/User.thunks';
import { PATH } from '@/constants/paths'

interface IProps {
    setClaimUser: (payload: Profile) => {}
}

export function Callback(props: IProps) {
    let history = useHistory();
    return <AuthConsumer>
        {({ signInRedirectCallback }) => {
            signInRedirectCallback().then((profile) => {
                window.history.replaceState({},
                    window.document.title,
                    window.location.origin + window.location.pathname);
                props.setClaimUser(profile.profile);
                // history.push(PATH.Dashboard)

            });
            return <LoadingPage />;
        }}
    </AuthConsumer>
}

const mapStateToProps = state => {
    return {
        claimUser: state.claimUser.claimUser
    };
};

const mapDispatchToProps = { setClaimUser }
export default connect(mapStateToProps, mapDispatchToProps)(Callback)