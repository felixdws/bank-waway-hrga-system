import { PrismaClient }
  from "@prisma/client"

import { enableCors }
  from "../../../lib/cors"

const prisma =
  new PrismaClient()

export default async function handler(
  req: any,
  res: any
) {

  /* ====================== */
  /* ENABLE CORS */
  /* ====================== */

  if (
    enableCors(req, res)
  ) return

  try {

    /* ====================== */
    /* METHOD CHECK */
    /* ====================== */

    if (req.method !== "PUT") {

      return res.status(405).json({
        success: false,
        message:
          "Method not allowed",
      })

    }

    /* ====================== */
    /* GET ID */
    /* ====================== */

    const { id } =
      req.query

    /* ====================== */
    /* UPDATE REQUEST */
    /* ====================== */

    const request =
      await prisma.assetRequest.update({
        where: {
          id: String(id),
        },
        data: {
          status: "approved",
        },
      })

    /* ====================== */
    /* SUCCESS */
    /* ====================== */

    return res.status(200).json({
      success: true,
      request,
    })

  } catch (error) {

    console.log(error)

    return res.status(500).json({
      success: false,
      message:
        "Internal server error",
    })

  }

}