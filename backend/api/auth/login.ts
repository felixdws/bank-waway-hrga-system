import { PrismaClient }
  from "@prisma/client"

import bcrypt from "bcrypt"

import jwt from "jsonwebtoken"

import { enableCors }
  from "../../lib/cors"

const prisma =
  new PrismaClient()

export default async function handler(
  req: any,
  res: any
) {

  /* ========================= */
  /* ENABLE CORS */
  /* ========================= */

  if (
    enableCors(req, res)
  ) return

  try {

    /* ========================= */
    /* METHOD CHECK */
    /* ========================= */

    if (req.method !== "POST") {

      return res.status(405).json({
        success: false,
        message:
          "Method not allowed",
      })

    }

    /* ========================= */
    /* BODY */
    /* ========================= */

    const {
      email,
      password,
    } = req.body

    /* ========================= */
    /* FIND USER */
    /* ========================= */

    const user =
      await prisma.employee.findFirst({
        where: {
          email,
        },
      })

    if (!user) {

      return res.status(401).json({
        success: false,
        message:
          "User not found",
      })

    }

    /* ========================= */
    /* PASSWORD CHECK */
    /* ========================= */

    const validPassword =
      await bcrypt.compare(
        password,
        user.password
      )

    if (!validPassword) {

      return res.status(401).json({
        success: false,
        message:
          "Invalid password",
      })

    }

    /* ========================= */
    /* TOKEN */
    /* ========================= */

    const token =
      jwt.sign(
        {
          id: user.id,
          role: user.role,
        },
        process.env.JWT_SECRET!,
        {
          expiresIn: "7d",
        }
      )

    /* ========================= */
    /* SUCCESS */
    /* ========================= */

    return res.status(200).json({
      success: true,
      token,
      user,
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