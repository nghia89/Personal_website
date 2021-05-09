import React, { Fragment, useState, useEffect, useContext } from 'react'
import { AuthContext } from '@/providers/authContext';
import { Profile } from '@/models/Profile';
import { connect } from 'react-redux';
import { setClaimUser } from '@/reducer/claimUser/User.thunks';

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

                    <li className="nav-item dropdown no-arrow">
                        <a className="nav-link dropdown-toggle" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                        >
                            <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                                {/* {props.user?.name} */}
                            </span>
                            <img
                                className="img-profile rounded-circle"
                                src="https://source.unsplash.com/QAB-WJcbgJk/60x60"
                            />
                        </a>
                        {/* Dropdown - User Information */}
                        <div
                            className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                            aria-labelledby="userDropdown"
                        >
                            <a className="dropdown-item" >
                                <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400" />
                                {props.claimUser?.name}
                            </a>
                            <a className="dropdown-item" ><i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400" />Settings</a>
                            <a className="dropdown-item" >
                                <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400" />
                                     Activity Log
                                     </a>
                            <div className="dropdown-divider" />
                            <a onClick={() => handleClick(context.signOutRedirect)} className="dropdown-item" data-toggle="modal" data-target="#logoutModal"
                            >
                                <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />Đăng xuất</a>
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