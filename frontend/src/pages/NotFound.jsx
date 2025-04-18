import { Link } from "react-router-dom"
import { Home } from "lucide-react"

function NotFound() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
      <div className="w-full max-w-4xl mx-auto text-center space-y-8">
        <div className="space-y-4 w-full">
          <h1 className="text-8xl font-extrabold tracking-tighter bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400 text-transparent bg-clip-text animate-fade-in">
            404
          </h1>
          <h2 className="text-3xl font-semibold">Page Not Found</h2>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
            Sorry, we couldn't find the page you're looking for.
          </p>
        </div>

        <div className="border-t border-zinc-200 dark:border-zinc-800 pt-8 w-full">
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
            You might want to check the URL or head back to the homepage.
          </p>

          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-zinc-900 px-6 py-3 text-sm font-medium text-zinc-50 shadow-md transition-all duration-200 hover:bg-zinc-800 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 dark:focus-visible:ring-zinc-300"
          >
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound
