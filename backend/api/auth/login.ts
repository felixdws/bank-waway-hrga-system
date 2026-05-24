import { PrismaClient }
  from "@prisma/client"

import bcrypt from "bcrypt"

import jwt from "jsonwebtoken"

const prisma =
  new PrismaClient()

export default async function handler(
  req: any,
  res: any
) {

     res.setHeader(
    "Access-Control-Allow-Origin",
    "*"
  )

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,DELETE,OPTIONS"
  )

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  )

  if (req.method === "OPTIONS") {

    return res.status(200).end()

  }


  try {

    if (req.method !== "POST") {

      return res.status(405).json({
        success: false,
        message:
          "Method not allowed",
      })

    }

    const {
      email,
      password,
    } = req.body

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