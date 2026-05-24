import jwt from "jsonwebtoken"

export default async function handler(
  req: any,
  res: any
) {

  try {

    const authHeader =
      req.headers.authorization

    if (!authHeader) {

      return res.status(401).json({
        success: false,
        message:
          "Unauthorized",
      })

    }

    const token =
      authHeader.split(" ")[1]

    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET!
      )

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