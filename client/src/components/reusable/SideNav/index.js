import React from "react";
import { sideNavConfig, sideNavIconsConfig } from "../../../utils/configs";

import './index.css'


export default function SideNav(props) {
  console.log('SideNav props ', props)
  const handleNavItemClick = (navObj) => {
    console.log('handleNavItemClick::navObj = ', navObj)

    const { history } = props
    history.push(navObj.path)
  }

  return (
    <div className="side-navs">
      <ul className="side-navs-ul">
        {
          sideNavConfig.map(
            (navItem) => navItem.isRenderInSidenav !== false ? (
              <li
                className="nav-item"
                onClick={handleNavItemClick.bind(null, navItem)}
                key={navItem.label}
              >
                <i className={`fa ${sideNavIconsConfig[navItem.label]}`} aria-hidden="true"></i>
              </li>
            ) : null
          )
        }
      </ul>
    </div>
  )
}
