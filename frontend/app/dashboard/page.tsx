"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import Cookies from "js-cookie"

import Sidebar from "@/components/Sidebar"
import DashboardCards from "@/components/DashboardCards"
import EmployeeTable from "@/components/EmployeeTable"
import AssetTable from "@/components/AssetTable"
import RequestTable from "@/components/RequestTable"

import { translations } from "@/app/constants/language"

export default function DashboardPage() {

  // =========================
  // LANGUAGE
  // =========================

  const [language, setLanguage] =
    useState<"en" | "id">("id")

  const t =
    translations[language]

  // =========================
  // STATES
  // =========================

  const [employees, setEmployees] =
    useState<any[]>([])

  const [logs, setLogs] =
    useState<any[]>([])

  const [assets, setAssets] =
    useState<any[]>([])

  const [requests, setRequests] =
    useState<any[]>([])

  // FIX HYDRATION
  const [currentRole, setCurrentRole] =
    useState("")

  const [name, setName] =
    useState("")

  const [email, setEmail] =
    useState("")

  const [password, setPassword] =
    useState("")

  const [role, setRole] =
    useState("employee")

  const [assetName, setAssetName] =
    useState("")

  const [assetCategory, setAssetCategory] =
    useState("")

  const [serialNumber, setSerialNumber] =
    useState("")

  const [assetStatus, setAssetStatus] =
    useState("active")

  const [assignedTo, setAssignedTo] =
    useState("")

  const [requestEmployee, setRequestEmployee] =
    useState("")

  const [requestAsset, setRequestAsset] =
    useState("")

  const [requestQuantity, setRequestQuantity] =
    useState(1)

  const [search, setSearch] =
    useState("")

  const [filterRole, setFilterRole] =
    useState("all")

  const [activeMenu, setActiveMenu] =
    useState("employees")

  // =========================
  // FETCH EMPLOYEES
  // =========================

  const fetchEmployees = async () => {
    try {

      const token =
        Cookies.get("token")

      const response =
        await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/employees`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        )

      setEmployees(
        response.data.employees
      )

    } catch (error) {
      console.log(error)
    }
  }

  // =========================
  // FETCH AUDIT LOGS
  // =========================

  const fetchAuditLogs = async () => {
    try {

      const token =
        Cookies.get("token")

      const response =
        await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/audit-logs`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        )

      setLogs(
        response.data.logs
      )

    } catch (error) {
      console.log(error)
    }
  }

  // =========================
  // FETCH ASSETS
  // =========================

  const fetchAssets = async () => {
    try {

      const token =
        Cookies.get("token")

      const response =
        await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/assets`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        )

      setAssets(
        response.data.assets
      )

    } catch (error) {
      console.log(error)
    }
  }

  // =========================
  // FETCH REQUESTS
  // =========================

  const fetchRequests = async () => {
    try {

      const token =
        Cookies.get("token")

      const response =
        await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/asset-requests`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        )

      setRequests(
        response.data.requests
      )

    } catch (error) {
      console.log(error)
    }
  }

  // =========================
  // CREATE EMPLOYEE
  // =========================

  const createEmployee = async () => {
    try {

      const token =
        Cookies.get("token")

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/employees`,
        {
          name,
          email,
          password,
          role,
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      )

      setName("")
      setEmail("")
      setPassword("")
      setRole("employee")

      fetchEmployees()
      fetchAuditLogs()

    } catch (error) {
      console.log(error)
    }
  }

  // =========================
  // CREATE ASSET
  // =========================

  const createAsset = async () => {
    try {

      const token =
        Cookies.get("token")

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/assets`,
        {
          name: assetName,
          category: assetCategory,
          serialNumber,
          status: assetStatus,
          assignedTo,
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      )

      setAssetName("")
      setAssetCategory("")
      setSerialNumber("")
      setAssetStatus("active")
      setAssignedTo("")

      fetchAssets()
      fetchAuditLogs()

    } catch (error) {
      console.log(error)
    }
  }

  // =========================
  // CREATE REQUEST
  // =========================

  const createRequest = async () => {
    try {

      const token =
        Cookies.get("token")

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/asset-requests`,
        {
          employeeName:
            requestEmployee,
          assetName:
            requestAsset,
          quantity:
            requestQuantity,
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      )

      setRequestEmployee("")
      setRequestAsset("")
      setRequestQuantity(1)

      fetchRequests()
      fetchAuditLogs()

    } catch (error) {
      console.log(error)
    }
  }

  // =========================
  // APPROVE REQUEST
  // =========================

  const approveRequest = async (
    id: string
  ) => {
    try {

      const token =
        Cookies.get("token")

      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/asset-requests/${id}/approve`,
        {},
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      )

      fetchRequests()
      fetchAuditLogs()

    } catch (error) {
      console.log(error)
    }
  }

  // =========================
  // UPDATE REQUEST
  // =========================

  const updateRequest = async (
    id: string,
    data: any
  ) => {
    try {

      const token =
        Cookies.get("token")

            await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/asset-requests`,
        {
          id,
          ...data,
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      )

      fetchRequests()
      fetchAuditLogs()

    } catch (error) {
      console.log(error)
    }
  }

  // =========================
  // INIT
  // =========================

  useEffect(() => {

    const role =
      Cookies.get("role")

    const savedLanguage =
      Cookies.get("language")

    if (role) {
      setCurrentRole(role)
    }

    if (
      savedLanguage === "id" ||
      savedLanguage === "en"
    ) {
      setLanguage(savedLanguage)
    }

    fetchEmployees()
    fetchAuditLogs()
    fetchAssets()
    fetchRequests()

  }, [])

  // =========================
  // CHANGE LANGUAGE
  // =========================

  const changeLanguage = (
    lang: "id" | "en"
  ) => {

    setLanguage(lang)

    Cookies.set(
      "language",
      lang
    )
  }

  // =========================
  // UI
  // =========================

  return (
    <div className="min-h-screen bg-[#f5f7fa]">

      <div className="flex">

        <Sidebar
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
          role={currentRole}
          t={t}
        />

        <main className="flex-1 p-10">

          {/* HEADER */}
          <div className="flex items-center justify-between mb-10">

            <div>

              <h1 className="page-title">
                {t.dashboard}
              </h1>

              <p className="page-subtitle mt-2">
                Enterprise Management System
              </p>

            </div>

            {/* LANGUAGE SWITCH */}
            <div className="flex items-center gap-2">

              <button
                onClick={() =>
                  changeLanguage("id")
                }
                className={`px-4 py-2 rounded-xl border transition ${
                  language === "id"
                    ? "bg-red-700 text-white border-red-700"
                    : "bg-white"
                }`}
              >
                ID
              </button>

              <button
                onClick={() =>
                  changeLanguage("en")
                }
                className={`px-4 py-2 rounded-xl border transition ${
                  language === "en"
                    ? "bg-red-700 text-white border-red-700"
                    : "bg-white"
                }`}
              >
                EN
              </button>

            </div>

          </div>

          {(currentRole === "admin" ||
            currentRole === "hr") &&
            activeMenu === "employees" && (
              <>
                <DashboardCards
  employees={employees}
  assets={assets}
  requests={requests}
  logs={logs}
  t={t}
/>

                <div className="grid grid-cols-2 gap-6 mb-10">

                  {currentRole === "admin" && (
                    <div className="card p-6">

                      <h2 className="text-2xl font-bold mb-6 text-red-700">
                        {t.createEmployee}
                      </h2>

                      <div className="space-y-4">

                        <input
                          className="input"
                          placeholder="Name"
                          value={name}
                          onChange={(e) =>
                            setName(e.target.value)
                          }
                        />

                        <input
                          className="input"
                          placeholder={t.email}
                          value={email}
                          onChange={(e) =>
                            setEmail(e.target.value)
                          }
                        />

                        <input
                          type="password"
                          className="input"
                          placeholder={t.password}
                          value={password}
                          onChange={(e) =>
                            setPassword(
                              e.target.value
                            )
                          }
                        />

                        <select
                          className="input"
                          value={role}
                          onChange={(e) =>
                            setRole(e.target.value)
                          }
                        >
                          <option value="employee">
                            Employee
                          </option>

                          <option value="hr">
                            HR
                          </option>

                          <option value="admin">
                            Admin
                          </option>
                        </select>

                        <button
                          className="button-primary w-full"
                          onClick={
                            createEmployee
                          }
                        >
                          {t.createEmployee}
                        </button>

                      </div>

                    </div>
                  )}

                  <EmployeeTable
                    employees={employees}
                    search={search}
                    setSearch={setSearch}
                    filterRole={filterRole}
                    setFilterRole={setFilterRole}
                    t={t}
                  />

                </div>
              </>
            )}

          {(currentRole === "admin" ||
            currentRole === "hr") &&
            activeMenu === "assets" && (
              <>
                <div className="grid grid-cols-3 gap-6 mb-10">

                  <div className="card p-6">

                    <h2 className="text-gray-500">
                      Total Assets
                    </h2>

                    <p className="text-4xl font-black mt-3 text-red-700">
                      {assets.length}
                    </p>

                  </div>

                </div>

                {currentRole === "admin" && (
                  <div className="card p-6 mb-10">

                    <h2 className="text-2xl font-bold mb-6 text-red-700">
                      {t.createAsset}
                    </h2>

                    <div className="space-y-4">

                      <input
                        className="input"
                        placeholder="Asset Name"
                        value={assetName}
                        onChange={(e) =>
                          setAssetName(
                            e.target.value
                          )
                        }
                      />

                      <input
                        className="input"
                        placeholder="Category"
                        value={assetCategory}
                        onChange={(e) =>
                          setAssetCategory(
                            e.target.value
                          )
                        }
                      />

                      <input
                        className="input"
                        placeholder="Serial Number"
                        value={serialNumber}
                        onChange={(e) =>
                          setSerialNumber(
                            e.target.value
                          )
                        }
                      />

                      <input
                        className="input"
                        placeholder="Assigned To"
                        value={assignedTo}
                        onChange={(e) =>
                          setAssignedTo(
                            e.target.value
                          )
                        }
                      />

                      <button
                        className="button-primary w-full"
                        onClick={createAsset}
                      >
                        {t.createAsset}
                      </button>

                    </div>

                  </div>
                )}

                <AssetTable
  assets={assets}
  t={t}
/>
              </>
            )}

          {activeMenu === "requests" && (
            <>
              <div className="grid grid-cols-2 gap-6 mb-10">

                <div className="card p-6">

                  <h2 className="text-gray-500">
                    Pending Requests
                  </h2>

                  <p className="text-4xl font-black mt-3 text-yellow-600">
                    {
                      requests.filter(
                        (r: any) =>
                          r.status ===
                          "pending"
                      ).length
                    }
                  </p>

                </div>

                <div className="card p-6">

                  <h2 className="text-gray-500">
                    Approved Requests
                  </h2>

                  <p className="text-4xl font-black mt-3 text-green-600">
                    {
                      requests.filter(
                        (r: any) =>
                          r.status ===
                          "approved"
                      ).length
                    }
                  </p>

                </div>

              </div>

              <div className="card p-6 mb-10">

                <h2 className="text-2xl font-bold mb-6 text-red-700">
                  Request Asset
                </h2>

                <div className="grid grid-cols-3 gap-4">

                  <input
                    className="input"
                    placeholder="Employee Name"
                    value={requestEmployee}
                    onChange={(e) =>
                      setRequestEmployee(
                        e.target.value
                      )
                    }
                  />

                  <input
                    className="input"
                    placeholder="Asset Name"
                    value={requestAsset}
                    onChange={(e) =>
                      setRequestAsset(
                        e.target.value
                      )
                    }
                  />

                  <input
                    type="number"
                    className="input"
                    placeholder="Quantity"
                    value={requestQuantity}
                    onChange={(e) =>
                      setRequestQuantity(
                        Number(e.target.value)
                      )
                    }
                  />

                </div>

                <button
                  className="button-primary mt-5"
                  onClick={createRequest}
                >
                  Create Request
                </button>

              </div>

              <RequestTable
                requests={requests}
                approveRequest={
                  approveRequest
                }
                updateRequest={
                  updateRequest
                }
                role={currentRole}
                t={t}
              />
            </>
          )}

          {currentRole === "admin" &&
            activeMenu === "logs" && (
              <>
                <div className="card p-6 mb-10">

                  <h2 className="text-gray-500">
                    Total Audit Logs
                  </h2>

                  <p className="text-4xl font-black mt-3 text-red-700">
                    {logs.length}
                  </p>

                </div>

                <div className="table-container p-6">

                  <h2 className="text-2xl font-bold mb-6 text-red-700">
                    {t.auditLogs}
                  </h2>

                  <table className="w-full">

                    <thead className="table-head">

                      <tr>

                        <th className="text-left p-4">
                          Action
                        </th>

                        <th className="text-left p-4">
                          Actor
                        </th>

                        <th className="text-left p-4">
                          Target ID
                        </th>

                        <th className="text-left p-4">
                          Time
                        </th>

                      </tr>

                    </thead>

                    <tbody>

                      {logs.map(
                        (log: any) => (
                          <tr
                            key={log.id}
                            className="table-row"
                          >

                            <td className="p-4 font-semibold">
                              {log.action}
                            </td>

                            <td className="p-4">
                              {log.actorId}
                            </td>

                            <td className="p-4">
                              {log.targetId}
                            </td>

                            <td className="p-4">
                              {new Date(
                                log.createdAt
                              ).toLocaleString()}
                            </td>

                          </tr>
                        )
                      )}

                    </tbody>

                  </table>

                </div>
              </>
            )}

        </main>

      </div>

    </div>
  )
}