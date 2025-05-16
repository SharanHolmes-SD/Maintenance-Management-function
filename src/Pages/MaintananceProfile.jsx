import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Button, Modal, Table } from 'flowbite-react';
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link } from 'react-router-dom';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../firebase'; // Adjust the path as per your project structure
import './css/maintainprofile.css';
import { useReactToPrint } from 'react-to-print';

export default function MaintainProfile() {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);
  const [orderIdToDelete, setOrderIdToDelete] = useState('');
  const [showModal, setShowModal] = useState(false);
  const componentPDF = useRef(); // Add reference for PDF generation

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`/api/auth/mainuser/${currentUser._id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      const data = await response.json();
      setOrders(data);

      // Fetch images from Firebase for each order
      data.forEach(order => {
        if (order.profilePicture) {
          fetchFirebaseImage(order.profilePicture, 'profilePicture', order._id);
        }
        if (order.alternateProfilePicture) {
          fetchFirebaseImage(order.alternateProfilePicture, 'alternateProfilePicture', order._id);
        }
      });
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const fetchFirebaseImage = async (imageUrl, field, orderId) => {
    const storageRef = ref(storage, imageUrl);
    try {
      const downloadUrl = await getDownloadURL(storageRef);
      setOrders(prevOrders => prevOrders.map(order => {
        if (order._id === orderId) {
          return {
            ...order,
            [field]: downloadUrl
          };
        }
        return order;
      }));
    } catch (error) {
      console.error(`Error fetching image from Firebase for ${field}:`, error);
    }
  };

  const handleDeleteOrder = async () => {
    try {
      const res = await fetch(`/api/user/deleteitem/${orderIdToDelete}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setOrders((prevOrders) =>
          prevOrders.filter((order) => order._id !== orderIdToDelete)
        );
      }
      
      setShowModal(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: 'Maintenance  Report',
    onBeforeGetContent: () => {
      setIsGeneratingPDF(true);
      return Promise.resolve();
    },
    onAfterPrint: () => {
      setIsGeneratingPDF(false);
      alert('Data saved in PDF');
    }
  });

  return (
    <div className="container mt-4">
  <h2 className="text-center fw-bold fs-3 text-dark">My Informations</h2>

  <div ref={componentPDF} style={{ width: '100%' }}>
    {orders.length > 0 ? (
      <div className="table-responsive">
        <table className="table table-hover shadow-sm">
          <thead className="table-primary">
            <tr>
              <th>Contact</th>
              <th>Email</th>
              <th>Bus Details</th>
              <th>Maintenance Type</th>
              <th>Issue Description</th>
              <th>Service Date</th>
              <th>Urgency Level</th>
              {!isGeneratingPDF && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="bg-white">
                <td>{order.contact}</td>
                <td>{order.m_mail}</td>
                <td>{order.bus_details}</td>
                <td>{order.main_type}</td>
                <td>{order.issue_des}</td>
                <td>{order.ser_date}</td>
                <td>{order.urg_level}</td>
                {!isGeneratingPDF && (
                  <td>
                    <Link to={`/update-item/${order._id}`}>
                      <button className="btn btn-success btn-sm me-2">
                        <b>Edit Details</b>
                      </button>
                    </Link>
                    <button className="btn btn-danger btn-sm" onClick={() => {
                      setShowModal(true);
                      setOrderIdToDelete(order._id);
                    }}>
                      <b>Delete [Maintenance]</b>
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ) : (
      <p className="text-center text-muted">You have no orders yet!</p>
    )}
  </div>

  <br />

  <button 
    className="btn btn-primary" 
    onClick={generatePDF} 
    disabled={isGeneratingPDF}>
    {isGeneratingPDF ? 'Generating PDF...' : 'Generate Report'}
  </button>

  <Modal show={showModal} onClose={() => setShowModal(false)} popup size="md">
    <Modal.Header />
    <Modal.Body>
      <div className="text-center">
        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400" />
        <h3 className="mb-3 fs-5 text-muted">Are you sure you want to delete this order?</h3>
        <div className="d-flex justify-content-center gap-3">
          <button className="btn btn-danger" onClick={handleDeleteOrder}>Yes, I am sure</button>
          <button className="btn btn-secondary" onClick={() => setShowModal(false)}>No, cancel</button>
        </div>
      </div>
    </Modal.Body>
  </Modal>
</div>

  );
}
