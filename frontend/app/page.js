'use client'

import Banners from "./_components/Banners";
import CategoryList from "./_components/CategoryList";
import Footer from "./_components/Footer";
import Products from "./_components/Products";
import Slide from "./_components/Slide";


export default function Home() {
  return (
    <div className="px-14">
      <Slide/>
      <CategoryList/>
      <Products/>
      <Banners/>
      <Footer/>
    </div>
  );
}
