import { Request, Response } from "express"
import { prisma } from "../../config/prisma"

export const getAuditLogs = async (
  req: Request,
  res: Response
) => {
  try {
    const logs = await prisma.auditLog.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })

    return res.json({
      success: true,
      logs,
    })
  } catch (error) {
    console.log(error)

    return res.status(500).json({
      success: false,
      message: "Failed to get logs",
    })
  }
}