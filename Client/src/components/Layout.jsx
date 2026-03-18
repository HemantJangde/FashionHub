import React from "react";
import HeroSection from "./HeroSection";
import LatestCollection from "./LatestCollection";
import BestSeller from "./BestSeller";
import Policy from "./Policy";

export default function Layout() {
  return (
    <div>
      {/* Hero Section */}
      <HeroSection />

      {/* Latest Collections */}
      <div className="my-10">
        <LatestCollection products={products} />
      </div>

      {/* Best Sellers Section */}
      <BestSeller products={products} />

      {/* Features Section */}
      <Policy />

      {/* Newsletter Section */}
      <div className="text-center py-10">
        <p className="text-2xl font-medium text-gray-800">
          Subscribe now &amp; get 20% off
        </p>
        <p className="text-gray-400 mt-3">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </p>
        <form className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3">
          <input
            className="w-full sm:flex-1 outline-none py-2 px-2"
            type="email"
            placeholder="Enter your email"
            required
          />
          <button
            type="submit"
            className="bg-black text-white text-xs px-10 py-2 sm:py-4"
          >
            SUBSCRIBE
          </button>
        </form>
      </div>
    </div>
  );
}

const products = [
  {
    id: "6683da887f779795ecfa98fd",
    name: "Kid Tapered Slim Fit Trouser",
    price: "38",
    image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/forever/p_img47.png",
  },
  {
    id: "6683d8897f779795ecfa98df",
    name: "Men Round Neck Pure Cotton T-shirt",
    price: "64",
    image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/forever/p_img8.png",
  },
  {
    id: "6683d5b67f779795ecfa98bb",
    name: "Boy Round Neck Pure Cotton T-shirt",
    price: "60",
    image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/forever/p_img14.png",
  },
  {
    id: "6683d8d17f779795ecfa98e5",
    name: "Women Zip-Front Relaxed Fit Jacket",
    price: "74",
    image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/forever/p_img35.png",
  },
  {
    id: "6683d5e07f779795ecfa98bd",
    name: "Men Tapered Fit Flat-Front Trousers",
    price: "58",
    image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/forever/p_img15.png",
  },
  {
    id: "6683d4b27f779795ecfa98ab",
    name: "Girls Round Neck Cotton Top",
    price: "56",
    image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/forever/p_img6.png",
  },
  {
    id: "6683daf67f779795ecfa9905",
    name: "Women Zip-Front Relaxed Fit Jacket",
    price: "68",
    image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/forever/p_img51.png",
  },
  {
    id: "6683dadf7f779795ecfa9903",
    name: "Kid Tapered Slim Fit Trouser",
    price: "40",
    image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/forever/p_img50.png",
  },
  {
    id: "6683d94e7f779795ecfa98ed",
    name: "Men Printed Plain Cotton Shirt",
    price: "52",
    image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/forever/p_img39.png",
  },
  {
    id: "6683d8f27f779795ecfa98e7",
    name: "Women Zip-Front Relaxed Fit Jacket",
    price: "78",
    image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/forever/p_img36.png",
  },
];
