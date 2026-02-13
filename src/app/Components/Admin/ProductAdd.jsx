"use client"
import React, { useState } from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import axios from 'axios';
import { LoadingOutlined } from '@ant-design/icons';

const { Option } = Select;

const ProductAdd = () => {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/product/createProduct`, {
        title: values.title,
        productName: values.productName,
        category: values.category,
        type: values.type,
        images: imageUrl,
        price: values.price
      });

      console.log('Response status:', response.status);

      if (response.status === 201) {
        message.success('Product created successfully');
        form.resetFields();
        setImageUrl("");
        const inputField = document.querySelector('input[type="file"]');
        if (inputField) {
          inputField.value = "";
        }
      } else {
        message.error('Failed to create product');
      }
    } catch (error) {
      console.error('Error creating product:', error);
      message.error('Failed to create product');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    try {
      const imageData = new FormData();
      imageData.append('file', file);
      imageData.append('upload_preset', 'e_commerce_Images');

      const response = await axios.post('https://api.cloudinary.com/v1_1/dbt3nqg5f/image/upload', imageData);

      if (response.status === 200) {
        const imageURL = response.data.secure_url;
        setImageUrl(imageURL);
      } else {
        message.error('Failed to upload image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      message.error('Failed to upload image');
    }
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout="vertical"
    >
      <Form.Item
        name="title"
        label="Title"
        rules={[{ required: true, message: 'Please enter the product title' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="productName"
        label="Product Name"
        rules={[{ required: true, message: 'Please enter the product name' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="price"
        label="Price"
        rules={[{ required: true, message: 'Please enter the product Price' }]}
      >
        <Input type='number' />
      </Form.Item>
      <Form.Item
        name="category"
        label="Category"
        rules={[{ required: true, message: 'Please select the product category' }]}
      >
        <Select>
          <Option value="New_Arrival">New Arrival</Option>
          <Option value="Categories_For_Men">Categories For Men</Option>
          <Option value="Categories_For_Women">Categories For Women</Option>
          <Option value="In_The_Limelight">In The Limelight</Option>
          <Option value="joggers">Joggers</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="type"
        label="Type"
        rules={[{ required: true, message: 'Please enter the product type' }]}
      >
          <Select>
          <Option value="tops">Tops</Option>
          <Option value="printed_t_shirt">Printed T-Shirt</Option>
          <Option value="plain_t_shirt">Plain T-Shirt</Option>
          <Option value="kurti">Kurti</Option>
          <Option value="jeans">Jeans</Option>
          <Option value="normalshoes">Shoes Normal</Option>
          <Option value="joggers">Joggers</Option>
          <Option value="snackers">Snackers</Option>
        </Select>
      </Form.Item>
      <Form.Item label="Upload">
        <input type="file" onChange={handleImageUpload} />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" loading={loading} icon={loading ? <LoadingOutlined /> : undefined}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProductAdd;
