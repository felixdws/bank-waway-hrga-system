import { Router } from "express"

import {
  getAssetRequests,
  createAssetRequest,
  approveAssetRequest,
} from "../../controllers/asset-request/assetRequest.controller"

import { authMiddleware } from "../../middlewares/auth.middleware"

const router = Router()

router.get(
  "/",
  authMiddleware,
  getAssetRequests
)

router.post(
  "/",
  authMiddleware,
  createAssetRequest
)

router.put(
  "/:id/approve",
  authMiddleware,
  approveAssetRequest
)

export default router