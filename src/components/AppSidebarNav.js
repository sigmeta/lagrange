import { React, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { CNavGroup, CNavItem, CNavLink, CNav } from '@coreui/react'
import PropTypes from 'prop-types'

import { CBadge } from '@coreui/react'
import p from '../assets/ship.json'

export const AppSidebarNav2 = (props) => {
  AppSidebarNav2.propTypes = {
    handleClick: PropTypes.func,
  }
  return (
    <CNav className="flex-column">
      <CNavItem>
        <CNavLink href="javascript:void(0);" onClick={() => props.handleClick()}>
          {p[0].prototype_name}
        </CNavLink>
      </CNavItem>
    </CNav>
  )
}

export const AppSidebarNav = ({ items }) => {
  const location = useLocation()
  const navLink = (name, icon, badge) => {
    return (
      <>
        {icon && icon}
        {name && name}
        {badge && (
          <CBadge color={badge.color} className="ms-auto">
            {badge.text}
          </CBadge>
        )}
      </>
    )
  }

  const navItem = (item, index) => {
    const [activeKey, setActiveKey] = 1
    const { component, name, badge, icon, ...rest } = item
    const Component = component
    return (
      <Component>
        <CNavLink
          href="javascript:void(0);"
          active={activeKey === 1}
          onClick={() => setActiveKey(1)}
        >
          Home
        </CNavLink>
      </Component>
    )
  }
  const navGroup = (item, index) => {
    const { component, name, icon, to, ...rest } = item
    const Component = component
    return (
      <Component
        idx={String(index)}
        key={index}
        toggler={navLink(name, icon)}
        visible={location.pathname.startsWith(to)}
        {...rest}
      >
        {item.items?.map((item, index) =>
          item.items ? navGroup(item, index) : navItem(item, index),
        )}
      </Component>
    )
  }

  return (
    <React.Fragment>
      {items &&
        items.map((item, index) => (item.items ? navGroup(item, index) : navItem(item, index)))}
    </React.Fragment>
  )
}

AppSidebarNav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
}
