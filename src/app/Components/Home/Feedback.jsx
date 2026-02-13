'use client';
import React, { use } from "react";
import FeedBackCard from "./FeedBackCard";
import { Typography } from "antd";

const { Title } = Typography;

const Feedback = () => {
  const feedbackCardContent = [
    {
      id: "1",
      img: "/Images/In The Limelight 2.png",
      tittle: "Floyd Miles",
      describtion:
        "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
    },
    {
      id: "2",
      img: "/Images/In The Limelight 8.png",
      tittle: "Ronald Richards",
      describtion:
        "ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
    },
    {
      id: "3",
      img: "/Images/In The Limelight 1.png",
      tittle: "Savannah Nguyen",
      describtion:
        "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
    },
    {
      id: "4",
      img: "/Images/In The Limelight 1.png",
      tittle: "Savannah Nguyen",
      describtion:
        "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
    },
  ];

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <img src="/Images/New Arrival Logo.png" alt="Feedback" className="h-8 w-auto" />
        <Title level={3} className="!m-0">Feedback</Title>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {feedbackCardContent.map((item) => (
          <FeedBackCard key={item.id} data={item} />
        ))}
      </div>
    </section>
  );
};

export default Feedback;
