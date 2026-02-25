'use client'
import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { CheckSquareOutlined } from '@ant-design/icons';
import OrderDetails from './OrderDetails';
import { getAllOrders, updateOrderStatus } from '@/app/api/order';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null); // ✅ full order object
  const [loadingOrders, setLoadingOrders] = useState({});

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const response = await getAllOrders();
        setOrders(response.orders || []);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      }
    };
    fetchAllOrders();
  }, []);

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      setLoadingOrders(prev => ({ ...prev, [orderId]: true }));
      await updateOrderStatus(orderId, newStatus);
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error('Error updating order status:', error);
    } finally {
      setLoadingOrders(prev => ({ ...prev, [orderId]: false }));
    }
  };

  const renderActionButton = (status, orderId) => {
    const isLoading = loadingOrders[orderId];
    switch (status) {
      case 'pending':
        return (
          <Button
            onClick={() => handleUpdateStatus(orderId, 'processing')}
            className="bg-yellow-400 hover:bg-yellow-500 text-white"
            loading={isLoading}
          >
            Processing
          </Button>
        );
      case 'processing':
        return (
          <Button
            onClick={() => handleUpdateStatus(orderId, 'shipped')}
            className="bg-blue-500 hover:bg-blue-600 text-white"
            loading={isLoading}
          >
            Shipped
          </Button>
        );
      case 'shipped':
        return (
          <Button
            onClick={() => handleUpdateStatus(orderId, 'delivered')}
            className="bg-green-500 hover:bg-green-600 text-white"
            loading={isLoading}
          >
            Delivered
          </Button>
        );
      default:
        return (
          <div className="flex items-center gap-2 text-gray-600">
            <CheckSquareOutlined /> <span>Done</span>
          </div>
        );
    }
  };

  // 🔹 Counters for summary cards
  const pending = orders.filter(o => o.status === 'pending').length;
  const processing = orders.filter(o => o.status === 'processing').length;
  const shipped = orders.filter(o => o.status === 'shipped').length;
  const delivered = orders.filter(o => o.status === 'delivered').length;

  if (selectedOrder) {
    // ✅ Pass the full order object
    return <OrderDetails selectedOrder={selectedOrder} setSelectedOrder={setSelectedOrder} />;
  }

  return (
    <div className="p-4 space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Pending Orders', count: pending, color: 'bg-yellow-400' },
          { label: 'Processing Orders', count: processing, color: 'bg-blue-500' },
          { label: 'Shipped Orders', count: shipped, color: 'bg-indigo-500' },
          { label: 'Delivered Orders', count: delivered, color: 'bg-green-500' }
        ].map((item, idx) => (
          <div key={idx} className={`flex flex-col justify-center items-center p-4 rounded-xl shadow-md text-white ${item.color} h-40`}>
            <h2 className="text-xl font-semibold text-center">{item.label}</h2>
            <h1 className="text-3xl font-bold">{item.count}</h1>
          </div>
        ))}
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left border-b">Order ID</th>
              <th className="py-2 px-4 text-left border-b">User Name</th>
              <th className="py-2 px-4 text-left border-b">Email</th>
              <th className="py-2 px-4 text-left border-b">Total</th>
              <th className="py-2 px-4 text-left border-b">Status</th>
              <th className="py-2 px-4 text-left border-b">View</th>
              <th className="py-2 px-4 text-left border-b">Update Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{order._id.slice(0, 6)}</td>
                <td className="py-2 px-4 border-b">{order.userId?.name || 'N/A'}</td>
                <td className="py-2 px-4 border-b">{order.userId?.email || 'N/A'}</td>
                <td className="py-2 px-4 border-b">${order.total}</td>
                <td className="py-2 px-4 border-b capitalize">{order.status}</td>
                <td className="py-2 px-4 border-b">
                  <Button
                    onClick={() => setSelectedOrder(order)} // ✅ pass the full order
                    className="bg-gray-500 hover:bg-gray-600 text-white"
                  >
                    View
                  </Button>
                </td>
                <td className="py-2 px-4 border-b">{renderActionButton(order.status, order._id)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList;