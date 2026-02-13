"use client";
import React from "react";
import { Button } from "antd";
import {
  FacebookOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";

const Footer = () => {
  const router = useRouter();
  return (
    <footer className="bg-gray-900 text-white w-full px-4 py-12">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Top Sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Need Help */}
          <div>
            <h3 className="font-bold text-lg mb-4">Need Help</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="hover:text-white cursor-pointer" onClick={()=>router.push('/contact')}>Contact Us</li>
              <li className="hover:text-white cursor-pointer" onClick={()=>router.push('/Error')}>Track Order</li>
              <li className="hover:text-white cursor-pointer" onClick={()=>router.push('/returns')}>Returns & Refunds</li>
              <li className="hover:text-white cursor-pointer" onClick={()=>router.push('/faq')}>FAQ&apos;s</li>
              <li className="hover:text-white cursor-pointer" onClick={()=>router.push('/Error')}>Career</li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-bold text-lg mb-4">Company</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="hover:text-white cursor-pointer" onClick={()=>router.push('/about')}>About Us</li>
              <li className="hover:text-white cursor-pointer" onClick={()=>router.push('/blog')}>euphoria Blog</li>
              <li className="hover:text-white cursor-pointer" onClick={()=>router.push('/Error')}>euphoriastan</li>
              <li className="hover:text-white cursor-pointer" onClick={()=>router.push('/Error')}>Collaboration</li>
              <li className="hover:text-white cursor-pointer" onClick={()=>router.push('/media')}>Media</li>
            </ul>
          </div>

          {/* More Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">More Info</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="hover:text-white cursor-pointer" onClick={()=>router.push('/terms')}>Terms & Conditions</li>
              <li className="hover:text-white cursor-pointer" onClick={()=>router.push('/privacy')}>Privacy Policy</li>
              <li className="hover:text-white cursor-pointer" onClick={()=>router.push('/shipping')}>Shipping Policy</li>
              <li className="hover:text-white cursor-pointer" onClick={()=>router.push('/Error')}>Sitemap</li>
            </ul>
          </div>

          {/* Location */}
          <div>
            <h3 className="font-bold text-lg mb-4">Location</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>support@euphoria.in</li>
              <li>Eklingpura Chouraha, Ahmedabad Main Road</li>
              <li>(NH 8 - Near Mahadev Hotel) Udaipur, India - 313002</li>
            </ul>
          </div>
        </div>

        {/* Download App Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <h3 className="text-xl md:text-2xl font-bold">Download The App</h3>
          <div className="flex gap-2">
            <Button
              shape="circle"
              size="large"
              icon={<FacebookOutlined />}
              className="bg-gray-700 hover:bg-gray-600 text-white border-none"
            />
            <Button
              shape="circle"
              size="large"
              icon={<InstagramOutlined />}
              className="bg-gray-700 hover:bg-gray-600 text-white border-none"
            />
            <Button
              shape="circle"
              size="large"
              icon={<TwitterOutlined />}
              className="bg-gray-700 hover:bg-gray-600 text-white border-none"
            />
            <Button
              shape="circle"
              size="large"
              icon={<LinkedinOutlined />}
              className="bg-gray-700 hover:bg-gray-600 text-white border-none"
            />
          </div>
        </div>

        {/* App Download Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
          {/* Google Play */}
          <div className="flex items-center gap-2 cursor-pointer hover:scale-105 transition">
            <img
              src="/Images/Group.png"
              alt="Google Play"
              className="w-8 h-8"
            />
            <div className="text-left">
              <p className="text-gray-300 text-xs">android app on</p>
              <h4 className="font-bold text-sm text-white">Google Play</h4>
            </div>
          </div>

          {/* App Store */}
          <div className="flex items-center gap-2 cursor-pointer hover:scale-105 transition">
            <img
              src="/Images/Group 1.png"
              alt="App Store"
              className="w-6 h-8"
            />
            <div className="text-left">
              <p className="text-gray-300 text-xs">Available on the</p>
              <h4 className="font-bold text-sm text-white">App Store</h4>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 w-full my-4" />

        {/* Popular Categories */}
        <h3 className="text-xl md:text-2xl font-bold text-center lg:text-left">
          Popular Categories
        </h3>

        <div className="border-t border-gray-700 w-full my-4" />

        {/* Footer Bottom */}
        <p className="text-gray-400 text-sm md:text-base text-center">
          Copyright © 2023 Euphoria Folks Pvt Ltd. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
