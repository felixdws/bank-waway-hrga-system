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
    /* GET EMPLOYEES */
    /* ====================== */

    if (req.method === "GET") {

      const employees =
        await prisma.employee.findMany({
          orderBy: {
            createdAt: "desc",
          },
        })

      return res.status(200).json({
        success: true,
        employees,
      })

    }

    /* ====================== */
    /* CREATE EMPLOYEE */
    /* ====================== */

    if (req.method === "POST") {

      const {
        name,
        email,
        password,
        role,
      } = req.body

      const employee =
        await prisma.employee.create({
          data: {
            name,
            email,
            password,
            role,
          },
        })

      return res.status(201).json({
        success: true,
        employee,
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