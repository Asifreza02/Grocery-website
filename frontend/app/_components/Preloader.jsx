"use client"
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Preloader = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Simulate loading time or wait for resources
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 2500) // 2.5 seconds loading time

        return () => clearTimeout(timer)
    }, [])

    return (
        <AnimatePresence mode='wait'>
            {isLoading ? (
                <motion.div
                    key="preloader"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.5 } }}
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white dark:bg-black overflow-hidden"
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative"
                    >
                        <img src="/grocery-store-logo.jpg" alt="Logo" className="w-32 h-32 object-contain rounded-full shadow-2xl" />

                        {/* Ripple effect */}
                        <motion.div
                            className="absolute inset-0 rounded-full border-4 border-emerald-500/30"
                            initial={{ scale: 1, opacity: 1 }}
                            animate={{ scale: 1.5, opacity: 0 }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                        />
                    </motion.div>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="mt-8 flex flex-col items-center"
                    >
                        <h1 className="text-3xl font-bold text-emerald-800 dark:text-emerald-400 tracking-wider">
                            GROCERY APP
                        </h1>
                        <p className="text-emerald-600/80 mt-2 text-sm tracking-widest uppercase">
                            Freshness Delivered
                        </p>
                    </motion.div>

                    {/* Loading Bar */}
                    <div className="mt-12 w-64 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-emerald-400 to-teal-500"
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 2.2, ease: "easeInOut" }}
                        />
                    </div>
                </motion.div>
            ) : (
                <motion.div
                    key="content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="min-h-screen"
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default Preloader
