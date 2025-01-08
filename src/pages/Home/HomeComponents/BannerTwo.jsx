import React from "react";
import blur from '../../../assets/banner-2-blur.png'
import norm from '../../../assets/banner-2-norm.png'

const BannerTwo = () => {
  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-4">
      <div>
        <h2 className="text-2xl md:text-4xl text-center font-bold my-8">
          Our Research Process
        </h2>
      </div>
      <div className="diff aspect-[18/9] rounded-2xl">
        <div className="diff-item-1">
          <img
            alt="daisy"
            src={blur}
          />
        </div>
        <div className="diff-item-2">
          <img
            alt="daisy"
            src={norm}
          />
        </div>
        <div className="diff-resizer"></div>
      </div>
    </div>
  );
};

export default BannerTwo;
