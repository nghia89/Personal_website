import React, { Fragment, useState, useEffect, useContext } from 'react'
import { AuthContext } from '@/providers/authContext';
import { Profile } from '@/models/Profile';
import { connect } from 'react-redux';
import { setClaimUser } from '@/reducer/claimUser/User.thunks';
import { IconLogout, IconUser } from '@/helpers/svg';

interface IProps {
    claimUser: Profile,
    setClaimUser: (payload: Profile) => {}
}

function DropdownInfoUser(props: IProps) {

    const [loading, setLoading] = useState<boolean>(true)
    const context = useContext(AuthContext);
    useEffect(() => {
        if (!props.claimUser && context.isAuthenticated()) {
            context.getUser().then((rsp) => {
                if (rsp.profile) {
                    props.setClaimUser(rsp.profile)
                    setLoading(false)
                }
            })
        }
        setLoading(false)
    }, [props.claimUser])


    function handleClick(signOutRedirect) {
        signOutRedirect()
    }

    function renderContent() {
        return <AuthContext.Consumer>
            {context => (
                <Fragment>

                    <li className="nav-item">
                        <a className="nav-link" data-bs-toggle="collapse" href="#collapseUser" role="button" aria-expanded="false" aria-controls="collapseUser"
                        >
                            <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                                {props.claimUser?.name}
                            </span>
                            {IconUser()}
                        </a>
                        {/* Dropdown - User Information */}
                        <div
                            className="dropdown-list collapse dropdown-menu dropdown-menu-ct dropdown-menu-right shadow animated--grow-in" id="collapseUser"
                        >
                            <a className="dropdown-item dropdown-item-ct " >
                                <span className="mx-2">
                                    {IconUser(20)}
                                </span>

                                {props.claimUser?.name}
                            </a>
                            <div className="dropdown-divider" />
                            <a onClick={() => handleClick(context.signOutRedirect)} className="dropdown-item" data-toggle="modal" data-target="#logoutModal">

                                <span className="mx-2">
                                    {IconLogout(20)}
                                </span>
                                Đăng xuất
                                </a>
                        </div>
                    </li>
                </Fragment>
            )}


        </AuthContext.Consumer>
    }
    return (
        loading ?
            <li style={{ display: 'flex', alignItems: 'center' }}>
                <div className="spinner-border text-light" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </li>
            :
            renderContent()
    )
}


const mapStateToProps = state => {
    return {
        claimUser: state.claimUser.claimUser
    };
};


const mapDispatchToProps = { setClaimUser }
export default connect(mapStateToProps, mapDispatchToProps)(DropdownInfoUser)