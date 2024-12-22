import React, { useState, useEffect } from "react";
import { motion } from "motion/react"
import { Link } from "react-router-dom";

const SliderForBanner = () => {
    const slides = [
    {
      title: `Latest news on your fingertips.`,
      description: "We provide you with updates as soon as we get them!",
    },
    {
      title: "Stay updated anywhere and everywhere.",
      description: "Wherever you are, you can always get hold of it!",
    },
    {
      title: "Increase your world of knowledge.",
      description: "Subscribe to our newsletter to get updates of your choice!",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div>
      <div className="overflow-hidden">
        <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentIndex * 100}%)` }} >
          {slides.map((slide, index) => (
            <div key={index} className="w-full flex-shrink-0 text-start">
              <h2 className="xxxs:text-2xl xxs:text-3xl sm:text-4xl md:text-4xl mdb:text-4xl lg:text-5xl lgx:text-6xl font-semibold text-dark leading-normal">
                {slide.title}
              </h2>
              <p className="text-[#11142D] text-sm md:text-lg pt-4">{slide.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-start items-center gap-4 my-16 text-xs xxs:text-sm sm:text-base">
        <Link to="/all-blogs">
          <motion.button
          className="bg-prim2 text-white md:text-lg font-semibold px-6 py-2 md:px-8 md:py-3 rounded-full hover:bg-primary hover:shadow-lg"
          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2 }}
          >
            Discover Now
          </motion.button>
        </Link>
      </div>

      <div className="flex justify-start">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`h-1.5 mx-1 rounded-full transition-all duration-500 ease-in-out ${
              index === currentIndex ? "bg-prim2 w-10" : "bg-gray-300 w-5"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default SliderForBanner;