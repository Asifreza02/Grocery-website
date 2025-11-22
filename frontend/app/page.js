'use client';

import HeroSection from "./_components/HeroSection";
import FeaturesSection from "./_components/FeaturesSection";
import TestimonialsSection from "./_components/TestimonialsSection";
import Banners from "./_components/Banners";
import CategoryList from "./_components/CategoryList";
import Footer from "./_components/Footer";
import Products from "./_components/Products";

export default function Home() {
  return (
    <div className="px-4 md:px-14">
      <HeroSection />
      <FeaturesSection />
      <CategoryList />
      <Products />
      <TestimonialsSection />
      <Banners />
      <Footer />
    </div>
  );
}
