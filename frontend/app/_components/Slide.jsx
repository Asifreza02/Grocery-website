'use client'
import React, { useEffect, useState } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import { getSlider } from '../_utils/GlobalApi'

const Slide = () => {
  const [sliderList, setSliderList] = useState([]);
  const [loading, setLoading] = useState(true);

  const getSliderList = async () => {
    try {
      const res = await getSlider();
      // ✅ Safely extract data (Strapi usually sends res.data)
      const list = res?.data || [];
      setSliderList(list);
    } catch (error) {
      console.error("Error fetching sliders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSliderList();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-[200px] md:h-[400px] flex items-center justify-center">
        <p>Loading sliders...</p>
      </div>
    );
  }

  return (
    <Carousel>
      <CarouselContent>
        {sliderList.map((slider, index) => {
          const imageUrl =
            process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
            (slider?.attributes?.image?.data?.attributes?.url ?? "");
          const name = slider?.attributes?.name ?? `Slide ${index + 1}`;

          return (
            <CarouselItem key={index}>
              <img
                src={imageUrl}
                alt={name}
                className="p-8 w-screen h-[200px] md:h-[400px] object-cover"
              />
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default Slide;
