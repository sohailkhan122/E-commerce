"use client";
import React, { useState } from "react";
import { Button, message } from "antd";
import {
  IdcardOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import OrdersOwn from "./OrdersOwn";
import OrderDetalis from "./OrderDetalis";
import MyInFo from "./MyInFo";
import { logoutUser } from "@/app/api/user";
import { useRouter } from "next/navigation";

const MyOrder = () => {
  const [value, setValue] = useState("Myorders");
  const [order, setorder] = useState([{}]);
  const router = useRouter();

  const handleLogOutClick = async () => {
    try {
      const res = await logoutUser();
      console.log("Logout response:", res);
      message.success("Logged out successfully");
      router.push("/login");
    } catch (error) {
      console.log("Logout error:", error);
      message.error("Logout failed");
    }
  };

  const handleButtonClick = (val) => {
    setValue(val);
  };
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="bg-white md:w-64 w-full flex-shrink-0 shadow-md">
        <div className="p-6 flex flex-col items-center">

          <span className="font-medium text-gray-800 mb-2">Hello Sohail</span>
          <p className="text-gray-500 text-sm text-center mb-6">
            Welcome to your Account
          </p>
        </div>
        <div className="flex flex-col gap-2 px-4 pb-4">
          <Button
            icon={<IdcardOutlined />}
            block
            onClick={() => handleButtonClick("Myorders")}
            className={`justify-start ${value === "Myorders"
              ? "bg-purple-600 text-white"
              : "bg-white text-gray-800 hover:bg-purple-100"
              }`}
          >
            My Orders
          </Button>
          <Button
            icon={<UserOutlined />}
            block
            onClick={() => handleButtonClick("myInfo")}
            className={`justify-start ${value === "myInfo"
              ? "bg-purple-600 text-white"
              : "bg-white text-gray-800 hover:bg-purple-100"
              }`}
          >
            My Info
          </Button>
          <Button
            icon={<LogoutOutlined />}
            block
            danger
            onClick={handleLogOutClick}
            className="justify-start"
          >
            Sign Out
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 md:p-8">
        {value === "myInfo" && <MyInFo />}
        {value === "Myorders" && <OrdersOwn setorder={setorder} setValue={setValue} />}
        {value === "OrdersDetails" && <OrderDetalis order={order} />}
      </div>
    </div>
  );
};

export default MyOrder;
