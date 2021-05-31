import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { apiUser } from '@/apis/index';
import { TreeItem } from '@/models/index';
import { BulletList } from '@/components/loaders/index'
import { Profile } from 'oidc-client';
import { IconGrid, IconHome, IconList } from '@/helpers/svg'
import history from '@/history';
import { PATH } from '@/constants/paths';

interface props {
  isAuthentication: boolean,
  claimUser: Profile,
}

function SideNav(props: props) {

  const [dataMenu, SetMenu] = useState<Array<TreeItem>>();
  const [isLoading, SetLoading] = useState(true);

  useEffect(() => {
    async function getMenu() {
      await apiUser.getMenu().then((rsp) => {
        SetMenu(rsp)
        SetLoading(false)
      });
    }
    if (props.isAuthentication) {
      getMenu();
    }

  }, [props.isAuthentication])

  function renderChildren(children: Array<TreeItem> | undefined) {
    if (children) {
      return <div className="bg-white py-2 collapse-inner rounded">
        {children.map((item, index) => {
          return <NavLink key={`children_${index}`} className="collapse-item" to={item.item.url}>{item.item.name}</NavLink>
        })}
      </div>
    }
  }

  function renderMenu() {
    if (!dataMenu) return null;
    return dataMenu.map((item, index) => {
      let collapseId = `collapse${index}`;
      return <div key={`menu_${index}`}>
        <a className="nav_link nav-item" data-bs-toggle="collapse" href={`#${collapseId}`} role="button"
          aria-expanded="false" aria-controls={collapseId}>
          {IconList()}
          <span className="nav_name">{item.item.name}</span>
        </a>
        <div className="collapse collapse-box" id={collapseId}>
          {item.children?.length > 0 && renderChildren(item.children)}
        </div>
      </div>
    })
  }


  function renderContent() {
    if (isLoading) return <BulletList W={180} H={200} />
    else return <div className="nav_list">
      <NavLink className="nav_link" to="/dashboard">
        {IconGrid()}
        <span className="nav_name">Dashboard</span>
      </NavLink>
      {renderMenu()}
    </div>
  }

  return (
    <div className="l-navbar" id="nav-bar">
      <nav className="nav nav-Sidebar ">
        <div className="sidebar">
          <a className="nav_logo-admin" onClick={() => history.push(PATH.HOME)}>
            {IconHome()}
            <span className="nav_logo-name">ADMIN</span>
          </a>
          {renderContent()}
        </div>
      </nav>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    isAuthentication: state.claimUser.isAuthentication,
    claimUser: state.claimUser.claimUser
  };
};
const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(SideNav)
