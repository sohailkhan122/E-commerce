'use client'
import React from 'react'
import { RollbackOutlined } from '@ant-design/icons'

const OrderDetails = ({ selectedOrder, setSelectedOrder }) => {
  if (!selectedOrder) return null

  const { userId, shippingAddress, payment, products, total, status, createdAt } = selectedOrder

  return (
    <div className="p-4 space-y-6">
      {/* Back Button */}
      <div>
        <button
          onClick={() => setSelectedOrder(null)}
          className="flex items-center gap-2 text-white bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded"
        >
          <RollbackOutlined /> Back to Orders
        </button>
      </div>

      {/* Order Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Info */}
        <div className="p-4 border rounded-lg shadow-sm bg-white">
          <h2 className="text-lg font-semibold mb-2">User Info</h2>
          <p><span className="font-medium">Name:</span> {userId?.name}</p>
          <p><span className="font-medium">Email:</span> {userId?.email}</p>
          <p><span className="font-medium">Phone:</span> {userId?.phone || 'N/A'}</p>
        </div>

        {/* Shipping Info */}
        <div className="p-4 border rounded-lg shadow-sm bg-white">
          <h2 className="text-lg font-semibold mb-2">Shipping Address</h2>
          <p><span className="font-medium">Country:</span> {shippingAddress?.country}</p>
          <p><span className="font-medium">State:</span> {shippingAddress?.state}</p>
          <p><span className="font-medium">City:</span> {shippingAddress?.city}</p>
          <p><span className="font-medium">Phone:</span> {shippingAddress?.phone}</p>
        </div>

        {/* Payment Info */}
        <div className="p-4 border rounded-lg shadow-sm bg-white">
          <h2 className="text-lg font-semibold mb-2">Payment Info</h2>
          <p><span className="font-medium">Method:</span> {payment?.method}</p>
          <p><span className="font-medium">Status:</span> {payment?.status}</p>
          <p><span className="font-medium">Transaction ID:</span> {payment?.transactionId}</p>
          <p><span className="font-medium">Currency:</span> {payment?.currency}</p>
          <p><span className="font-medium">Paid At:</span> {new Date(payment?.paidAt).toLocaleString()}</p>
          <p><span className="font-medium">Email:</span> {payment?.email}</p>
        </div>

        {/* Order Info */}
        <div className="p-4 border rounded-lg shadow-sm bg-white">
          <h2 className="text-lg font-semibold mb-2">Order Info</h2>
          <p><span className="font-medium">Order ID:</span> {selectedOrder._id.slice(0, 6)}</p>
          <p><span className="font-medium">Total:</span> ${total}</p>
          <p><span className="font-medium">Status:</span> {status}</p>
          <p><span className="font-medium">Created At:</span> {new Date(createdAt).toLocaleString()}</p>
        </div>
      </div>

      {/* Products Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b text-left">Image</th>
              <th className="py-2 px-4 border-b text-left">Title</th>
              <th className="py-2 px-4 border-b text-left">Size</th>
              <th className="py-2 px-4 border-b text-left">Color</th>
              <th className="py-2 px-4 border-b text-left">Quantity</th>
              <th className="py-2 px-4 border-b text-left">Price</th>
              <th className="py-2 px-4 border-b text-left">Category</th>
              <th className="py-2 px-4 border-b text-left">Type</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">
                  <img src={p.images[0]} alt={p.title} className="w-16 h-16 object-cover rounded" />
                </td>
                <td className="py-2 px-4 border-b">{p.title}</td>
                <td className="py-2 px-4 border-b">{p.size}</td>
                <td className="py-2 px-4 border-b">
                  <div className="w-6 h-6 rounded-full" style={{ backgroundColor: p.color }}></div>
                </td>
                <td className="py-2 px-4 border-b">{p.quantity}</td>
                <td className="py-2 px-4 border-b">${p.price}</td>
                <td className="py-2 px-4 border-b">{p.category}</td>
                <td className="py-2 px-4 border-b">{p.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default OrderDetails