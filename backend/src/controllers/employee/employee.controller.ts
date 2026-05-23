import { Request, Response } from "express"
import bcrypt from "bcrypt"

import { prisma } from "../../config/prisma"

export const getEmployees = async (
  req: Request,
  res: Response
) => {
  try {
    const employees = await prisma.employee.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return res.json({
      success: true,
      employees,
    })
  } catch (error) {
    console.log(error)

    return res.status(500).json({
      success: false,
      message: "Failed to get employees",
    })
  }
}

export const createEmployee = async (
  req: Request,
  res: Response
) => {
  try {
    const { name, email, password, role } =
      req.body

    const existingEmployee =
      await prisma.employee.findUnique({
        where: {
          email,
        },
      })

    if (existingEmployee) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      })
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    )

    const employee = await prisma.employee.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    })

    await prisma.auditLog.create({
      data: {
        action: "CREATE_EMPLOYEE",
        actorId: "ADMIN",
        targetId: employee.id,
      },
    })

    return res.status(201).json({
      success: true,
      employee,
    })
  } catch (error) {
    console.log(error)

    return res.status(500).json({
      success: false,
      message: "Failed to create employee",
    })
  }
}

export const updateEmployee = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params

    const { name, role } = req.body

    const employee = await prisma.employee.update({
      where: {
        id,
      },

      data: {
        name,
        role,
      },
    })

    await prisma.auditLog.create({
      data: {
        action: "UPDATE_EMPLOYEE",
        actorId: "ADMIN",
        targetId: id,
      },
    })

    return res.json({
      success: true,
      employee,
    })
  } catch (error) {
    console.log(error)

    return res.status(500).json({
      success: false,
      message: "Failed to update employee",
    })
  }
}

export const deleteEmployee = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params

    await prisma.auditLog.create({
      data: {
        action: "DELETE_EMPLOYEE",
        actorId: "ADMIN",
        targetId: id,
      },
    })

    await prisma.employee.delete({
      where: {
        id,
      },
    })

    return res.json({
      success: true,
      message: "Employee deleted",
    })
  } catch (error) {
    console.log(error)

    return res.status(500).json({
      success: false,
      message: "Failed to delete employee",
    })
  }
}