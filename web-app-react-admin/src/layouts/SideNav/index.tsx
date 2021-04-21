import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { apiUser } from '@/apis/index';
import { TreeItem } from '@/models/index';
import { BulletList } from '@/components/loaders/index'
import { Profile } from 'oidc-client';
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
      let collapseId = `collapse${index}`
      return <li key={`menu_${index}`} className="nav-item" >
        <a className="nav-link collapsed" data-toggle="collapse" data-target={`#${collapseId}`} aria-expanded="true" aria-controls={collapseId}>
          <i className="fas fa-fw fa-cog" />
          <span>{item.item.name}</span>
        </a>
        <div id={collapseId} className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
          {item.children?.length > 0 && renderChildren(item.children)}
        </div>
      </li >
    })
  }


  function renderContent() {
    if (isLoading) return <BulletList W={180} H={200} />
    else return <div>
      <li className="nav-item active" >
        <NavLink className="nav-link" to="/dashboard">
          <i className="fas fa-fw fa-tachometer-alt" />
          <span>Dashboard</span>
        </NavLink>
      </li>
      {renderMenu()}
    </div>
  }

  return (
    <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
      <NavLink className="sidebar-brand d-flex align-items-center justify-content-center" to="/">
        <div className="sidebar-brand-icon rotate-n-15">
          <i className="fas fa-laugh-wink" />
        </div>
        <div className="sidebar-brand-text mx-3">
          SB Admin <sup>2</sup>
        </div>
      </NavLink>
      {renderContent()}
    </ul >
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
