import React from "react";

const SubNewsLetter = () => {
  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center py-8">
        <div>
          <p className="text-2xl md:text-4xl text-white font-semibold text-center md:text-start">
            Subscribe to our Newsletter
          </p>
        </div>
        <div className="rounded-full p-1 border border-gray-400 flex items-center gap-2">
          <input
            className="rounded-l-full px-3 md:px-7 py-3 bg-transparent text-white text-sm md:text-base"
            type="email"
            name="subEmail"
            placeholder="Enter your email address"
          />
          <button className="text-dark text-sm md:text-base md:font-semibold bg-accent px-7 py-3 rounded-full hover:bg-prim2 hover:text-white transition duration-200">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubNewsLetter;
