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
      <div className="text-center py-14 px-4 bg-gray-50 rounded-lg shadow-sm">
  
  {/* Heading */}
  <p className="text-3xl font-semibold text-gray-900">
    Join FashionHub & Get 20% Off
  </p>

  {/* Subtext */}
  <p className="text-gray-500 mt-3 max-w-xl mx-auto">
    Subscribe to get exclusive deals, latest fashion trends, and early access
    to new collections.
  </p>

  {/* Form */}
  <form className="w-full sm:w-1/2  flex items-center mx-auto mt-6 border rounded-full overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-offset-gray-400 transition">
    
    <input
      className="w-full px-4 py-3 outline-none text-sm"
      type="email"
      placeholder="Enter your email address"
      required
    />

    <button
      type="submit"
      className="bg-black  text-white text-sm px-6 py-3 hover:bg-gray-800 transition"
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
