import { Search } from "lucide-react"
import { useState } from "react"

interface Props {
  employees: any[]
  search: string
  setSearch: any
  filterRole: string
  setFilterRole: any
  t: any
}

export default function EmployeeTable({
  employees,
  search,
  setSearch,
  filterRole,
  setFilterRole,
  t,
}: Props) {

  const [focused, setFocused] =
    useState(false)

  const filteredEmployees =
    employees.filter(
      (employee: any) => {

        const matchSearch =
          employee.name
            .toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          employee.email
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )

        const matchRole =
          filterRole === "all" ||
          employee.role ===
            filterRole

        return (
          matchSearch &&
          matchRole
        )
      }
    )

  return (

    <div className="card p-8 mb-10 overflow-visible">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">

        {/* TITLE */}
        <h2 className="text-2xl font-bold text-red-700">
          {t.employees}
        </h2>

        {/* RIGHT ACTIONS */}
        {/* RIGHT ACTIONS */}
<div className="flex items-center gap-4 relative">

  {/* SEARCH */}
  <div className="relative w-[58px] h-[58px] overflow-visible">

    <div
      className={`absolute right-0 top-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out z-20 ${
        focused
          ? "w-[420px]"
          : "w-[58px]"
      }`}
    >

      {/* SEARCH ICON */}
      <div
        className={`absolute left-0 top-0 h-full flex items-center justify-center pointer-events-none transition-all duration-300 ${
          focused
            ? "w-14"
            : "w-[58px]"
        }`}
      >

        <Search
          size={18}
          className={`transition-all duration-300 ${
            focused
              ? "text-red-500"
              : "text-gray-500"
          }`}
        />

      </div>

      {/* INPUT */}
      <input
        placeholder={
          t.searchEmployee
        }
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
        onFocus={() =>
          setFocused(true)
        }
        onBlur={() => {

          if (
            search.length === 0
          ) {
            setFocused(false)
          }

        }}
        className={`h-[58px] rounded-2xl border border-red-100 bg-white shadow-xl outline-none transition-all duration-300 text-gray-700 ${
          focused
            ? "w-full pl-14 pr-5"
            : "w-[58px] pl-14 pr-0 cursor-pointer"
        }`}
      />

    </div>

  </div>

  {/* FILTER */}
  <select
    value={filterRole}
    onChange={(e) =>
      setFilterRole(
        e.target.value
      )
    }
    className="input !w-[170px] flex-shrink-0 relative z-10"
  >

    <option value="all">
      {t.allRoles}
    </option>

    <option value="employee">
      {t.employee}
    </option>

    <option value="hr">
      {t.hr}
    </option>

    <option value="admin">
      {t.admin}
    </option>

  </select>

</div>

      </div>

      {/* TABLE */}
      <div className="table-container overflow-hidden">

        <table className="w-full">

          <thead className="table-head">

            <tr>

              <th className="text-left p-4">
                {t.employeeName}
              </th>

              <th className="text-left p-4">
                {t.email}
              </th>

              <th className="text-left p-4">
                {t.role}
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredEmployees.length >
            0 ? (

              filteredEmployees.map(
                (
                  employee: any
                ) => (

                  <tr
                    key={
                      employee.id
                    }
                    className="table-row"
                  >

                    {/* NAME */}
                    <td className="p-4 font-medium">
                      {
                        employee.name
                      }
                    </td>

                    {/* EMAIL */}
                    <td className="p-4 text-gray-600">
                      {
                        employee.email
                      }
                    </td>

                    {/* ROLE */}
                    <td className="p-4">

                      <span
                        className={`px-4 py-2 rounded-full text-sm font-semibold ${
                          employee.role ===
                          "admin"
                            ? "bg-red-100 text-red-700"
                            : employee.role ===
                              "hr"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >

                        {employee.role ===
                        "admin"
                          ? t.admin
                          : employee.role ===
                            "hr"
                          ? t.hr
                          : t.employee}

                      </span>

                    </td>

                  </tr>

                )
              )

            ) : (

              <tr>

                <td
                  colSpan={3}
                  className="text-center py-12 text-gray-400"
                >
                  {t.noEmployees}
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>

  )
}