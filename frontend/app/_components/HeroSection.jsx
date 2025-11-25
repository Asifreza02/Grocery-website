'use client';

import { useEffect, useState } from 'react';
import SmartCarousel from '@/components/ui/SmartCarousel';
import { motion } from 'framer-motion';

export default function HeroSection() {
    const [sliders, setSliders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSliders = async () => {
            try {
                const res = await fetch('/api/sliders');
                const data = await res.json();
                setSliders(data?.data || []);
            } catch (e) {
                console.error('Failed to load sliders', e);
            } finally {
                setLoading(false);
            }
        };
        fetchSliders();
    }, []);

    if (loading) {
        return (
            <div className="w-full h-[400px] md:h-[500px] bg-gray-100 dark:bg-gray-800 animate-pulse rounded-2xl mx-auto mt-4" />
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-4"
        >
            <SmartCarousel sliders={sliders} />
        </motion.div>
    );
}
