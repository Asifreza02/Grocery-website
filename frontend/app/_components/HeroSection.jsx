'use client';

import { useEffect, useState } from 'react';
import SmartCarousel from '@/components/ui/SmartCarousel';

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
            <div className="flex items-center justify-center h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500" />
            </div>
        );
    }

    return <SmartCarousel sliders={sliders} />;
}
