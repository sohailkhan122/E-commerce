'use client'
import React, { useState } from 'react';
import { Button, Form, Input, Spin, message } from 'antd';
import { useRouter } from 'next/navigation';
import axios from 'axios';


const AdminLogin = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/admin/loginAdmin`, values);
      message.success("Succesfully Login")
      router.push('/admin')
    } catch (error) {
      message.error("Login Failed")
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <header style={{ width: '100%', height: '60px', display: 'flex', alignItems: 'center' }} >
        <div style={{ width: '100%', justifyContent: 'space-around', gap: '100px' }} className="headerContent">
          <div>
            <img
              style={{ width: "91.16px", height: "45px", objectFit: 'cover' }}
              src="/Images/Logo.png"
              alt="Picture of the Logo"
            />
          </div>
          <div className="headerButton">
            <Button onClick={() => router.push('/login')}>Login</Button>
            <Button onClick={() => router.push('/signin')}>SignUp</Button>
            <Button style={{ backgroundColor: 'red', color: 'white' }} onClick={() => router.push('/admin_login')}>Admin</Button>
          </div>
        </div>
      </header>
      <section style={{ width: '100%', height: 'calc(100vh - 60px)', display: 'flex', gap: '100px', alignItems: 'center', border: '1px solid lightgray' }}>
        <img style={{ height: '100%', width: '48%', objectFit: 'fill' }} src="/Images/SignUp.png" alt="" />
        <div style={{ width: '567px', height: '100%', display: 'flex', flexDirection: 'column', gap: '20px', justifyContent: 'center' }}>
          <h1 style={{ color: '#333333', fontSize: '34px', fontWeight: '600' }}>Admin</h1>
          <p style={{ color: '#666666CC', fontSize: '16px', fontWeight: '500' }}>Admin for free to access to in any of our products </p>
          <Form
            style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Name"
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your Name!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your Email!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item style={{ position: 'relative' }}>
              {loading ? (
                <Spin style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
              ) : (
                <Button style={{ width: '100%', backgroundColor: "#8A33FD" }} type="primary" htmlType="submit">
                  Submit
                </Button>
              )}
            </Form.Item>
          </Form>
        </div>
      </section>
    </div>
  );
};

export default AdminLogin;
