import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { apiUser } from '@/apis/index';
import { TreeItem } from '@/models/index';
import { BulletList } from '@/components/loaders/index'
import { Profile } from 'oidc-client';
import { IconChevronDown, IconChevronRight, IconGrid, IconHome, IconList } from '@/helpers/svg'
import history from '@/history';
import { PATH } from '@/constants/paths';
import { Collapse } from '@material-ui/core';
import { renderIconSlideBar } from '@/helpers/utils';

interface props {
  isAuthentication: boolean,
  claimUser: Profile,
}

function SideNav(props: props) {

  const [dataMenu, SetMenu] = useState<Array<TreeItem>>();
  const [isLoading, SetLoading] = useState(true);
  const [pathName, SetPathName] = useState<string>('');
  const [pathNameExpan, SetPathNameExpan] = useState<Array<string>>([]);
  const [pathUrl, SetPathUrl] = useState<string>('');
  let currentPath = history.location.pathname;

  useEffect(() => {
    async function getMenu() {
      await apiUser.getMenu().then((rsp) => {
        SetMenu(rsp.data)
        let index = rsp.data.findIndex(a => a.children.findIndex(x => x.item?.url == currentPath) > -1);
        if (index > -1) {
          SetPathUrl(currentPath)
          handleChangeExpan(rsp.data[index].item.url)
          SetPathName(rsp.data[index].item.url)
        }
        else SetPathName(currentPath)
        SetLoading(false)
      });
    }
    if (props.isAuthentication) {
      getMenu();
    }

  }, [props.isAuthentication])

  function handleChangeExpan(pathName: string) {
    if (pathNameExpan.includes(pathName)) {
      SetPathNameExpan([])
    } else SetPathNameExpan([pathName])
  }
  function handleChangeExpanActive(url, pathName, pathNameEX) {
    history.push(url);
    SetPathUrl(url)
    SetPathName(pathName);
    SetPathNameExpan([pathNameEX]);
  }

  function renderChildren(children: Array<TreeItem> | undefined, pathName: string) {
    if (children) {
      return <div className="bg-white collapse-inner rounded">
        {children.map((item, index) => {
          let classChild = `collapse-item ${item.item.url == pathUrl ? 'collapse-active-item' : ''}`
          return <a onClick={() => handleChangeExpanActive(item.item.url, '', pathName)} key={`children_${index}`} className={classChild}>{item.item.name}</a>
        })}
      </div>
    }
  }

  function renderMenu() {
    if (!dataMenu) return null;
    return dataMenu.map((item, index) => {
      let isExpan = pathNameExpan.includes(item.item.url) ? true : false;
      let calssActive = `nav_link nav-item cursor ${(isExpan ? 'active' : '')}`
      return <div key={`menu_${index}`}>
        <a onClick={() => handleChangeExpan(item.item.url)}
          className={calssActive}>
          {renderIconSlideBar(item.item.icon)}
          <span className="nav_name">{item.item.name}</span>
          <span className="ant-menu-submenu-expand-icon">
            {IconChevronRight(16)}
          </span>
          <span className="ant-menu-submenu-unexpand-icon">
            {IconChevronDown(16)}
          </span>
        </a>
        <Collapse in={isExpan}>
          <div className="collapse-box">
            {item.children?.length > 0 && renderChildren(item.children, item.item.url)}
          </div>
        </Collapse>

      </div>
    })
  }


  function renderContent() {
    let calssActive = `nav_link cursor ${(pathName == PATH.Dashboard ? 'active font-weight-bold' : '')}`
    if (isLoading) return <BulletList W={180} H={200} />
    else return <div className="nav_list">
      <a className={calssActive} onClick={() => handleChangeExpanActive(PATH.Dashboard, PATH.Dashboard, '')}>
        {IconGrid()}
        <span className="nav_name">Dashboard</span>
      </a>
      {renderMenu()}
    </div>
  }

  return (
    <div className="l-navbar" id="nav-bar">
      <nav className="nav nav-Sidebar ">
        <div className="sidebar">
          <a className="nav_logo-admin cursor" onClick={() => handleChangeExpanActive(PATH.Dashboard, PATH.Dashboard, '')}>
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
