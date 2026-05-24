import jwt from "jsonwebtoken"

import { enableCors }
  from "../lib/cors"

export default async function handler(
  req: any,
  res: any
) {

  /* ====================== */
  /* ENABLE CORS */
  /* ====================== */

  if (
    enableCors(req, res)
  ) return

  try {

    /* ====================== */
    /* METHOD CHECK */
    /* ====================== */

    if (req.method !== "GET") {

      return res.status(405).json({
        success: false,
        message:
          "Method not allowed",
      })

    }

    /* ====================== */
    /* AUTH HEADER */
    /* ====================== */

    const authHeader =
      req.headers.authorization

    if (!authHeader) {

      return res.status(401).json({
        success: false,
        message:
          "Unauthorized",
      })

    }

    /* ====================== */
    /* TOKEN */
    /* ====================== */

    const token =
      authHeader.split(" ")[1]

    if (!token) {

      return res.status(401).json({
        success: false,
        message:
          "Token missing",
      })

    }

    /* ====================== */
    /* VERIFY TOKEN */
    /* ====================== */

    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET!
      )

    /* ====================== */
    /* SUCCESS */
    /* ====================== */

    return res.status(200).json({
      success: true,
      user: decoded,
    })

  } catch (error) {

    console.log(error)

    return res.status(401).json({
      success: false,
      message:
        "Invalid token",
    })

  }

}