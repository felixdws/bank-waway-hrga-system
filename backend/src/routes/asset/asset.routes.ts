import { Router } from "express"

import {
  getAssets,
  createAsset,
} from "../../controllers/asset/asset.controller"

import { authMiddleware } from "../../middlewares/auth.middleware"

const router = Router()

router.get(
  "/",
  authMiddleware,
  getAssets
)

router.post(
  "/",
  authMiddleware,
  createAsset
)

export default router