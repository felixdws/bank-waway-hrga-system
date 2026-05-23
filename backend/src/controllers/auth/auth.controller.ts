import { Request, Response } from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { prisma } from "../../config/prisma"

export const register = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      name,
      email,
      password,
    } = req.body

    const existingUser =
      await prisma.employee.findUnique({
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

    const hashedPassword =
      await bcrypt.hash(password, 10)

    const user =
      await prisma.employee.create({
        data: {
          name,
          email,
          password:
            hashedPassword,
        },
      })

    return res.status(201).json({
      success: true,
      user,
    })
  } catch (error) {
    console.log(error)

    return res.status(500).json({
      success: false,
      message:
        "Register failed",
      error,
    })
  }
}

export const login = async (
  req: Request,
  res: Response
) => {
  try {
    const { email, password } =
      req.body

    const user =
      await prisma.employee.findUnique({
        where: {
          email,
        },
      })

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      })
    }

    const isPasswordValid =
      await bcrypt.compare(
        password,
        user.password
      )

    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid password",
      })
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env
        .JWT_SECRET as string,
      {
        expiresIn: "1d",
      }
    )

    // COOKIE FIX
    res.cookie("token", token, {
      httpOnly: false,
      secure: false,
      sameSite: "lax",
    })

    res.cookie("role", user.role, {
      httpOnly: false,
      secure: false,
      sameSite: "lax",
    })

    return res.status(200).json({
      success: true,
      token,
      user,
    })
  } catch (error) {
    console.log(error)

    return res.status(500).json({
      success: false,
      message: "Login failed",
    })
  }
}