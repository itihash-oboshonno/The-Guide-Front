import SliderForBanner from "./SliderForBanner";
import { motion } from "motion/react"
import banner1 from "../../../assets/banner-1.webp"

const Banner = () => {
  return (
    <div className="bg-[#f9f8fd] py-8">
      <div className="max-w-screen-2xl mx-auto px-4 py-10 flex flex-col-reverse md:flex-row gap-8 items-center justify-between">
        <div className="xxxs:max-w-80 xxs:max-w-96 xs:max-w-md sm:max-w-2xl md:max-w-96 mdb:max-w-md lg:max-w-xl lgx:max-w-2xl">
          {/* Slider & Buttons on this left side */}
          {/* <p>Left Side</p> */}
          <SliderForBanner />
        </div>
        <div>
          {/* Image and design on this right side */}
          <div>
            <motion.img src={banner1} alt=""
            animate={{ y: ["3%", "-6%", "3%"] }} transition={{ duration: 3, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
