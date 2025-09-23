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
      console.log(res.data);
      setSliderList(Array.isArray(res) ? res : res.data || []);
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
      <div className="w-full h-screen md:h-[6000px] flex items-center justify-center">
        <p>Loading sliders...</p>
      </div>
    );
  }

  return (
    <Carousel>
      <CarouselContent>
        {sliderList.map((slider) => {
          {`console.log(slider);`}
          return (
            <CarouselItem key={slider._id}>
              <img
                src={slider.image}
                alt={slider.name}
                className="w-full h-[300px] md:h-[500px] flex items-center justify-center object-contain"
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

