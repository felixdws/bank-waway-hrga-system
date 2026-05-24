import express from "express"
import cors from "cors"
import helmet from "helmet"
import cookieParser from "cookie-parser"
import morgan from "morgan"

import { limiter } from "./middlewares/rateLimit.middleware"
import { errorMiddleware } from "./middlewares/error.middleware"

import { prisma } from "./config/prisma"

import authRoutes from "./routes/auth/auth.routes"
import employeeRoutes from "./routes/employee/employee.routes"

import {
  authMiddleware,
  AuthRequest,
} from "./middlewares/auth.middleware"

import { rbacMiddleware } from "./middlewares/rbac.middleware"

import auditRoutes from "./routes/audit/audit.routes"

import assetRoutes from "./routes/asset/asset.routes"

import assetRequestRoutes from "./routes/asset-request/assetRequest.routes"

const app = express()

/* ========================= */
/* TRUST PROXY */
/* REQUIRED FOR VERCEL */
/* ========================= */

app.set("trust proxy", 1)

/* ========================= */
/* SECURITY */
/* ========================= */

app.use(helmet())

/* ========================= */
/* CORS */
/* ========================= */

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://your-frontend.vercel.app",
    ],
    credentials: true,
    methods: [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  })
)

/* ========================= */
/* MIDDLEWARES */
/* ========================= */

app.use(express.json())

app.use(cookieParser())

app.use(morgan("dev"))

if (
  process.env.NODE_ENV !==
  "production"
) {

  app.use(limiter)

}

/* ========================= */
/* ROUTES */
/* ========================= */

app.use("/api/auth", authRoutes)

app.use("/api/employees", employeeRoutes)

app.use("/api/audit-logs", auditRoutes)

app.use("/api/assets", assetRoutes)

app.use(
  "/api/asset-requests",
  assetRequestRoutes
)

/* ========================= */
/* ROOT */
/* ========================= */

app.get("/", (req, res) => {
  res.send("Bank Waway HRGA API Running")
})

/* ========================= */
/* TEST DATABASE */
/* ========================= */

app.get("/test-db", async (req, res) => {

  const employees =
    await prisma.employee.findMany()

  res.json(employees)

})

/* ========================= */
/* PROTECTED ROUTE */
/* ========================= */

app.get(
  "/protected",
  authMiddleware,
  async (
    req: AuthRequest,
    res
  ) => {

    return res.json({
      success: true,
      message:
        "Protected route accessed",
      user: req.user,
    })

  }
)

/* ========================= */
/* ADMIN ONLY */
/* ========================= */

app.get(
  "/admin-only",
  authMiddleware,
  rbacMiddleware("admin"),
  async (
    req: AuthRequest,
    res
  ) => {

    return res.json({
      success: true,
      message: "Welcome Admin",
    })

  }
)

/* ========================= */
/* ERROR HANDLER */
/* ========================= */

app.use(errorMiddleware)

export default app