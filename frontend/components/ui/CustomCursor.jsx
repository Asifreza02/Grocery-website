"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const updateMousePosition = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e) => {
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('a') || e.target.closest('button')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', updateMousePosition);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    return (
        <motion.div
            className="fixed top-0 left-0 w-6 h-6 rounded-full border-2 border-emerald-500 pointer-events-none z-50 flex justify-center items-center mix-blend-difference"
            animate={{
                x: mousePosition.x - 12,
                y: mousePosition.y - 12,
                scale: isHovering ? 2.5 : 1,
                backgroundColor: isHovering ? "rgba(16, 185, 129, 0.2)" : "transparent",
                borderColor: isHovering ? "transparent" : "#10b981"
            }}
            transition={{
                type: "spring",
                stiffness: 150,
                damping: 15,
                mass: 0.1
            }}
        >
            <motion.div
                className="w-1 h-1 bg-emerald-500 rounded-full"
                animate={{ scale: isHovering ? 0 : 1 }}
            />
        </motion.div>
    );
};

export default CustomCursor;
