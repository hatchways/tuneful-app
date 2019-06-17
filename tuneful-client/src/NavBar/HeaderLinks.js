import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import MaterialIcon from '../icons/material-icon'

const HeaderTopLinks = () => {


  return (
    <Fragment>
      <NavLink
        to="/notifications"
        activeClassName="ha_active"
        className="notification"
      >
        <span className="notification_span nav_icon">
          <MaterialIcon icon="notifications_none" />
        </span>
        <span className="links_span">Notifications</span>
      </NavLink>

      <NavLink
        to={`/profile`}
        activeClassName="ha_active"
        className="sp"
      >
        <span className="sp_span">{username}</span>
      </NavLink>
    </Fragment>
  )
}

export default HeaderTopLinks