"use client";
import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Select, message, Skeleton } from "antd";
import TextArea from "antd/es/input/TextArea";
import { getCurrentUser, updateUser } from "@/app/api/user";

const MyInfo = () => {
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [userData, setUserData] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedState, setSelectedState] = useState(null);
    const [form] = Form.useForm();

    const countryData = {
        Pakistan: {
            provinces: ["Punjab", "Sindh", "Khyber Pakhtunkhwa", "Balochistan"],
            cities: {
                Punjab: ["Lahore", "Faisalabad", "Rawalpindi"],
                Sindh: ["Karachi", "Hyderabad", "Sukkur"],
                "Khyber Pakhtunkhwa": ["Peshawar", "Abbottabad", "Mardan"],
                Balochistan: ["Quetta", "Gwadar", "Sibi"],
            },
        },
        USA: {
            states: ["California", "Texas", "New York", "Florida"],
            cities: {
                California: ["Los Angeles", "San Francisco", "San Diego"],
                Texas: ["Houston", "Dallas", "Austin"],
                "New York": ["New York City", "Buffalo", "Rochester"],
                Florida: ["Miami", "Orlando", "Tampa"],
            },
        },
    };


    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await getCurrentUser();
                setUserData(res.user);
            } catch (error) {
                console.error("Error fetching user by ID:", error);
            }
        };
        getUser();
    }, []);

    const onFinish = async (values) => {
        try {
            setLoading(true);
            const res = await updateUser(values);
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
                        label="Country"
                        rules={[{ required: true, message: "Please select a country" }]}
                        className="w-full sm:w-full md:w-[48%]"
                    >
                        <Select
                            placeholder="Select Country"
                            onChange={(value) => {
                                setSelectedCountry(value);
                                form.setFieldsValue({ state: undefined, city: undefined }); // reset state & city
                            }}
                        >
                            {Object.keys(countryData).map((country) => (
                                <Select.Option key={country} value={country}>
                                    {country}
                                </Select.Option>
                            ))}
                        </Select>
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
                        name="state"
                        label="State / Province"
                        rules={[{ required: true, message: "Please select a state" }]}
                        className="w-full sm:w-full md:w-[48%]"
                    >
                        <Select
                            placeholder="Select State"
                            disabled={!selectedCountry}
                            onChange={(value) => {
                                setSelectedState(value);
                                form.setFieldsValue({ city: undefined }); // reset city
                            }}
                        >
                            {selectedCountry &&
                                (countryData[selectedCountry].provinces || countryData[selectedCountry].states).map((state) => (
                                    <Select.Option key={state} value={state}>
                                        {state}
                                    </Select.Option>
                                ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="city"
                        label="City"
                        rules={[{ required: true, message: "Please select a city" }]}
                        className="w-full sm:w-full md:w-[48%]"
                    >
                        <Select placeholder="Select City" disabled={!selectedState}>
                            {selectedState &&
                                (countryData[selectedCountry].cities[selectedState] || []).map((city) => (
                                    <Select.Option key={city} value={city}>
                                        {city}
                                    </Select.Option>
                                ))}
                        </Select>
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
