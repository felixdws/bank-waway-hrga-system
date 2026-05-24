import { PrismaClient }
  from "@prisma/client"

import bcrypt from "bcrypt"

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

      /* ====================== */
      /* CHECK EXISTING EMAIL */
      /* ====================== */

      const existingUser =
        await prisma.employee.findFirst({
          where: {
            email,
          },
        })

      if (existingUser) {

        return res.status(400).json({
          success: false,
          message:
            "Email already exists",
        })

      }

      /* ====================== */
      /* HASH PASSWORD */
      /* ====================== */

      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        )

      /* ====================== */
      /* CREATE EMPLOYEE */
      /* ====================== */

      const employee =
        await prisma.employee.create({
          data: {
            name,
            email,
            password:
              hashedPassword,
            role,
          },
        })

      return res.status(201).json({
        success: true,
        employee,
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