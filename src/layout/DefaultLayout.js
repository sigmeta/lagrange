import React from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import PropTypes from 'prop-types'

const DefaultLayout = (props) => {
  DefaultLayout.propTypes = {
    mssg: PropTypes.string,
    handleClick: PropTypes.func,
  }

  return (
    <div>
      <AppSidebar handleClick={props.handleClick} />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader mssg={props.mssg} />
        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
