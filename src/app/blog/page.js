"use client";
import React, { useState, useEffect } from "react";
import { Button, Tag } from "antd";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);

  // Example static blog data, replace with API call if needed
  useEffect(() => {
    const blogData = [
      {
        id: 1,
        title: "The Future of Fashion: Trends in 2026",
        snippet: "Explore the upcoming trends in fashion for the year 2026, including sustainable materials and smart wearables.",
        author: "John Doe",
        date: "Feb 12, 2026",
        tags: ["Fashion", "Trends"],
      },
      {
        id: 2,
        title: "Top 10 Joggers Styles for Every Occasion",
        snippet: "A complete guide on how to wear joggers stylishly for casual and semi-formal occasions.",
        author: "Jane Smith",
        date: "Jan 20, 2026",
        tags: ["Joggers", "Style"],
      },
      {
        id: 3,
        title: "Sustainable Clothing: Why It Matters",
        snippet: "Learn why sustainable clothing is important and how brands like Euphoria are making a difference.",
        author: "Alex Johnson",
        date: "Dec 15, 2025",
        tags: ["Sustainability", "Clothing"],
      },
      {
        id: 4,
        title: "Fashion Tech: Wearable Devices in Clothing",
        snippet: "Discover how wearable technology is changing the way we interact with clothing and fashion.",
        author: "Emily Davis",
        date: "Nov 10, 2025",
        tags: ["Tech", "Fashion"],
      },
    ];

    setBlogs(blogData);
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen px-4 py-12">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 text-center">
          Our Blog
        </h1>

        <p className="text-gray-600 text-center md:text-lg">
          Read our latest articles on fashion, trends, sustainability, and more.
        </p>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div key={blog.id} className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between">
              <div className="flex flex-col gap-3">
                <h2 className="text-xl font-bold text-gray-800">{blog.title}</h2>
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag, idx) => (
                    <Tag key={idx} color="purple">{tag}</Tag>
                  ))}
                </div>
                <p className="text-gray-600 text-sm">{blog.snippet}</p>
              </div>
              <div className="flex justify-between items-center mt-4">
                <div className="text-gray-500 text-sm">
                  <span>{blog.author}</span> | <span>{blog.date}</span>
                </div>
                <Button type="primary" className="bg-purple-600 border-none hover:bg-purple-700">
                  Read More
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
