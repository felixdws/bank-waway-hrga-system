interface Props {
  requests: any[]

  approveRequest: (
    id: string
  ) => void

  updateRequest: (
    id: string,
    data: any
  ) => void

  role?: string

  t: any
}

export default function RequestTable({
  requests,
  approveRequest,
  updateRequest,
  role,
  t,
}: Props) {
  return (
    <div className="card p-8 mb-10">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">

        <h2 className="text-2xl font-bold text-red-700">
          {t.assetRequest}
        </h2>

        <span className="text-sm text-gray-500">
          {t.total}: {requests.length}
        </span>

      </div>

      {/* EMPTY STATE */}
      {requests.length === 0 ? (

        <div className="text-center py-16 text-gray-500">
          {t.noRequests}
        </div>

      ) : (

        <div className="table-container overflow-x-auto">

          <table className="w-full">

            <thead className="table-head">

              <tr>

                <th className="text-left p-4 font-semibold">
                  {t.employee}
                </th>

                <th className="text-left p-4 font-semibold">
                  {t.asset}
                </th>

                <th className="text-left p-4 font-semibold">
                  {t.quantity}
                </th>

                <th className="text-left p-4 font-semibold">
                  {t.status}
                </th>

                <th className="text-left p-4 font-semibold">
                  {t.actions}
                </th>

              </tr>

            </thead>

            <tbody>

              {requests.map(
                (request: any) => (

                  <tr
                    key={request.id}
                    className="table-row"
                  >

                    {/* EMPLOYEE */}
                    <td className="p-4 font-medium">
                      {
                        request.employeeName
                      }
                    </td>

                    {/* ASSET */}
                    <td className="p-4">
                      {request.assetName}
                    </td>

                    {/* QUANTITY */}
                    <td className="p-4">
                      {request.quantity}
                    </td>

                    {/* STATUS */}
                    <td className="p-4">

                      <span
                        className={`px-4 py-2 rounded-full text-sm font-semibold ${
                          request.status ===
                          "approved"
                            ? "bg-green-100 text-green-700"
                            : request.status ===
                              "rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >

                        {request.status ===
                        "approved"
                          ? t.approved
                          : request.status ===
                            "rejected"
                          ? t.rejected
                          : t.pending}

                      </span>

                    </td>

                    {/* ACTIONS */}
                    <td className="p-4 flex gap-2">

                      {request.status ===
                      "pending" ? (

                        role === "admin" ? (

                          <>

                            {/* APPROVE */}
                            <button
                              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl transition duration-200 shadow-md"
                              onClick={() =>
                                approveRequest(
                                  request.id
                                )
                              }
                            >
                              {t.approve}
                            </button>

                          </>

                        ) : (

                          <span className="text-gray-400 text-sm font-medium">
                            {t.waitingAdmin}
                          </span>

                        )

                      ) : (

                        <span className="text-green-600 font-semibold">
                          {t.approved}
                        </span>

                      )}

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      )}

    </div>
  )
}