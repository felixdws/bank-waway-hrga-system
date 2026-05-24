import { PrismaClient }
  from "@prisma/client"

import { enableCors }
  from "../../lib/cors"

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
    /* GET ASSETS */
    /* ====================== */

    if (req.method === "GET") {

      const assets =
        await prisma.asset.findMany({
          orderBy: {
            createdAt: "desc",
          },
        })

      return res.status(200).json({
        success: true,
        assets,
      })

    }

    /* ====================== */
    /* CREATE ASSET */
    /* ====================== */

    if (req.method === "POST") {

      const {
        name,
        category,
        serialNumber,
        status,
        assignedTo,
      } = req.body

      const asset =
        await prisma.asset.create({
          data: {
            name,
            category,
            serialNumber,
            status,
            assignedTo,
          },
        })

      return res.status(201).json({
        success: true,
        asset,
      })

    }

    /* ====================== */
    /* METHOD NOT ALLOWED */
    /* ====================== */

    return res.status(405).json({
      success: false,
      message:
        "Method not allowed",
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