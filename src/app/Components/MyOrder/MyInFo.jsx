"use client";
import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Select, message, Skeleton } from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";

const MyInfo = () => {
    const userId =
        typeof window !== "undefined"
            ? JSON.parse(localStorage.getItem("userData"))._id
            : null;
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState(null);
    const [showForm, setShowForm] = useState(false);


    useEffect(() => {
        if (!userId) return;
        const getUserById = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/user/getUserById/${userId}`
                );
                setUserData(response.data);
            } catch (error) {
                console.error("Error fetching user by ID:", error);
            }
        };
        getUserById();
    }, [userId]);

    const onFinish = async (values) => {
        try {
            setLoading(true);
            await axios.put(
                `${process.env.NEXT_PUBLIC_API_URL}/user/updateUser/${userId}`,
                values
            );
            message.success("User information updated successfully");
            setShowForm(false); // hide form after update
            setUserData({ ...userData, ...values }); // update displayed info
        } catch (error) {
            message.error("Failed to update user information");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (!userData) {
        return <Skeleton active paragraph={{ rows: 10 }} />;
    }

    return (
        <div className="w-full max-w-5xl mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-6">My Info</h2>

            {!showForm ? (
                <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
                    {/* Display user information */}
                    {Object.entries({
                        "First Name": userData.name,
                        "Last Name": userData.lastname,
                        Email: userData.email,
                        Phone: userData.phone,
                        Address: `${userData.streetadress}, ${userData.city}, ${userData.state}`,
                        "Delivery Instruction": userData.deliveryinstruction,
                    }).map(([label, value]) => (
                        <p key={label}>
                            <span className="font-semibold">{label}: </span>
                            {value || "-"}
                        </p>
                    ))}

                    <Button
                        type="primary"
                        className="mt-4 w-full md:w-auto"
                        onClick={() => setShowForm(true)}
                    >
                        Update Information
                    </Button>
                </div>
            ) : (
                <Form
                    name="billing"
                    layout="vertical"
                    onFinish={onFinish}
                    initialValues={userData}
                    className="flex flex-wrap gap-4"
                >
                    <Form.Item
                        name="name"
                        label="First Name"
                        rules={[{ required: true, message: "Please input your name!" }]}
                        className="w-full md:w-[48%]"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="lastname"
                        label="Last Name"
                        rules={[
                            { required: true, message: "Please input your last name!" },
                        ]}
                        className="w-full md:w-[48%]"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="region"
                        label="Country / Region"
                        rules={[
                            { required: true, message: "Please input your region!" },
                        ]}
                        className="w-full md:w-[48%]"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="companyname"
                        label="Company Name"
                        rules={[
                            { required: true, message: "Please input your company name!" },
                        ]}
                        className="w-full md:w-[48%]"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="streetadress"
                        label="Street Address"
                        rules={[
                            { required: true, message: "Please input your street address!" },
                        ]}
                        className="w-full md:w-[48%]"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="unit"
                        label="Apt, Suite, Unit"
                        rules={[
                            { required: true, message: "Please input your unit!" },
                        ]}
                        className="w-full md:w-[48%]"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="city"
                        label="City"
                        rules={[{ required: true, message: "Please input your city!" }]}
                        className="w-full md:w-[48%]"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="state"
                        label="State"
                        rules={[
                            { required: true, message: "Please select your state!" },
                        ]}
                        className="w-full md:w-[48%]"
                    >
                        <Select
                            placeholder="Select State"
                            showSearch
                            optionFilterProp="children"
                            className="w-full"
                            options={[
                                { label: "Pakistan", value: "Pakistan" },
                                { label: "India", value: "India" },
                                { label: "Turkey", value: "Turkey" },
                            ]}
                        />
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        label="Phone"
                        rules={[
                            { required: true, message: "Please input your phone number!" },
                        ]}
                        className="w-full md:w-[48%]"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="postalcode"
                        label="Postal Code"
                        rules={[
                            { required: true, message: "Please input your postal code!" },
                        ]}
                        className="w-full md:w-[48%]"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="deliveryinstruction"
                        label="Delivery Instruction"
                        rules={[
                            {
                                required: true,
                                message: "Please input delivery instruction!",
                            },
                        ]}
                        className="w-full"
                    >
                        <TextArea rows={4} />
                    </Form.Item>

                    <Form.Item
                        name="remember"
                        valuePropName="checked"
                        className="w-full"
                    >
                        <Checkbox>Set as default shipping address</Checkbox>
                    </Form.Item>
                    <Form.Item className="w-full">
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            className="w-full"
                        >
                            Update Information
                        </Button>
                        <Button
                            type="default"
                            htmlType="button"
                            onClick={() => setShowForm(false)}
                            className="w-full mt-2"
                        >
                            Cancel
                        </Button>
                    </Form.Item>
                </Form>
            )}
        </div>
    );
};

export default MyInfo;
