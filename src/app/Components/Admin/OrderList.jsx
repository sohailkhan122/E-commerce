'use client'
import React, { useEffect, useState } from 'react';
import { Button, Table, Spin } from 'antd';
import axios from 'axios';
import OrderDetails from './OrderDetails';
import { CheckSquareOutlined } from '@ant-design/icons';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pending, setPending] = useState(0);
  const [processing, setProcessing] = useState(0);
  const [shipped, setShipped] = useState(0);
  const [delivered, setDelivered] = useState(0);

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/order/fatchAllOrders`);
        setOrders(response.data);
        const filterPending = response.data.filter((item) => item.status.toLowerCase().includes('pending'));
        setPending(filterPending.length);
        const filterProcessing = response.data.filter((item) => item.status.toLowerCase().includes('processing'));
        setProcessing(filterProcessing.length);
        const filterShipped = response.data.filter((item) => item.status.toLowerCase().includes('shipped'));
        setShipped(filterShipped.length);
        const filterDelivered = response.data.filter((item) => item.status.toLowerCase().includes('delivered'));
        setDelivered(filterDelivered.length);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllOrders();
  }, [refresh]);

  const handleUpdateStatus = async (orderId, status) => {
    try {
      setLoading(true);
      const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/order/updateOrderStatus/${orderId}`, { status });
      setRefresh(prev => !prev);
      return response.data;
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const renderActionButton = (status, orderId) => {
    switch (status) {
      case 'pending':
        return <Button onClick={() => handleUpdateStatus(orderId, 'processing')}>Processing</Button>;
      case 'processing':
        return <Button onClick={() => handleUpdateStatus(orderId, 'shipped')}>Shipped</Button>;
      case 'shipped':
        return <Button onClick={() => handleUpdateStatus(orderId, 'delivered')}>Delivered</Button>;
      default:
        return (
          <>
            <CheckSquareOutlined /> <span>Done</span>
          </>
        );
    }
  };

  const columns = [
    {
      title: 'Order ID',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'User ID',
      dataIndex: 'userId',
      key: 'userId',
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <span>
          <Button onClick={() => setSelectedOrderId(record._id)}>View</Button>
        </span>
      ),
    },
    {
      title: 'Update Status',
      key: 'updateStatus',
      render: (_, record) => <span>{renderActionButton(record.status, record._id)}</span>,
    },
  ];

  return (
    <div>
      {selectedOrderId ? (
        <OrderDetails orderId={selectedOrderId} setSelectedOrderId={setSelectedOrderId} />
      ) : (
        <>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <Spin size="large" />
            </div>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
              <div style={{ width: '250px', height: '200px', boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
                <h1 style={{ fontSize: '28px', fontWeight: '700' }}>Pending Orders</h1>
                <h2 style={{ fontSize: '28px', fontWeight: '700' }}>{pending}</h2>
              </div>
              <div style={{ width: '250px', height: '200px', boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
                <h1 style={{ fontSize: '28px', fontWeight: '700' }}>Processing Orders</h1>
                <h2 style={{ fontSize: '28px', fontWeight: '700' }}>{processing}</h2>
              </div>
              <div style={{ width: '250px', height: '200px', boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
                <h1 style={{ fontSize: '28px', fontWeight: '700' }}>Shipped Orders</h1>
                <h2 style={{ fontSize: '28px', fontWeight: '700' }}>{shipped}</h2>
              </div>
              <div style={{ width: '250px', height: '200px', boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
                <h1 style={{ fontSize: '28px', fontWeight: '700' }}>Delivered Orders</h1>
                <h2 style={{ fontSize: '28px', fontWeight: '700' }}>{delivered}</h2>
              </div>
            </div>
          )}
          <Table columns={columns} dataSource={orders} rowKey="_id" />
        </>
      )}
    </div>
  );
};

export default OrderList;