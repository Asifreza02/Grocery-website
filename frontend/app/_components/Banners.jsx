'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Banner = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="w-full my-16 px-4 md:px-0"
    >
      <div className="relative w-full h-[200px] md:h-[350px] rounded-3xl overflow-hidden shadow-2xl group">
        <Image
          src="/banner-img.png"
          alt="Banner"
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          priority={true}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent pointer-events-none" />

        {/* Optional: Add text overlay if needed, or keep it clean for image-only banners */}
        <div className="absolute bottom-0 left-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <h3 className="text-white text-2xl font-bold mb-2">Fresh Deals</h3>
          <p className="text-white/90">Get the best prices on fresh produce today!</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Banner;
