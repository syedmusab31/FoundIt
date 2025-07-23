import React from 'react'
import { assets } from '../assets/assets'

const Banner = () => {
  return (
  <div className='bg-light'>
    <div className="flex flex-col md:flex-row md:items-start items-center justify-between px-8 md:pl-14 pt-10 bg-primary max-w-6xl mx-3 md:mx-auto rounded-2xl overflow-hidden relative">
  
  {/* Content Section */}
  <div className="text-white z-10 md:max-w-[60%]">
    <h2 className="text-3xl font-semibold leading-snug">
      Find an Item?
    </h2>
    <p className="mt-3 text-white">
      Reconnect with its belonging effortlessly by listing it on <span className="font-medium">FoundIt</span>
    </p>
    <p className="mt-2 text-white max-w-md">
We streamline the process, ensuring secure communication and a smooth return — so you can be a hero, stress-free.    </p>
    <button className="px-6 py-2 mt-4 bg-[#FAFBFC] text-primary hover:bg-[#E5E7EB] transition-all rounded-lg text-sm font-medium ">
      List Found Item
    </button>
  </div>

  {/* Car Image with Subtle Shadow */}
  <img
    src={assets.banner_image}
    alt="banner-car-image"
    className="max-h-52 mt-0 md:mt-0 drop-shadow-xl"
  />

  {/* Optional Background Layer */}
</div>

</div>

  )
}

export default Banner
