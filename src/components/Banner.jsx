import React from 'react'
import BannerImage from "../assets/BannerImage.png"

const Banner = () => {
  return (
    <div className="w-full flex bg-gradient-to-r from-[#edeff3] to-[#f3f6f3] md:flex-col lg:flex-row gap-2 items-center justify-center p-4">
      {/* Content */}
      <div className="w-full lg:w-2/4 h-full flex flex-col items-center lg:items-start justify-center md:text-4xl text-2xl lg:text-5xl font-serif capitalize ml-12">
        <div>
          <h1>
            <span className="">Welcome </span>to the world of <br />
            <span className="text-green-500">Fresh and Testy</span>
            <br />
            Food 🍔
          </h1>
          <p className="w-full lg:w-3/4 text-lg mt-2 hidden md:block">
            Savor Every Moment. Delicious meals, just a tap away. Enjoy your
            favorite dishes whenever, wherever.
          </p>
          <button
            type="button"
            className="text-sm md:text-xl mt-4 p-1 md:p-2 rounded-xl bg-gradient-to-r from-pink-500 to-yellow-500  hover:bg-gradient-to-r hover:from-blue-500 hover:to-green-500"
          >
            Order Now
          </button>
        </div>
      </div>
      {/* Image */}
      <div className="w-full lg:w-2/4 h-full mt-4 lg:mt-0">
        <img
          src={BannerImage}
          alt="Banner"
          className="rounded-md object-cover w-full h-full"
        />
      </div>
    </div>
  );
}

export default Banner
