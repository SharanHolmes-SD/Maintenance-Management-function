import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './css/home.css';

export default function AllMainDetails() {
  // const [orders, setOrders] = useState([]);
  // const [searchQuery, setSearchQuery] = useState('');

  // const [filteredOrders, setFilteredOrders] = useState([]);

  // useEffect(() => {
  //   fetchOrders();
  // }, []);

  // const fetchOrders = async () => {
  //   try {
  //     const response = await fetch(`/api/auth/users/items`);
  //     if (!response.ok) {
  //       throw new Error('Failed to fetch orders');
  //     }
  //     const data = await response.json();
  //     setOrders(data);
  //     // Initially set filtered orders to all orders
  //     setFilteredOrders(data);
  //   } catch (error) {
  //     console.error('Error fetching orders:', error);
  //   }
  // };

  // const handleSearch = (e) => {
  //   filterdata(searchQuery)
  // }
  //   const filterdata=(searchQuery)=>{
  //     const filterData=filteredOrders.filter(customer=>
  //       customer.productName&&customer.productName.toLowerCase().includes(searchQuery.toLowerCase())
  //     );
  //     setFilteredOrders(filterData)
 


   
  // };



  
  return (
    // Import CSS for styling
    
<div className="maintenance-home">
  {/* Hero Section */}
  <div className="hero">
    <h1>Effortless Maintenance Management</h1>
    <p>Track service requests, schedule maintenance, and ensure operational efficiency with ease.</p>
    <button className="cta-button"><a href='/alldetails'>View All Maintenances</a></button>
  </div>

  {/* About Maintenance Section */}
  <div className="about-maintenance">
    <h2>Why Maintenance Management Matters</h2>
    <p>Regular maintenance ensures safety, efficiency, and cost savings. Our system helps you streamline service requests, track issues, and prevent breakdowns before they happen.</p>
  </div>

  {/* Features Section */}
  <div className="features">
    <div className="feature-card">
      <h3>📋 Reliable Service Requests</h3>
      <p>Easily submit and track maintenance requests in real-time with instant notifications.</p>
    </div>
    <div className="feature-card">
      <h3>🛠️ Preventive Maintenance</h3>
      <p>Schedule routine maintenance to reduce unexpected breakdowns and costly repairs.</p>
    </div>
    <div className="feature-card">
      <h3>📊 Detailed Reports & Analytics</h3>
      <p>Generate insightful reports on maintenance history, costs, and trends for better decision-making.</p>
    </div>
    <div className="feature-card">
      <h3>🚀 Faster Issue Resolution</h3>
      <p>Automate service requests, assign tasks to technicians, and get real-time updates.</p>
    </div>
  </div>

  {/* How It Works Section */}
  <div className="how-it-works">
    <h2>How It Works</h2>
    <ol>
      <li><strong>Submit a Request:</strong> Report an issue with details and urgency level.</li>
      <li><strong>Get Assigned:</strong> A technician reviews the request and schedules maintenance.</li>
      <li><strong>Track Progress:</strong> Get real-time updates and estimated completion times.</li>
      <li><strong>Review & Report:</strong> Once completed, receive reports and feedback options.</li>
    </ol>
  </div>

  {/* Customer Testimonials Section */}
  <div className="testimonials">
    <h2>What Our Clients Say</h2>
    <div className="testimonial-card">
      <p>"This platform has transformed the way we handle maintenance. Everything is streamlined, and we save so much time!"</p>
      <strong>— Alex Johnson, Operations Manager</strong>
    </div>
    <div className="testimonial-card">
      <p>"Scheduling preventive maintenance has never been easier. Our equipment runs smoothly, and costs have reduced significantly."</p>
      <strong>— Sarah Thompson, Facility Manager</strong>
    </div>
  </div>

  {/* Call-to-Action Section */}
  <div className="cta-section">
    <h2>Keep Your Operations Running Smoothly</h2>
    <p>Join thousands of businesses using our platform for effortless maintenance management.</p>
    <button className="cta-button"><a href='/sign-up'>Get Started Today</a></button>
  </div>
</div>

  
    
    
  );
}
