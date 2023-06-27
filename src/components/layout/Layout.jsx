import PropTypes from "prop-types"
import React from "react"
import MainNavgation from "./MainNavgation"

const Layout = ({ children }) => {
  return (
    <>
      <MainNavgation />
      <main>{children}</main>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.any
}

export default Layout
