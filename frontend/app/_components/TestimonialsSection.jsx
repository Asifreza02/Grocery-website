'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
    {
        name: 'Priya Sharma',
        rating: 5,
        comment: 'Amazing service! Fresh vegetables delivered right to my door. Will order again!'
    },
    {
        name: 'Rahul Kumar',
        rating: 5,
        comment: 'Best grocery app I\'ve used. Fast delivery and great quality products.'
    },
    {
        name: 'Anita Patel',
        rating: 5,
        comment: 'Love the variety and freshness. Customer service is top-notch!'
    }
];

export default function TestimonialsSection() {
    return (
        <div className="w-full py-16">
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-bold mb-12 text-center text-gradient"
            >
                What Our Customers Say
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {testimonials.map((testimonial, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="p-6 rounded-2xl glassmorphism hover:shadow-xl transition-all duration-300"
                    >
                        <div className="flex gap-1 mb-4">
                            {[...Array(testimonial.rating)].map((_, i) => (
                                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                            ))}
                        </div>
                        <p className="text-muted-foreground mb-4 italic">"{testimonial.comment}"</p>
                        <p className="font-bold">- {testimonial.name}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
