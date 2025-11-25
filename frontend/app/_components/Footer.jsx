import React from 'react'
import { Facebook, Instagram, Twitter, Github, Mail, Phone, MapPin } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-20">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <img src="/grocery-store-logo.jpg" alt="Logo" className="h-10 w-10 rounded-full object-contain" />
              <span className="text-xl font-bold text-emerald-800 dark:text-emerald-400">GroceryApp</span>
            </div>

            <p className="mt-4 max-w-xs text-gray-500 dark:text-gray-400">
              Fresh groceries delivered to your doorstep. Quality you can trust, prices you'll love.
            </p>

            <ul className="mt-8 flex gap-6">
              <li>
                <a href="#" className="text-gray-700 transition hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400">
                  <span className="sr-only">Facebook</span>
                  <Facebook className="h-6 w-6" />
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 transition hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400">
                  <span className="sr-only">Instagram</span>
                  <Instagram className="h-6 w-6" />
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 transition hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400">
                  <span className="sr-only">Twitter</span>
                  <Twitter className="h-6 w-6" />
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 transition hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400">
                  <span className="sr-only">GitHub</span>
                  <Github className="h-6 w-6" />
                </a>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Services</p>
              <ul className="mt-6 space-y-4 text-sm">
                <li><a href="#" className="text-gray-700 transition hover:text-emerald-600 dark:text-gray-300">Fast Delivery</a></li>
                <li><a href="#" className="text-gray-700 transition hover:text-emerald-600 dark:text-gray-300">Bulk Orders</a></li>
                <li><a href="#" className="text-gray-700 transition hover:text-emerald-600 dark:text-gray-300">Subscription</a></li>
                <li><a href="#" className="text-gray-700 transition hover:text-emerald-600 dark:text-gray-300">Gift Cards</a></li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-gray-900 dark:text-white">Company</p>
              <ul className="mt-6 space-y-4 text-sm">
                <li><a href="#" className="text-gray-700 transition hover:text-emerald-600 dark:text-gray-300">About Us</a></li>
                <li><a href="#" className="text-gray-700 transition hover:text-emerald-600 dark:text-gray-300">Careers</a></li>
                <li><a href="#" className="text-gray-700 transition hover:text-emerald-600 dark:text-gray-300">Partners</a></li>
                <li><a href="#" className="text-gray-700 transition hover:text-emerald-600 dark:text-gray-300">Blog</a></li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-gray-900 dark:text-white">Support</p>
              <ul className="mt-6 space-y-4 text-sm">
                <li><a href="#" className="text-gray-700 transition hover:text-emerald-600 dark:text-gray-300">Help Center</a></li>
                <li><a href="#" className="text-gray-700 transition hover:text-emerald-600 dark:text-gray-300">Terms of Service</a></li>
                <li><a href="#" className="text-gray-700 transition hover:text-emerald-600 dark:text-gray-300">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-700 transition hover:text-emerald-600 dark:text-gray-300">Returns</a></li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-gray-900 dark:text-white">Contact</p>
              <ul className="mt-6 space-y-4 text-sm">
                <li className="flex gap-2 items-center text-gray-700 dark:text-gray-300">
                  <Mail size={16} /> support@groceryapp.com
                </li>
                <li className="flex gap-2 items-center text-gray-700 dark:text-gray-300">
                  <Phone size={16} /> +1 (555) 123-4567
                </li>
                <li className="flex gap-2 items-center text-gray-700 dark:text-gray-300">
                  <MapPin size={16} /> 123 Green St, Fresh City
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8">
          <p className="text-center text-xs text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Grocery App. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
