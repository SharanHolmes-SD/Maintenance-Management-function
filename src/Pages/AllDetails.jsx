import React, { useState, useEffect } from 'react';
import { Table } from 'flowbite-react';

export default function AllDetails() {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredOrders, setFilteredOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`/api/auth/users/items`);
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      const data = await response.json();
      setOrders(data);
      setFilteredOrders(data); // Set filtered orders initially to all orders
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleSearch = () => {
    const filteredData = orders.filter(order =>
      order.m_mail?.toLowerCase()?.includes(searchQuery.toLowerCase())
    );
    setFilteredOrders(filteredData);
  };

  return (
    <div className="table-auto p-4">
      {/* Search Bar */}
      <div className="flex mb-4 space-x-2">
        <input
          type="text"
          placeholder="Search by Email"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <button 
          onClick={handleSearch} 
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      <h2 className="my-8 text-center font-bold text-4xl text-gray-800">Maintenance Details</h2>

      {filteredOrders.length > 0 ? (
        <Table hoverable className="shadow-md w-full">
          <Table.Head>
            <Table.HeadCell>Contact</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Bus Details</Table.HeadCell>
            <Table.HeadCell>Maintenance Type</Table.HeadCell>
            <Table.HeadCell>Issue Description</Table.HeadCell>
            <Table.HeadCell>Service Date</Table.HeadCell>
            <Table.HeadCell>Urgency Level</Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {filteredOrders.map((order) => (
              <Table.Row key={order._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>{order.contact}</Table.Cell>
                <Table.Cell>{order.m_mail}</Table.Cell>
                <Table.Cell>{order.bus_details}</Table.Cell>
                <Table.Cell>{order.main_type}</Table.Cell>
                <Table.Cell>{order.issue_des}</Table.Cell>
                <Table.Cell>{order.ser_date}</Table.Cell>
                <Table.Cell>{order.urg_level}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      ) : (
        <p className="text-center text-gray-600">No maintenance records found.</p>
      )}
    </div>
  );
}
