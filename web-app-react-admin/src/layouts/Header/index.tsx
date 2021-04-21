import React from 'react';
import DropdownInfoUser from './component/dropDownInfoUser';
import Notifications from './component/notifications';
import Breadcrumb from '@/layouts/breadcrumbs/index'

interface ReduxProps {

}

interface Props extends ReduxProps { }

const Header = (props: Props) => {

  // const [dataMenu, SetMenu] = useState();
  // const [isLoading, SetLoading] = useState(true);

  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
      <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
        <i className="fa fa-bars" />
      </button>
      <Breadcrumb />
      <ul className="navbar-nav ml-auto">
        <Notifications />
        {/* <div className="topbar-divider d-none d-sm-block" /> */}
        {/* Nav Item - User Information */}
        <DropdownInfoUser />
      </ul>

    </nav >
  )

}

export default Header
