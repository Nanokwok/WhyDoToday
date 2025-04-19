"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Loader2, User, Lock } from "lucide-react"
import api from "../api"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/constants"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

function Form({ route, method }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [mounted, setMounted] = useState(false)
  const navigate = useNavigate()

  const isLogin = method === "login"
  const title = isLogin ? "Login" : "Register"
  const description = isLogin
    ? "Enter your credentials to access your account"
    : "Create an account to get started"
  const alternateRoute = isLogin ? "/register" : "/login"
  const alternateText = isLogin ? "Need an account?" : "Already have an account?"
  const alternateAction = isLogin ? "Register" : "Login"

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const { data, status } = await api.post(route, { username, password })
      if (status === 200) {
        localStorage.setItem(ACCESS_TOKEN, data.access)
        localStorage.setItem(REFRESH_TOKEN, data.refresh)
        localStorage.setItem("username", username)
        navigate("/")
      } else {
        navigate("/login")
      }
    } catch (err) {
      setError(
        err.response?.data?.detail ||
        err.response?.data?.message ||
        "Authentication failed. Please check your credentials."
      )
    } finally {
      setLoading(false)
    }
  }

  const fadeClass = "transition-all duration-500 ease-out"
  const mountedClass = mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"

  return (
    <div className="flex justify-center items-center min-h-screen bg-zinc-50 dark:bg-zinc-950 p-4">
      <Card className={`w-full max-w-md shadow-lg transition-all duration-700 ease-out ${mountedClass}`}>
        <CardHeader className="space-y-1">
          <CardTitle className={`text-2xl font-bold tracking-tight ${fadeClass} ${mountedClass}`}>
            {title}
          </CardTitle>
          <CardDescription className={`text-zinc-500 dark:text-zinc-400 ${fadeClass} delay-100 ${mountedClass}`}>
            {description}
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive" className="bg-red-50 text-red-900 border-red-200 dark:bg-red-950 dark:text-red-200 dark:border-red-800 animate-shake">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {[
              { id: "username", type: "text", icon: User, value: username, setValue: setUsername, placeholder: "Username" },
              { id: "password", type: "password", icon: Lock, value: password, setValue: setPassword, placeholder: "Password" }
            ].map(({ id, type, icon: Icon, value, setValue, placeholder }) => (
              <div key={id} className={`space-y-2 ${fadeClass} delay-200 ${mountedClass}`}>
                <Label htmlFor={id} className="capitalize">{id}</Label>
                <div className="relative group">
                  <Icon className="absolute left-3 top-3 h-4 w-4 text-zinc-500 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors" />
                  <Input
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="pl-10 transition-all border-zinc-200"
                    required
                  />
                </div>
              </div>
            ))}
          </CardContent>

          <CardFooter className={`flex flex-col space-y-4 ${fadeClass} delay-400 ${mountedClass}`}>
            <Button type="submit" disabled={loading} className="w-full relative overflow-hidden group !bg-zinc-900 mt-8">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                title
              )}
            </Button>

            <div className="text-sm text-center text-zinc-500 dark:text-zinc-400">
              {alternateText}{" "}
              <a href={alternateRoute} className="font-medium text-zinc-900">
                {alternateAction}
              </a>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default Form
