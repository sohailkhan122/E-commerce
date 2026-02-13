'use client'
import { RollbackOutlined } from '@ant-design/icons';
import { Button, Table, Spin } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const OrderDetails = ({ orderId, setSelectedOrderId }) => {
  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/order/getOrderById/${orderId}`);
        setOrder(response.data.order);
        setLoading(false);
      } catch (error) {
        console.log('Error fetching orders:', error);
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const columns = [
    {
      title: 'Images',
      dataIndex: 'images',
      key: 'images',
      render: images => (
        <img src={images} alt="Product" style={{ width: '50px' }} />
      ),
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Size',
      dataIndex: 'size',
      key: 'size',
    },
    {
      title: 'Color',
      dataIndex: 'color',
      key: 'color',
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
    },
  ];

  return (
    <div>
      <div>
        <Button onClick={() => setSelectedOrderId(null)} icon={<RollbackOutlined />} />
      </div>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Table
          dataSource={order.productDetails}
          columns={columns}
          pagination={false}
          rowKey="_id"
        />
      )}
    </div>
  );
}

export default OrderDetails;
