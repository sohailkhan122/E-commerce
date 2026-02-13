"use client";
import CategoriesForMen from "./CategoriesForMen";
import CategoriesForWomen from "./CategoriesForWomen";
import FastionBetter from "./FastionBetter";
import Feedback from "./Feedback";
import LimeLight from "./LimeLight";
import NewArrival from "./NewArrival";
import SummerValuePack from "./SummerValuePack";

const Home = () => {
  return (
    <>
      <SummerValuePack />
      <div className="flex flex-col  md:gap-20 lg:gap-25 justify-center items-center mt-16 md:mt-20 lg:mt-25 px-4">
        <NewArrival />
        <FastionBetter />
        <CategoriesForMen />
        <CategoriesForWomen />
        <LimeLight />
        <Feedback />
      </div>
    </>
  );
};

export default Home;
