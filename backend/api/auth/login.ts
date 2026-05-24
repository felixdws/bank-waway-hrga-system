import { PrismaClient }
  from "@prisma/client"

const prisma =
  new PrismaClient()

export default async function handler(
  req: any,
  res: any
) {

  if (req.method !== "POST") {

    return res.status(405).json({
      success: false,
      message:
        "Method not allowed",
    })

  }

  const {
    email,
    password,
  } = req.body

  const user =
    await prisma.employee.findFirst({
      where: {
        email,
      },
    })

  if (!user) {

    return res.status(401).json({
      success: false,
      message:
        "Invalid credentials",
    })

  }

  return res.status(200).json({
    success: true,
    user,
  })

}