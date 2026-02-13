"use client"
import React, { useEffect, useState } from 'react';
import { Spin, Table, Button, Popconfirm, message, Input, Form, Select } from 'antd';
import axios from 'axios';

const { Option } = Select;

const UpdateProduct = () => {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [deleteLoading, setDeleteLoading] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [editedProduct, setEditedProduct] = useState(null);
    const [form] = Form.useForm();
    const [refresh, setRefresh] = useState(false);
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/product/getAllProducts`);
                setProducts(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [refresh]);

    const handleDelete = async (productId) => {
        try {
            setDeleteLoading(prevState => ({ ...prevState, [productId]: true }));
            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/product/deleteProducts/${productId}`);
            setProducts(products.filter(product => product._id !== productId));
            message.success('Product deleted successfully');
        } catch (error) {
            console.error('Error deleting product:', error);
            message.error('Failed to delete product');
        } finally {
            setDeleteLoading(prevState => ({ ...prevState, [productId]: false }));
        }
    };

    const handleEdit = (product) => {
        setEditMode(true);
        setEditedProduct(product);
        console.log(product.images)
        setImageUrl(product.images);
        form.setFieldsValue({
            title: product.title,
            productName: product.productName,
            price: product.price,
            category: product.category,
            type: product.type
        });
    };


    const handleSave = async () => {
        try {
            const values = await form.validateFields();
            const updatedProduct = { ...editedProduct, ...values, images: imageUrl };
            await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/product/editProduct/${editedProduct._id}`, updatedProduct);
            message.success('Product updated successfully');
            setRefresh(!refresh);
            setEditMode(false);
            setEditedProduct(null);
        } catch (error) {
            console.error('Error updating product:', error);
            message.error('Failed to update product');
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

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Product Name',
            dataIndex: 'productName',
            key: 'productName',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (price) => `$${price}`
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Image',
            dataIndex: 'images',
            key: 'images',
            render: (images) => (
                <img src={images} alt="Product" style={{ width: 50 }} />
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <span>
                    <Button type="primary" onClick={() => handleEdit(record)}>Edit</Button>
                    <Popconfirm
                        title="Are you sure to delete this product?"
                        onConfirm={() => handleDelete(record._id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="danger" style={{ marginLeft: 8 }} loading={deleteLoading[record._id]}>Delete</Button>
                    </Popconfirm>
                </span>
            ),
        },
    ];

    return (
        <div>
            {loading ? (
                <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center' }}>
                    <Spin size="large" />
                </div>
            ) : (
                editMode ? (
                    <div>
                        <Form
                            form={form}
                            onFinish={handleSave}
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
                                <div style={{ display: 'flex', gap: '20px' }}>
                                    <Button type="primary" htmlType="submit">
                                        Submit
                                    </Button>
                                    <Button onClick={() => setEditMode(false)} >
                                        Cancel
                                    </Button>
                                </div>
                            </Form.Item>
                        </Form>
                    </div>
                ) : (
                    <Table dataSource={products} columns={columns} rowKey="_id" />
                )
            )}
        </div>
    );
};

export default UpdateProduct;
