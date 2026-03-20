import React from 'react'
import footerImage from '../assets/nav.jpeg'

export default function Footer() {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        
        {/* Logo and Description */}
        <div>
          <img
            src={footerImage}
            className="mb-5 w-59 object-contain"
            alt="Fashion Hub Logo"
          />
          <p className="w-full md:w-2/3 text-gray-600">
            Fashion Hub is your one-stop destination for the latest trends in clothing,
            footwear, and accessories. We bring you high-quality fashion at affordable
            prices so you can stay stylish every day. Discover your style with us.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <p className="text-xl font-medium mb-5">FASHION HUB</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li className="cursor-pointer">Home</li>
            <li className="cursor-pointer">Shop</li>
            <li className="cursor-pointer">About Us</li>
            <li className="cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+91-987-654-3210</li>
            <li>support@fashionhub.com</li>
            <li className="cursor-pointer">Facebook</li>
            <li className="cursor-pointer">Instagram</li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div>
        <hr className='text-blue-100' />
        <p className="py-5 text-sm text-center">
          © 2026 Asifa Azhar. All Rights Reserved.
        </p>
      </div>
    </div>
  )
}