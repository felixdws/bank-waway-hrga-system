import { Request, Response } from "express"

import { prisma } from "../../config/prisma"

export const getAssets = async (
  req: Request,
  res: Response
) => {
  try {
    const assets = await prisma.asset.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })

    return res.json({
      success: true,
      assets,
    })
  } catch (error) {
    console.log(error)

    return res.status(500).json({
      success: false,
      message: "Failed to get assets",
    })
  }
}

export const createAsset = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      name,
      category,
      serialNumber,
      status,
      assignedTo,
    } = req.body

    const asset = await prisma.asset.create({
      data: {
        name,
        category,
        serialNumber,
        status,
        assignedTo,
      },
    })

    await prisma.auditLog.create({
      data: {
        action: "CREATE_ASSET",
        actorId: "ADMIN",
        targetId: asset.id,
      },
    })

    return res.status(201).json({
      success: true,
      asset,
    })
  } catch (error) {
    console.log(error)

    return res.status(500).json({
      success: false,
      message: "Failed to create asset",
    })
  }
}