import { Router } from "express"

import {
  getEmployees,
  createEmployee, updateEmployee,
  deleteEmployee,
} from "../../controllers/employee/employee.controller"

import { authMiddleware } from "../../middlewares/auth.middleware"
import { rbacMiddleware } from "../../middlewares/rbac.middleware"

const router = Router()

router.get(
  "/",
  authMiddleware,
  rbacMiddleware("admin", "hr"),
  getEmployees
)

router.post(
  "/",
  authMiddleware,
  rbacMiddleware("admin", "hr"),
  createEmployee
)

router.put(
  "/:id",
  authMiddleware,
  rbacMiddleware("admin", "hr"),
  updateEmployee
)

router.delete(
  "/:id",
  authMiddleware,
  rbacMiddleware("admin"),
  deleteEmployee
)

export default router