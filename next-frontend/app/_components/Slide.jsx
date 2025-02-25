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
  const getSliderList = async () =>{
      try {
          const res = await getSlider();
          setSliderList(res.data);
        } catch (error) {
          console.error("Error fetching categories:", error);
          
        }
  };
    useEffect(() => {
      getSliderList(); 
    }, []);

  return (
    <Carousel>
    <CarouselContent>
      {sliderList.map((slider, index)=>(
        <CarouselItem key={index} >
          <img src={process.env.NEXT_PUBLIC_BAKEND_BASE_URL+
            slider.attributes?.image?.data[0]?.attributes?.url} alt={slider.name}
            className=' p-8 w-screen h-[200px] md:h-[400px] object-cover'
              />
          
        </CarouselItem>
        
      ))}
      
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
  
  )
}

export default Slide
