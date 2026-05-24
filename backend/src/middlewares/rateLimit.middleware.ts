import rateLimit, {
  ipKeyGenerator,
} from "express-rate-limit"

export const limiter =
  rateLimit({

    windowMs:
      15 * 60 * 1000,

    max: 100,

    standardHeaders: true,

    legacyHeaders: false,

    keyGenerator: (req) => {

      return ipKeyGenerator(
        req.ip || "unknown-ip"
      )

    },

    message: {
      success: false,
      message:
        "Too many requests",
    },

  })