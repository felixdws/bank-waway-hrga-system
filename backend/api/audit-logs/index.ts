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
    /* GET LOGS */
    /* ====================== */

    if (req.method === "GET") {

      const logs =
        await prisma.auditLog.findMany({
          orderBy: {
            createdAt: "desc",
          },
        })

      return res.status(200).json({
        success: true,
        logs,
      })

    }

    /* ====================== */
    /* CREATE LOG */
    /* ====================== */

    if (req.method === "POST") {

      const {
        action,
        actorId,
        targetId,
      } = req.body

      const log =
        await prisma.auditLog.create({
          data: {
            action,
            actorId,
            targetId,
          },
        })

      return res.status(201).json({
        success: true,
        log,
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