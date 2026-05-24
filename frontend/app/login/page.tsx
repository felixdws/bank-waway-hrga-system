"use client"

import { useState } from "react"
import axios from "axios"
import Cookies from "js-cookie"

import { toast } from "sonner"

import {
  Mail,
  Lock,
} from "lucide-react"

export default function LoginPage() {

  const [email, setEmail] =
    useState("")

  const [password, setPassword] =
    useState("")

  const [loading, setLoading] =
    useState(false)

  const handleLogin = async () => {

    try {

      setLoading(true)

      const response =
        await axios.post(
  `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
          {
            email,
            password,
          },
          {
            withCredentials: true,
          }
        )

      // SUCCESS TOAST
      toast.success(
        "Login successful"
      )

      // SAVE TOKEN
      Cookies.set(
        "token",
        response.data.token
      )

      // SAVE ROLE
      Cookies.set(
        "role",
        response.data.user.role
      )

      // OPTIONAL SAVE USER
      Cookies.set(
        "user",
        JSON.stringify(
          response.data.user
        )
      )

      setTimeout(() => {

        window.location.href =
          "/dashboard"

      }, 1200)

    } catch (error) {

      console.log(error)

      toast.error(
        "Invalid email or password"
      )

    } finally {

      setLoading(false)

    }
  }

  return (

    <div suppressHydrationWarning className="min-h-screen flex items-center justify-center bg-[#fff7ed] px-6">

      {/* LOGIN CARD */}
      <div className="w-full max-w-md bg-white border border-red-100 rounded-[32px] shadow-2xl p-10">

        {/* LOGO */}
        <div className="flex justify-center mb-8">

          <img
            src="/logo.png"
            alt="Logo"
            className="w-28 h-28 object-contain"
          />

        </div>

        {/* HEADER */}
        <div className="text-center mb-10">

          <h1 className="text-4xl font-black tracking-tight text-red-700">
            Welcome Back
          </h1>

          <p className="text-gray-500 mt-3 leading-relaxed">
            Sign in to access the Bank Waway
            HRGA Management Dashboard
          </p>

        </div>

        {/* FORM */}
        <div className="space-y-5">

          {/* EMAIL */}
          <div>

            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>

            <div className="relative">

              <Mail
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                className="w-full border border-gray-200 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
              />

            </div>

          </div>

          {/* PASSWORD */}
          <div>

            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>

            <div className="relative">

              <Lock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                className="w-full border border-gray-200 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
              />

            </div>

          </div>

          {/* LOGIN BUTTON */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full mt-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white py-4 rounded-2xl font-semibold tracking-wide shadow-lg transition-all duration-200 disabled:opacity-70"
          >

            {loading
              ? "Signing In..."
              : "Sign In"}

          </button>

        </div>

      </div>

    </div>

  )
}