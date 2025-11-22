'use client';

import { motion } from 'framer-motion';
import { Truck, Clock, Shield, Sparkles } from 'lucide-react';

const features = [
    {
        icon: Truck,
        title: 'Free Delivery',
        description: 'On orders over ₹500'
    },
    {
        icon: Clock,
        title: 'Quick Service',
        description: 'Delivery in under 2 hours'
    },
    {
        icon: Shield,
        title: 'Secure Payment',
        description: '100% safe & secure'
    },
    {
        icon: Sparkles,
        title: 'Fresh Products',
        description: 'Farm to table guarantee'
    }
];

export default function FeaturesSection() {
    return (
        <div className="w-full py-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feature, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex flex-col items-center text-center p-6 rounded-2xl glassmorphism hover:shadow-xl transition-all duration-300"
                    >
                        <div className="bg-emerald-100 dark:bg-emerald-900 p-4 rounded-full mb-4">
                            <feature.icon className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                        <p className="text-muted-foreground text-sm">{feature.description}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
