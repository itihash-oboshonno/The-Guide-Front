import React from "react";
import SliderForBanner from "./SliderForBanner";

const Banner = () => {
  return (
    <div className="bg-[#f9f8fd]">
      <div className="max-w-screen-2xl mx-auto px-4 py-10 flex flex-col-reverse md:flex-row gap-4 items-center justify-between">
        <div className="xxxs:max-w-80 xxs:max-w-96 xs:max-w-md sm:max-w-2xl md:max-w-96 mdb:max-w-md lg:max-w-xl lgx:max-w-2xl">
          {/* Slider & Buttons on this left side */}
          {/* <p>Left Side</p> */}
          <SliderForBanner />
        </div>
        <div>
          {/* Image and design on this right side */}
          <p>Right Side</p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
