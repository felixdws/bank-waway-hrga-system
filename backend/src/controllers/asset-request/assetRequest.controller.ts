import { Request, Response } from "express"

import { prisma } from "../../config/prisma"

export const getAssetRequests = async (
  req: Request,
  res: Response
) => {
  try {
    const requests =
      await prisma.assetRequest.findMany({
        orderBy: {
          createdAt: "desc",
        },
      })

    return res.json({
      success: true,
      requests,
    })
  } catch (error) {
    console.log(error)

    return res.status(500).json({
      success: false,
      message:
        "Failed to get asset requests",
    })
  }
}

export const createAssetRequest = async (
  req: Request,
  res: Response
) => {
  try {
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
        },
      })

    await prisma.auditLog.create({
      data: {
        action: "CREATE_ASSET_REQUEST",
        actorId: employeeName,
        targetId: request.id,
      },
    })

    return res.status(201).json({
      success: true,
      request,
    })
  } catch (error) {
    console.log(error)

    return res.status(500).json({
      success: false,
      message:
        "Failed to create request",
    })
  }
}

export const approveAssetRequest = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params

    const request =
      await prisma.assetRequest.update({
        where: {
          id,
        },

        data: {
          status: "approved",
          approvedBy: "ADMIN",
        },
      })

    await prisma.auditLog.create({
      data: {
        action: "APPROVE_ASSET_REQUEST",
        actorId: "ADMIN",
        targetId: id,
      },
    })

    return res.json({
      success: true,
      request,
    })
  } catch (error) {
    console.log(error)

    return res.status(500).json({
      success: false,
      message:
        "Failed to approve request",
    })
  }
}