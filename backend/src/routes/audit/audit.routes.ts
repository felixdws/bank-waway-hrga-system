import { Router } from "express"

import { getAuditLogs } from "../../controllers/audit/audit.controller"

import { authMiddleware } from "../../middlewares/auth.middleware"

import { rbacMiddleware } from "../../middlewares/rbac.middleware"

const router = Router()

router.get(
  "/",
  authMiddleware,
  rbacMiddleware("admin"),
  getAuditLogs
)

export default router