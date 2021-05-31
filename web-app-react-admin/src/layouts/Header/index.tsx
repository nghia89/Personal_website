import React from 'react';
import DropdownInfoUser from './component/dropDownInfoUser';
import Notifications from './component/notifications';
import Breadcrumb from '@/layouts/breadcrumbs/index'
import { IconClose, IconMenu } from '@/helpers/svg'
interface ReduxProps {

}

interface Props extends ReduxProps { }

const Header = (props: Props) => {

  // const [dataMenu, SetMenu] = useState();
  // const [isLoading, SetLoading] = useState(true);

  return (
    <header className="header" id="header">
      <div className="header_toggle d-flex align-items-center">
        <div className="ms-1" >
          <i className='' id="header-toggle">
            <span className='bx-menu-show01'>
              {IconClose()}
            </span>
            <span className='bx-menu-show02'>
              {IconMenu()}
            </span>
          </i>
        </div>
        <Breadcrumb />
      </div>
      <div className="header_img">
        <ul className="navbar-nav ml-auto">
          <Notifications />
          <DropdownInfoUser />
        </ul>
      </div>
    </header>
  )

}

export default Header
