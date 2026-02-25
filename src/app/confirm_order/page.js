'use client';
import { useContext, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button, Result, Skeleton } from 'antd';
import { payment } from '../api/payment';
import noteContext from '@/context/noteContext';

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const session_id = searchParams.get('session_id');
  const { setRefresh } = useContext(noteContext);

  const [loading, setLoading] = useState(true);
  const [paymentData, setPaymentData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!session_id) return;

    const fetchPayment = async () => {
      try {
        const res = await payment(session_id);
        setRefresh(prev => !prev); // Trigger global refresh to update cart/wishlist
        setPaymentData(res);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPayment();
  }, [session_id]);

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md p-6">
          <Skeleton active paragraph={{ rows: 4 }} />
        </div>
      </div>
    );
  }

  if (error || !paymentData) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <Result
          status="error"
          title="Payment Verification Failed"
          extra={[
            <Button type="primary" key="home" onClick={() => router.push('/')}>
              Go Home
            </Button>,
          ]}
        />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <Result
        status="success"
        title="Payment Successful 🎉"
        subTitle={`Transaction ID: ${paymentData.id}`}
        extra={[
          <Button type="primary" key="home" onClick={() => router.push('/')}>
            Go Home
          </Button>,
        ]}
      />
    </div>
  );
};

export default Page;