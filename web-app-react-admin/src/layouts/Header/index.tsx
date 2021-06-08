import React from 'react';
import DropdownAccountUser from './component/DropdownAccountUser';
import Notifications from './component/notifications';
import Breadcrumb from '@/layouts/breadcrumbs/index'
import { IconClose, IconMenu } from '@/helpers/svg'
interface ReduxProps {

}

interface Props extends ReduxProps { }

const Header = (props: Props) => {

  // const [dataMenu, SetMenu] = useState();
  // const [isLoading, SetLoading] = useState(true);

  function showNavbar(toggleId, navId, bodyId, headerId) {
    const toggle = document.getElementById(toggleId),
      nav = document.getElementById(navId),
      bodypd = document.getElementById(bodyId),
      headerpd = document.getElementById(headerId)

    // Validate that all variables exist
    if (toggle && nav && bodypd && headerpd) {
      nav.classList.toggle('show-slide-bar')
      // change icon
      toggle.classList.toggle('bx-menu-show')
      // add padding to body
      bodypd.classList.toggle('body-pd')
      // add padding to header
      headerpd.classList.toggle('body-pd')
    }
  }

  return (
    <header className="header align-items-center" id="header">
      <div className="row " style={{ display: 'contents' }}>
        <div className="col-sm-1">
          <div className="header_toggle d-flex align-items-center" onClick={() => showNavbar('header-toggle', 'nav-bar', 'body-pd', 'header')}>
            <div className="ms-1" style={{ marginTop: '-6px' }} >
              <i className='' id="header-toggle">
                <span className='bx-menu-show01'>
                  {IconClose()}
                </span>
                <span className='bx-menu-show02'>
                  {IconMenu()}
                </span>
              </i>
            </div>
          </div>
        </div>
        <div className="col-sm-11 justify-content-between align-items-center d-flex">
          <Breadcrumb />
          <div>
            <ul className="nav">
              <Notifications />
              <DropdownAccountUser />
            </ul>
          </div>
        </div>
      </div>
    </header>
  )

}

export default Header
