'use client'
import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { getAllUsers } from '@/app/api/user';

const UserLogin = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true); // ✅ optional loading state

    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const response = await getAllUsers();
                const filteredUsers = response.filter(user => !user.isAdmin);
                setUsers(filteredUsers); // or response.data depending on your API
            } catch (error) {
                console.error('Failed to fetch users:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAllUsers();
    }, []);

    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name', align: 'left' },
        { title: 'Email', dataIndex: 'email', key: 'email', align: 'left' },
        { title: 'Last Name', dataIndex: 'lastname', key: 'lastname', align: 'left' },
        { title: 'Region', dataIndex: 'region', key: 'region', align: 'center' },
        { title: 'Company Name', dataIndex: 'companyname', key: 'companyname', align: 'left' },
        { title: 'Street Address', dataIndex: 'streetadress', key: 'streetadress', align: 'left' },
        { title: 'City', dataIndex: 'city', key: 'city', align: 'center' },
        { title: 'State', dataIndex: 'state', key: 'state', align: 'center' },
        { title: 'Phone', dataIndex: 'phone', key: 'phone', align: 'center' },
        { title: 'Postal Code', dataIndex: 'postalcode', key: 'postalcode', align: 'center' },
    ];

    return (
        <Table
            columns={columns}
            dataSource={users}
            rowKey="_id"
            loading={loading} // shows spinner while fetching
            scroll={{ x: 'max-content' }} // ✅ horizontal scroll for responsiveness
            bordered
        />
    );
};

export default UserLogin;