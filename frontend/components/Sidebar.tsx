"use client"

import Cookies from "js-cookie"

import {
  Users,
  Laptop,
  ClipboardList,
  Activity,
} from "lucide-react"

interface Props {
  activeMenu: string
  setActiveMenu: (
    value: string
  ) => void
  role?: string
  t: any
}

export default function Sidebar({
  activeMenu,
  setActiveMenu,
  role,
  t,
}: Props) {
  return (
    <aside className="w-72 sidebar-gradient text-white p-8 flex flex-col justify-between min-h-screen border-r border-red-900/30">

      <div>

        {/* ========================= */}
        {/* LOGO */}
        {/* ========================= */}

        <div className="mb-14 flex justify-center">

          <img
            src="/logo.png"
            alt="Logo"
            className="w-40 h-40 object-contain drop-shadow-2xl hover:scale-105 transition duration-300"
          />

        </div>

        {/* ========================= */}
        {/* NAVIGATION */}
        {/* ========================= */}

        <nav className="space-y-3">

          {/* ========================= */}
          {/* EMPLOYEES */}
          {/* admin & hr only */}
          {/* ========================= */}

          {(role === "admin" ||
            role === "hr") && (

            <button
              onClick={() =>
                setActiveMenu(
                  "employees"
                )
              }
              className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 ${
                activeMenu ===
                "employees"
                  ? "bg-gradient-to-r from-red-600 to-red-500 shadow-xl shadow-red-900/30"
                  : "hover:bg-red-900/30"
              }`}
            >

              <Users size={20} />

              <span className="font-medium">
                {t.employees}
              </span>

            </button>

          )}

          {/* ========================= */}
          {/* ASSETS */}
          {/* admin & hr only */}
          {/* ========================= */}

          {(role === "admin" ||
            role === "hr") && (

            <button
              onClick={() =>
                setActiveMenu("assets")
              }
              className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 ${
                activeMenu === "assets"
                  ? "bg-gradient-to-r from-red-600 to-red-500 shadow-xl shadow-red-900/30"
                  : "hover:bg-red-900/30"
              }`}
            >

              <Laptop size={20} />

              <span className="font-medium">
                {t.assets}
              </span>

            </button>

          )}

          {/* ========================= */}
          {/* REQUESTS */}
          {/* all roles */}
          {/* ========================= */}

          <button
            onClick={() =>
              setActiveMenu("requests")
            }
            className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 ${
              activeMenu === "requests"
                ? "bg-gradient-to-r from-red-600 to-red-500 shadow-xl shadow-red-900/30"
                : "hover:bg-red-900/30"
            }`}
          >

            <ClipboardList
              size={20}
            />

            <span className="font-medium">
              {t.requests}
            </span>

          </button>

          {/* ========================= */}
          {/* AUDIT LOGS */}
          {/* admin only */}
          {/* ========================= */}

          {role === "admin" && (

            <button
              onClick={() =>
                setActiveMenu("logs")
              }
              className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 ${
                activeMenu === "logs"
                  ? "bg-gradient-to-r from-red-600 to-red-500 shadow-xl shadow-red-900/30"
                  : "hover:bg-red-900/30"
              }`}
            >

              <Activity size={20} />

              <span className="font-medium">
                {t.auditLogs}
              </span>

            </button>

          )}

        </nav>

      </div>

      {/* ========================= */}
      {/* LOGOUT */}
      {/* ========================= */}

      <button
        onClick={() => {

          Cookies.remove("token")
          Cookies.remove("role")

          window.location.href =
            "/login"

        }}
        className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 transition-all duration-200 p-4 rounded-2xl font-semibold mt-10 shadow-xl shadow-red-900/30 hover:scale-[1.02]"
      >
        {t.logout}
      </button>

    </aside>
  )
}