'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Check, ArrowRight, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';

const OrderConfirmation = () => {
    const router = useRouter();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-950 px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white dark:bg-zinc-900 p-8 md:p-12 rounded-3xl shadow-xl text-center max-w-lg w-full border border-gray-100 dark:border-zinc-800"
            >
                <div className="flex justify-center mb-6">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20,
                            delay: 0.2
                        }}
                        className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600"
                    >
                        <Check size={48} strokeWidth={3} />
                    </motion.div>
                </div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-3xl font-bold text-gray-900 dark:text-white mb-2"
                >
                    Order Placed!
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-gray-500 dark:text-gray-400 mb-8"
                >
                    Thank you for your purchase. Your order has been received and is being processed.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <Button
                        onClick={() => router.push('/my-order')}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl h-12 px-8"
                    >
                        <ShoppingBag className="mr-2 h-5 w-5" />
                        View My Orders
                    </Button>
                    <Button
                        onClick={() => router.push('/')}
                        variant="outline"
                        className="border-gray-200 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-800 rounded-xl h-12 px-8"
                    >
                        Continue Shopping
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default OrderConfirmation;
