import { Github, Linkedin, Mail ,Instagram } from 'lucide-react'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="w-full bg-gray-50 dark:bg-gray-900 border-t dark:border-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-8">
          {/* Social Links */}
          <div className="flex space-x-6">
            <Link
              href="https://github.com/ZAHRAN88"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <span className="sr-only">GitHub</span>
              <Github className="h-6 w-6" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/mohamed-zahran-383859222/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <span className="sr-only">LinkedIn</span>
              <Linkedin className="h-6 w-6" />
            </Link>
            <Link
              href="https://www.instagram.com/mohamedosamazahran77/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <span className="sr-only">Instagram</span>
              <Instagram className="h-6 w-6" />
            </Link>
            <Link
              href="mailto:mohamedzahrann0@gmail.com"
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <span className="sr-only">Email</span>
              <Mail className="h-6 w-6" />
            </Link>
          </div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} MoodFlix. All rights reserved.
            </p>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Made with ❤️ by <Link 
                href="https://mohamed-zahran.netlify.app/" 
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-500 transition-colors"
              >
                Mohamed Zahran
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
