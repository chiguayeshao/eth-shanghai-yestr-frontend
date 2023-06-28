import PropTypes from "prop-types"
import React from "react"
import MainNavgation from "./MainNavgation"
import SideBar from "../sideBar/SideBar"

const Layout = ({ children }) => {
  return (
    <>
      <MainNavgation />
      <div className="container flex flex-row gap-12 mt-8">
        <div className="w-1/5">
          <SideBar />
        </div>
        <main className="w-4/5">{children}</main>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.any
}

export default Layout
