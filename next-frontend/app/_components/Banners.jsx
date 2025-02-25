import Image from 'next/legacy/image'

const Banner = () => {
  return (
    <div className="flex items-center justify-center">
    <div className="bg-green-700 h-72 w-[900px] my-10  relative">
      <Image 
        src="/banner-img.png"
        alt="Banner"
        layout="fill" 
        priority={true}
         
      />
    </div>
    </div>
  );
};

export default Banner;
