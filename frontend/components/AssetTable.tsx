interface Props {
  assets: any[]
  t: any
}

export default function AssetTable({
  assets,
  t,
}: Props) {
  return (
    <div className="card p-8 mb-10">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">

        <h2 className="text-2xl font-bold text-red-700">
          {t.assetInventory}
        </h2>

        <span className="text-sm text-gray-500">
          {t.total}: {assets.length}
        </span>

      </div>

      {/* TABLE */}
      <div className="table-container">

        <table className="w-full">

          <thead className="table-head">

            <tr>

              <th className="text-left p-4">
                {t.asset}
              </th>

              <th className="text-left p-4">
                {t.category}
              </th>

              <th className="text-left p-4">
                {t.serialNumber}
              </th>

              <th className="text-left p-4">
                {t.status}
              </th>

              <th className="text-left p-4">
                {t.assignedTo}
              </th>

            </tr>

          </thead>

          <tbody>

            {assets.map(
              (asset: any) => (

                <tr
                  key={asset.id}
                  className="table-row"
                >

                  {/* ASSET */}
                  <td className="p-4 font-medium">
                    {asset.name}
                  </td>

                  {/* CATEGORY */}
                  <td className="p-4">
                    {asset.category}
                  </td>

                  {/* SERIAL */}
                  <td className="p-4 font-mono text-sm text-gray-600">
                    {asset.serialNumber}
                  </td>

                  {/* STATUS */}
                  <td className="p-4">

                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold ${
                        asset.status ===
                        "active"
                          ? "bg-green-100 text-green-700"
                          : asset.status ===
                            "maintenance"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >

                      {asset.status ===
                      "active"
                        ? t.active
                        : asset.status ===
                          "maintenance"
                        ? t.maintenance
                        : t.unavailable}

                    </span>

                  </td>

                  {/* ASSIGNED */}
                  <td className="p-4">

                    {asset.assignedTo ? (

                      <span className="text-gray-700 font-medium">
                        {asset.assignedTo}
                      </span>

                    ) : (

                      <span className="text-gray-400 italic">
                        {t.unassigned}
                      </span>

                    )}

                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  )
}