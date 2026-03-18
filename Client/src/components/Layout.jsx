import React from 'react'
import HeroSection from './HeroSection'
import LatestCollection from './LatestCollection'

export default function Layout() {
  return (
     <div>
      {/* Hero Section */}
     <HeroSection/>

      {/* Latest Collections */}
      <div className="my-10">
              <LatestCollection/>
      </div>

      {/* Best Sellers Section */}
      <div className="my-10">
        <div className="text-center text-3xl py-8">
          <div className="inline-flex gap-2 items-center mb-3">
            <p className="text-gray-500">
              BEST <span className="text-gray-700 font-medium">SELLERS</span>
            </p>
            <div className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></div>
          </div>
          <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 px-4">
          {/* Example Best Seller */}
          <a
            href="/product/6683daf67f779795ecfa9905"
            className="text-gray-700 cursor-pointer"
          >
            <div className="overflow-hidden">
              <img
                src="https://raw.githubusercontent.com/avinashdm/gs-images/main/forever/p_img51.png"
                alt="Women Zip-Front Relaxed Fit Jacket"
                className="hover:scale-110 transition ease-in-out"
              />
            </div>
            <p className="pt-3 pb-1 text-sm">Women Zip-Front Relaxed Fit Jacket</p>
            <p className="text-sm font-medium">$68</p>
          </a>
          {/* Repeat other best sellers */}
        </div>
      </div>

      {/* Features Section */}
      <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700">
        <div>
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE4AAABOCAYAAACOqiAd..."
            className="w-12 m-auto mb-5"
            alt="Easy Exchange Policy"
          />
          <p className="font-semibold">Easy Exchange Policy</p>
          <p className="text-gray-400">We offer hassle free exchange policy</p>
        </div>
        <div>
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAYAAAA4Tnrq..."
            className="w-12 m-auto mb-5"
            alt="7 Days Return Policy"
          />
          <p className="font-semibold">7 Days Return Policy</p>
          <p className="text-gray-400">We provide 7 days free return policy</p>
        </div>
        <div>
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEEAAABBCAYAAACO98lF..."
            className="w-12 m-auto mb-5"
            alt="Best Customer Support"
          />
          <p className="font-semibold">Best Customer Support</p>
          <p className="text-gray-400">We provide 24/7 customer support</p>
        </div>
      </div>

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
  )
}
