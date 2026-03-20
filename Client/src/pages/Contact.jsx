import React from "react";
import contactImage from "../assets/contact.jpg";

export default function Contact() {

  
  return (
    <div>
      {/* 🔹 Header */}
      <div className="text-center text-2xl pt-10">
        <div className="inline-flex gap-2 items-center mb-3">
          <p className="text-gray-500">CONTACT US</p>
          <p className="w-8 sm:w-12 h-[2px] bg-gray-700"></p>
        </div>
      </div>

      {/* 🔹 Contact Section */}
      <div className="my-12 flex flex-col md:flex-row items-center gap-12 mb-24 px-4">
        {/* Image */}
        <img
          className="w-full md:max-w-[500px] rounded-lg shadow-md"
          src={contactImage}
          alt="FashionHub Contact"
        />

        {/* Info */}
        <div className="flex flex-col gap-6 text-gray-600 max-w-md">
          <p className="font-semibold text-2xl text-gray-800">Get in Touch</p>

          <p>
            We'd love to hear from you! Whether you have a question about
            products, orders, or anything else — our team is ready to help.
          </p>

          <div>
            <p className="font-semibold text-gray-800">Our Office</p>
            <p className="text-gray-500">
              Chhattisgarh, India <br />
              FashionHub Headquarters
            </p>
          </div>

          <div>
            <p className="font-semibold text-gray-800">Contact Details</p>
            <p className="text-gray-500">
              📞 +91 98765 43210 <br />
              📧 support@fashionhub.com
            </p>
          </div>

          <div>
            <p className="font-semibold text-gray-800">Careers at FashionHub</p>
            <p className="text-gray-500">
              Join our growing team and build the future of fashion e-commerce.
            </p>
          </div>

          <button className="border border-black px-6 py-3 w-fit text-sm hover:bg-black hover:text-white transition">
            Explore Jobs
          </button>
        </div>
      </div>

      {/* 🔹 Subscribe Section */}
      <div className="text-center py-14 px-4 bg-gray-50 rounded-lg shadow-sm">
        <p className="text-3xl font-semibold text-gray-900">
          Join FashionHub & Get 20% Off
        </p>

        <p className="text-gray-500 mt-3 max-w-xl mx-auto">
          Subscribe to receive exclusive offers, new arrivals, and fashion tips.
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
            className="bg-black text-white text-sm px-6 py-3 hover:bg-gray-800 transition"
          >
            SUBSCRIBE
          </button>
        </form>
      </div>
    </div>
  );
}
