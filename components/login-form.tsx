"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginForm() {
  const [rollNumber, setRollNumber] = useState("")
  const [name, setName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("https://dynamic-form-generator-9rl7.onrender.com/create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rollNumber, name }),
      })

      if (!response.ok) {
        throw new Error("Login failed. Please try again.")
      }

      // Store roll number in session storage for later use
      sessionStorage.setItem("rollNumber", rollNumber)
      sessionStorage.setItem("name", name)

      // Navigate to form page
      router.push("/form")
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="rollNumber" className="block text-sm font-medium mb-1">
          Roll Number
        </label>
        <input
          id="rollNumber"
          type="text"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
          className="w-full p-2 border rounded-md"
          required
          data-testid="roll-number-input"
        />
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded-md"
          required
          data-testid="name-input"
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
        data-testid="login-button"
      >
        {isLoading ? "Logging in..." : "Login"}
      </button>
    </form>
  )
}
