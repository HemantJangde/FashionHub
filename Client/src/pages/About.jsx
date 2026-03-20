import React from "react";
import AboutImage from "../assets/20677.jpg";

export default function About() {
  return (
    <div>
      {/* About Us Header */}
      <div className="text-2xl text-center pt-8">
        <div className="inline-flex gap-2 items-center mb-3">
          <p className="text-gray-500">
            ABOUT  US 
          </p>
          <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
        </div>
      </div>

      {/* About Content */}
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px] shadow-md rounded"
          src={AboutImage}
          alt="FashionHub"
        />

        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            <b>FashionHub</b> was created with a vision to redefine online
            fashion shopping. We believe that style should be accessible,
            affordable, and effortless for everyone. Our platform brings
            together the latest trends, timeless classics, and everyday
            essentials—all in one place.
          </p>

          <p>
            From casual wear to premium collections, FashionHub offers a wide
            range of high-quality clothing and accessories curated to match
            every personality and occasion. We partner with trusted brands and
            designers to ensure you always get the best in fashion.
          </p>

          <b className="text-gray-800">Our Mission</b>
          <p>
            Our mission is to empower individuals to express themselves through
            fashion. We aim to deliver a seamless shopping experience with
            top-notch quality, fast delivery, and customer-first service that
            builds trust and confidence.
          </p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="text-xl py-4">
        <div className="inline-flex gap-2 items-center mb-3">
          <p className="text-gray-500">
            WHY <span className="text-gray-700 font-medium">CHOOSE US</span>
          </p>
          <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
        </div>
      </div>

      {/* Features */}
      <div className="flex flex-col  md:flex-row text-sm mb-20">
        <div className="border border-gray-400  rounded-sm px-10 md:px-16 py-10 flex flex-col gap-4">
          <b>Premium Quality</b>
          <p className="text-gray-600">
            We ensure every product meets high-quality standards, giving you
            durability, comfort, and style.
          </p>
        </div>

        <div className="border rounded-sm  border-gray-400 px-10 md:px-16 py-10 flex flex-col gap-4">
          <b>Latest Trends</b>
          <p className="text-gray-600">
            Stay ahead in fashion with our regularly updated collections based
            on global trends.
          </p>
        </div>

        <div className="border rounded-sm border-gray-400 px-10 md:px-16 py-10 flex flex-col gap-4">
          <b>Customer First</b>
          <p className="text-gray-600">
            Your satisfaction is our priority. We provide fast support, easy
            returns, and a smooth shopping experience.
          </p>
        </div>
      </div>

      {/* Subscribe Section */}
      <div className="text-center">
        <p className="text-2xl font-medium text-gray-800">
          Join FashionHub & Get 20% Off
        </p>
        <p className="text-gray-400 mt-3">
          Be the first to know about new arrivals, exclusive offers, and
          fashion trends.
        </p>

        <form className="w-full sm:w-1/2 flex items-center mx-auto mt-6 border rounded-full overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-black transition">
    
    <input
      className="w-full px-4 py-3 outline-none text-sm"
      type="email"
      placeholder="Enter your email address"
      required
    />

    <button
      type="submit"
      className="bg-black text-white font-bold font-semibold text-sm px-6 py-3 hover:bg-gray-800 transition"
    >
      SUBSCRIBE
    </button>

  </form>
      </div>
    </div>
  );
}