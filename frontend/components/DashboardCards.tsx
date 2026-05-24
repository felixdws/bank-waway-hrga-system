import {
  Users,
  Shield,
  Package,
  ClipboardList,
  Activity,
} from "lucide-react"

interface Props {
  employees: any[]
  assets: any[]
  requests: any[]
  logs: any[]
  t: any
}

export default function DashboardCards({
  employees,
  assets,
  requests,
  logs,
  t,
}: Props) {
  return (

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6 mb-10">

      {/* EMPLOYEES */}
      <div className="card p-6 border-l-4 border-red-500">

        <div className="flex items-center justify-between">

          <div className="p-4 rounded-2xl bg-red-100 text-red-600">
            <Users size={28} />
          </div>

        </div>

        <p className="text-gray-500 mt-5">
          {t.employees}
        </p>

        <h2 className="text-4xl font-black mt-2 text-red-700">
          {employees.length}
        </h2>

      </div>

      {/* ADMINS */}
      <div className="card p-6 border-l-4 border-yellow-500">

        <div className="flex items-center justify-between">

          <div className="p-4 rounded-2xl bg-yellow-100 text-yellow-600">
            <Shield size={28} />
          </div>

        </div>

        <p className="text-gray-500 mt-5">
          {t.admin}
        </p>

        <h2 className="text-4xl font-black mt-2 text-yellow-600">
          {
            employees.filter(
              (e: any) =>
                e.role === "admin"
            ).length
          }
        </h2>

      </div>

      {/* ASSETS */}
      <div className="card p-6 border-l-4 border-blue-500">

        <div className="flex items-center justify-between">

          <div className="p-4 rounded-2xl bg-blue-100 text-blue-600">
            <Package size={28} />
          </div>

        </div>

        <p className="text-gray-500 mt-5">
          {t.assets}
        </p>

        <h2 className="text-4xl font-black mt-2 text-blue-700">
          {assets.length}
        </h2>

      </div>

      {/* REQUESTS */}
      <div className="card p-6 border-l-4 border-orange-500">

        <div className="flex items-center justify-between">

          <div className="p-4 rounded-2xl bg-orange-100 text-orange-600">
            <ClipboardList size={28} />
          </div>

        </div>

        <p className="text-gray-500 mt-5">
          {t.requests}
        </p>

        <h2 className="text-4xl font-black mt-2 text-orange-600">
          {requests.length}
        </h2>

      </div>

      {/* LOGS */}
      <div className="card p-6 border-l-4 border-green-500">

        <div className="flex items-center justify-between">

          <div className="p-4 rounded-2xl bg-green-100 text-green-600">
            <Activity size={28} />
          </div>

        </div>

        <p className="text-gray-500 mt-5">
          {t.logs}
        </p>

        <h2 className="text-4xl font-black mt-2 text-green-700">
          {logs.length}
        </h2>

      </div>

    </div>

  )
}