"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  Spin,
  Table,
  Button,
  Popconfirm,
  message,
  Input,
  Form,
  Select,
  Row,
  Col,
  Card,
} from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { getAllProducts, updateProduct, deleteProduct } from "@/app/api/product";
import axios from "axios";

const { Option } = Select;

const categories = ["Men", "Women", "Shoes", "Accessories", "NewArrivals", "InTheLimelight"];
const types = [
  "Tops", "PrintedT-Shirt", "PlainT-Shirt", "Kurti", "Jeans", "Trousers", "Shorts", "Skirts",
  "Dresses", "Jumpsuits", "Sneakers", "Boots", "Sandals", "Heels", "Bags", "Watches", "Jewelry"
];

const UpdateProduct = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [deleteLoading, setDeleteLoading] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editedProduct, setEditedProduct] = useState(null);
  const [imageUrls, setImageUrls] = useState([]); // this is used for preview & update
  const fileInputRef = useRef(null);
  const [form] = Form.useForm();
  const [refresh, setRefresh] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (error) {
      message.error("Failed to fetch products");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [refresh]);

  const handleDelete = async (id) => {
    try {
      setDeleteLoading(prev => ({ ...prev, [id]: true }));
      await deleteProduct(id);
      message.success("Product deleted successfully");
      setRefresh(prev => !prev);
    } catch (error) {
      message.error("Failed to delete product");
      console.error(error);
    } finally {
      setDeleteLoading(prev => ({ ...prev, [id]: false }));
    }
  };

  const handleEdit = (product) => {
    setEditMode(true);
    setEditedProduct(product);
    setImageUrls(product.images || []);
    form.setFieldsValue({
      title: product.title,
      productName: product.productName,
      price: product.price,
      category: product.category,
      type: product.type,
      stock: product.stock,
      isActive: product.isActive,
    });
  };

  const handleCancel = () => {
    setEditMode(false);
    setEditedProduct(null);
    setImageUrls([]);
    form.resetFields();
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const updatedProduct = { ...editedProduct, ...values, images: imageUrls };
      await updateProduct(editedProduct._id, updatedProduct);
      message.success("Product updated successfully");
      handleCancel();
      setRefresh(prev => !prev);
    } catch (error) {
      message.error(error.response?.data?.message || "Failed to update product");
      console.error(error);
    }
  };

  // ✅ Corrected image upload
  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    const uploadedImages = [];

    for (let file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "e_commerce_Images"); // unsigned preset

      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dbt3nqg5f/image/upload",
          formData
        );
        uploadedImages.push(response.data.secure_url);
      } catch (error) {
        message.error("Image upload failed");
        console.error(error);
      }
    }

    setImageUrls(prev => [...prev, ...uploadedImages]);
  };

  const removeImage = (url) => {
    setImageUrls(prev => prev.filter(img => img !== url));
  };

  const columns = [
    { title: "Title", dataIndex: "title", key: "title", responsive: ["sm"] },
    { title: "Product Name", dataIndex: "productName", key: "productName", responsive: ["sm"] },
    { title: "Price", dataIndex: "price", key: "price", render: p => `$${p}`, responsive: ["sm"] },
    { title: "Category", dataIndex: "category", key: "category", responsive: ["md"] },
    { title: "Type", dataIndex: "type", key: "type", responsive: ["md"] },
    {
      title: "Image",
      dataIndex: "images",
      key: "images",
      render: (images) => (
        <img
          src={Array.isArray(images) ? images[0] : images}
          alt="Product"
          className="w-12 h-12 object-cover rounded"
        />
      ),
      responsive: ["sm"],
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex flex-wrap gap-2">
          <Button type="primary" onClick={() => handleEdit(record)}>Edit</Button>
          <Popconfirm title="Are you sure?" onConfirm={() => handleDelete(record._id)}>
            <Button danger loading={deleteLoading[record._id]}>Delete</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spin size="large" />
        </div>
      ) : editMode ? (
        <Card title="Update Product" className="max-w-3xl mx-auto">
          <Form form={form} layout="vertical" className="space-y-4">
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item name="title" label="Title" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item name="productName" label="Product Name" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item name="price" label="Price" rules={[{ required: true }]}>
                  <Input type="number" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item name="stock" label="Stock" rules={[{ required: true }]}>
                  <Input type="number" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item name="category" label="Category" rules={[{ required: true }]}>
                  <Select placeholder="Select category">
                    {categories.map(cat => <Option key={cat} value={cat}>{cat}</Option>)}
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item name="type" label="Type" rules={[{ required: true }]}>
                  <Select placeholder="Select type">
                    {types.map(t => <Option key={t} value={t}>{t}</Option>)}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item label="Upload Images">
              <input type="file" multiple onChange={handleImageUpload} ref={fileInputRef} />
            </Form.Item>

            <div className="flex flex-wrap gap-2 mb-4">
              {imageUrls.map((img, i) => (
                <div key={i} className="relative w-24 h-24 sm:w-20 sm:h-20">
                  <img src={img} alt="preview" className="w-full h-full object-cover rounded" />
                  <CloseOutlined
                    onClick={() => removeImage(img)}
                    className="absolute -top-2 -right-2 text-red-600 cursor-pointer"
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Button type="primary" onClick={handleSave}>Save</Button>
              <Button onClick={handleCancel}>Cancel</Button>
            </div>
          </Form>
        </Card>
      ) : (
        <Table dataSource={products} columns={columns} rowKey="_id" className="overflow-x-auto" />
      )}
    </div>
  );
};

export default UpdateProduct;