import { PrismaClient }
  from "@prisma/client"

const prisma =
  new PrismaClient()

export default async function handler(
  req: any,
  res: any
) {

  try {

    /* ====================== */
    /* GET REQUESTS */
    /* ====================== */

    if (req.method === "GET") {

      const requests =
        await prisma.assetRequest.findMany({
          orderBy: {
            createdAt: "desc",
          },
        })

      return res.status(200).json({
        success: true,
        requests,
      })

    }

    /* ====================== */
    /* CREATE REQUEST */
    /* ====================== */

    if (req.method === "POST") {

      const {
        employeeName,
        assetName,
        quantity,
      } = req.body

      const request =
        await prisma.assetRequest.create({
          data: {
            employeeName,
            assetName,
            quantity,
            status: "pending",
          },
        })

      return res.status(201).json({
        success: true,
        request,
      })

    }

    /* ====================== */
    /* UPDATE REQUEST */
    /* ====================== */

    if (req.method === "PUT") {

      const {
        id,
        status,
      } = req.body

      const request =
        await prisma.assetRequest.update({
          where: {
            id,
          },
          data: {
            status,
          },
        })

      return res.status(200).json({
        success: true,
        request,
      })

    }

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