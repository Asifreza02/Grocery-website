"use client";
import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { motion } from 'framer-motion';
import { Button } from './button';
import { ArrowRight } from 'lucide-react';

const SmartCarousel = ({ sliders }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })]);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on('select', onSelect);
    }, [emblaApi, onSelect]);

    if (!sliders || sliders.length === 0) return null;

    return (
        <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-2xl shadow-2xl group">
            <div className="overflow-hidden h-full" ref={emblaRef}>
                <div className="flex h-full">
                    {sliders.map((slider, index) => (
                        <div className="relative flex-[0_0_100%] min-w-0 h-full" key={index}>
                            <div className="absolute inset-0">
                                <img
                                    src={slider.image} // Assuming slider object has an image property
                                    alt="slider"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
                            </div>

                            <div className="relative z-10 h-full flex flex-col justify-center px-10 md:px-20 max-w-4xl">
                                <motion.h2
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: selectedIndex === index ? 1 : 0, y: selectedIndex === index ? 0 : 20 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight"
                                >
                                    Fresh Groceries <br />
                                    <span className="text-emerald-400">Delivered Fast</span>
                                </motion.h2>

                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: selectedIndex === index ? 1 : 0, y: selectedIndex === index ? 0 : 20 }}
                                    transition={{ duration: 0.5, delay: 0.4 }}
                                    className="text-gray-200 text-lg md:text-xl mb-8 max-w-lg"
                                >
                                    Get the best quality fresh produce, dairy, and pantry staples delivered right to your doorstep.
                                </motion.p>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: selectedIndex === index ? 1 : 0, y: selectedIndex === index ? 0 : 20 }}
                                    transition={{ duration: 0.5, delay: 0.6 }}
                                >
                                    <Button className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-6 text-lg rounded-full flex items-center gap-2 transition-all hover:scale-105">
                                        Shop Now <ArrowRight className="w-5 h-5" />
                                    </Button>
                                </motion.div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Dots */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
                {sliders.map((_, index) => (
                    <button
                        key={index}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === selectedIndex ? 'bg-emerald-500 w-8' : 'bg-white/50 hover:bg-white'
                            }`}
                        onClick={() => emblaApi && emblaApi.scrollTo(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default SmartCarousel;
