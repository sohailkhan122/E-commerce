'use client'
import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import axios from 'axios';

const UserLogin = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/getAllUsers`);
                setUsers(response.data.data)
            } catch (error) {
                console.error('Failed to fetch users:', error);
            }
        };
        fetchAllUsers();
    }, [users]);

    const columns = [
        {
            title: 'UserID',
            dataIndex: '_id',
            key: '_id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Last Name',
            dataIndex: 'lastname',
            key: 'lastname',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Region',
            dataIndex: 'region',
            key: 'region',
        },
        {
            title: 'Company Name',
            dataIndex: 'companyname',
            key: 'companyname',
        },
        {
            title: 'Street Adress',
            dataIndex: 'streetadress',
            key: 'streetadress',
        },
        {
            title: 'City',
            dataIndex: 'city',
            key: 'city',
        },
        {
            title: 'State',
            dataIndex: 'state',
            key: 'state',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Postal Code',
            dataIndex: 'postalcode',
            key: 'postalcode',
        },
    ];

    return (
        <Table columns={columns} dataSource={users} rowKey="_id" />
    );
};

export default UserLogin;
