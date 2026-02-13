"use client";
import React from "react";
import { Button } from "antd";

const AboutUs = () => {
  return (
    <div className="bg-gray-50 min-h-screen px-4 py-12">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">

        {/* Hero Section */}
        <section className="flex flex-col items-center text-center gap-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
            About Euphoria
          </h1>
          <p className="text-gray-600 text-lg md:text-xl max-w-3xl">
            At Euphoria, we are passionate about delivering the best products and experiences to our customers. Our team works tirelessly to ensure quality, reliability, and customer satisfaction in everything we do.
          </p>
          <Button
            type="primary"
            className="mt-4 bg-purple-600 border-none hover:bg-purple-700"
          >
            Learn More
          </Button>
        </section>

        {/* Mission & Vision */}
        <section className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Our Mission</h2>
            <p className="text-gray-600">
              To provide high-quality products and a seamless shopping experience to our customers while maintaining ethical practices and sustainability.
            </p>
          </div>
          <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Our Vision</h2>
            <p className="text-gray-600">
              To be the most trusted and innovative brand, delivering happiness and satisfaction to every customer, every time.
            </p>
          </div>
        </section>

        {/* Core Values */}
        <section className="flex flex-col gap-8">
          <h2 className="text-3xl font-bold text-gray-800 text-center">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="font-semibold text-lg mb-2">Integrity</h3>
              <p className="text-gray-600 text-sm">We maintain honesty and transparency in all our operations.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="font-semibold text-lg mb-2">Quality</h3>
              <p className="text-gray-600 text-sm">We strive to deliver the highest quality products to our customers.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="font-semibold text-lg mb-2">Innovation</h3>
              <p className="text-gray-600 text-sm">We embrace creativity and innovation to improve our services.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="font-semibold text-lg mb-2">Customer First</h3>
              <p className="text-gray-600 text-sm">Our customers are at the heart of everything we do.</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-purple-600 text-white p-8 rounded-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center md:text-left">
            Want to work with us?
          </h2>
          <Button
            type="default"
            className="bg-white text-purple-600 font-semibold hover:bg-gray-100 border-none"
          >
            Join Our Team
          </Button>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
