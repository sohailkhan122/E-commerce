"use client";
import React, { useState, useRef } from "react";
import { Form, Input, Button, Select, InputNumber, message, Row, Col, Card, Spin } from "antd";
import { LoadingOutlined, CloseOutlined } from "@ant-design/icons";
import axios from "axios";
import { createProduct } from "@/app/api/product";

const { Option } = Select;

// ✅ Enum values from model
const categories = ["Men", "Women", "Shoes", "Accessories", "NewArrivals", "InTheLimelight"];
const types = [
  "Tops", "PrintedT-Shirt", "PlainT-Shirt", "Kurti", "Jeans", "Trousers", "Shorts", "Skirts",
  "Dresses", "Jumpsuits", "Sneakers", "Boots", "Sandals", "Heels", "Bags", "Watches", "Jewelry"
];

const ProductAdd = () => {
  const [form] = Form.useForm();
  const [images, setImages] = useState([]); // { file, uploading, url }
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null); // ✅ Ref to reset file input

  // ✅ Handle Multiple Image Upload
  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({ file, uploading: true, url: null }));
    setImages(prev => [...prev, ...newImages]);

    for (let i = 0; i < newImages.length; i++) {
      const image = newImages[i];
      const imageData = new FormData();
      imageData.append("file", image.file);
      imageData.append("upload_preset", "e_commerce_Images"); // make sure this is unsigned

      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dbt3nqg5f/image/upload",
          imageData
        );

        setImages(prev =>
          prev.map(img =>
            img.file === image.file
              ? { ...img, uploading: false, url: response.data.secure_url }
              : img
          )
        );
      } catch (error) {
        message.error("Image upload failed");
        setImages(prev => prev.filter(img => img.file !== image.file));
      }
    }
  };

  // ✅ Remove an image
  const removeImage = (file) => {
    setImages(prev => prev.filter(img => img.file !== file));
  };

  // ✅ Submit Form
  const onFinish = async (values) => {
    const uploadedImages = images.filter(img => img.url).map(img => img.url);

    // Backend default image will handle empty array
    try {
      setLoading(true);
      await createProduct({
        ...values,
        images: uploadedImages.length > 0 ? uploadedImages : [],
      });

      message.success("Product created successfully");
      form.resetFields();
      setImages([]);

      // ✅ Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
    } catch (error) {
      message.error(error.response?.data?.message || "Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  const isUploading = images.some(img => img.uploading); // disable button only if uploading

  return (
    <Row justify="center" style={{ padding: "20px" }}>
      <Col xs={24} sm={22} md={20} lg={16} xl={14}>
        <Card title="Add New Product" bordered={false}>
          <Form form={form} layout="vertical" onFinish={onFinish} initialValues={{ isActive: true }}>

            {/* Title & Product Name */}
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item name="title" label="Title" rules={[{ required: true, message: "Enter title" }]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item name="productName" label="Product Name" rules={[{ required: true, message: "Enter product name" }]}>
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            {/* Price & Stock */}
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item name="price" label="Price" rules={[{ required: true, message: "Enter price" }]}>
                  <InputNumber style={{ width: "100%" }} min={0} />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item name="stock" label="Stock" rules={[{ required: true, message: "Enter stock" }]}>
                  <InputNumber style={{ width: "100%" }} min={0} />
                </Form.Item>
              </Col>
            </Row>

            {/* Category & Type */}
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item name="category" label="Category" rules={[{ required: true, message: "Select category" }]}>
                  <Select placeholder="Select category">
                    {categories.map(cat => <Option key={cat} value={cat}>{cat}</Option>)}
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item name="type" label="Type" rules={[{ required: true, message: "Select type" }]}>
                  <Select placeholder="Select type">
                    {types.map(t => <Option key={t} value={t}>{t}</Option>)}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            {/* Status */}
            <Form.Item name="isActive" label="Product Status">
              <Select>
                <Option value={true}>Active</Option>
                <Option value={false}>Inactive</Option>
              </Select>
            </Form.Item>

            {/* Upload Images */}
            <Form.Item label="Upload Images">
              <input
                type="file"
                multiple
                onChange={handleImageUpload}
                ref={fileInputRef} // ✅ attach ref to reset
              />
            </Form.Item>

            {/* Preview Images */}
            <Row gutter={10}>
              {images.map((img, index) => (
                <Col key={index} style={{ position: "relative" }}>
                  {img.uploading && (
                    <div style={{
                      position: "absolute",
                      top: 0, left: 0, right: 0, bottom: 0,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      background: "rgba(255,255,255,0.7)",
                      borderRadius: "6px",
                    }}>
                      <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
                    </div>
                  )}
                  <img
                    src={img.url || URL.createObjectURL(img.file)}
                    alt="preview"
                    width={80}
                    height={80}
                    style={{ objectFit: "cover", borderRadius: "6px" }}
                  />
                  <CloseOutlined
                    onClick={() => removeImage(img.file)}
                    style={{
                      position: "absolute",
                      top: -5,
                      right: -5,
                      color: "red",
                      cursor: "pointer",
                      fontSize: 16,
                    }}
                  />
                </Col>
              ))}
            </Row>

            {/* Submit */}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={loading}
                disabled={isUploading} // ✅ disable only if uploading
              >
                Create Product
              </Button>
            </Form.Item>

          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default ProductAdd;