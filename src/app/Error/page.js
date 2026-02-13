"use client"
import React from "react";
import Error from "../Components/Error/Error";
import Header from "../Components/Header/header";
import Footer from "../Components/Footer/Footer";

const Page = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        gap: "50px",
      }}
    >
      <Header />
      <Error />
      <Footer />
    </div>
  );
};
export default Page;
