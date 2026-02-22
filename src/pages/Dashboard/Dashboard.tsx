import React from "react"
import { Outlet } from "react-router-dom"

const Dashboard = () => {
  return (
    <div className="drawer lg:drawer-open min-h-screen">

      {/* Toggle input */}
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* Contenu principal */}
      <div className="drawer-content flex flex-col p-6">

        {/* Bouton mobile */}
        <label
          htmlFor="dashboard-drawer"
          className="btn btn-primary drawer-button lg:hidden w-fit"
        >
          Menu
        </label>

        {/* 👉 Ici ton contenu dynamique */}
        <div className="flex-1 mt-4">
          <Outlet />
        </div>

      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label
          htmlFor="dashboard-drawer"
          className="drawer-overlay"
        ></label>

        <ul className="menu bg-base-200 min-h-full w-60 w-max-80 p-4">
          <li><a>Dashboard</a></li>
          <li><a>Employees</a></li>
        </ul>
      </div>

    </div>
  )
}

export default Dashboard