import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";

export default function AddMaintenance() {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    userId: currentUser?._id || "", // Ensure it's initialized
    contact: "",
    m_mail: "",
    bus_details: "",
    main_type: "",
    issue_des: "",
    ser_date: "",
    urg_level: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!formData.contact.trim() || !/^\d{10}$/.test(formData.contact)) {
      errors.contact = "Contact must be a valid 10-digit number";
    }
    if (!formData.m_mail.trim() || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.m_mail)) {
      errors.m_mail = "Invalid email format";
    }
    if (!formData.bus_details.trim()) errors.bus_details = "Bus details are required";
    if (!formData.main_type.trim()) errors.main_type = "Maintenance type is required";
    if (!formData.issue_des.trim()) errors.issue_des = "Issue description is required";
    if (!formData.ser_date.trim()) {
      errors.ser_date = "Service date is required";
    } else {
      const today = new Date().setHours(0, 0, 0, 0);
      const selectedDate = new Date(formData.ser_date).setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        errors.ser_date = "Service date cannot be in the past";
      }
    }
    if (!formData.urg_level.trim()) errors.urg_level = "Urgency level is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const res = await fetch("/api/auth/mainstore", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to process maintenance request");
      Swal.fire({ icon: "success", title: "Success", text: "Maintenance request submitted" });
      navigate("/mainprofile");
    } catch (error) {
      Swal.fire({ icon: "error", title: "Error", text: error.message || "Something went wrong." });
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4" style={{ maxWidth: "500px", width: "100%" }}>
        <h2 className="text-center mb-4 text-primary">Maintenance Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Contact Details</label>
            <input
              type="text"
              className="form-control"
              name="contact"
              placeholder="Enter Contact Details"
              onChange={handleChange}
            />
            {formErrors.contact && <div className="text-danger">{formErrors.contact}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="m_mail"
              placeholder="Enter Email"
              onChange={handleChange}
            />
            {formErrors.m_mail && <div className="text-danger">{formErrors.m_mail}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Bus Details</label>
            <select className="form-select" name="bus_details" onChange={handleChange}>
              <option value="">Select Bus Detail</option>
              <option>Bus Number</option>
              <option>Model</option>
              <option>Current Mileage</option>
              <option>Last Maintenance</option>
              <option>Date</option>
            </select>
            {formErrors.bus_details && <div className="text-danger">{formErrors.bus_details}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Select Maintenance Type</label>
            <select className="form-select" name="main_type" onChange={handleChange}>
              <option value="">Select Maintenance</option>
              <option>Preventive Maintenance</option>
              <option>Engine Repair</option>
              <option>Brake System Inspection</option>
              <option>Oil Change</option>
              <option>Tyre Replacement</option>
              <option>Electrical System</option>
              <option>Other</option>
            </select>
            {formErrors.main_type && <div className="text-danger">{formErrors.main_type}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Issue Description</label>
            <input
              type="text"
              className="form-control"
              name="issue_des"
              placeholder="Describe the issue"
              onChange={handleChange}
            />
            {formErrors.issue_des && <div className="text-danger">{formErrors.issue_des}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Service Date</label>
            <input
              type="date"
              className="form-control"
              name="ser_date"
              onChange={handleChange}
            />
            {formErrors.ser_date && <div className="text-danger">{formErrors.ser_date}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Urgency Level</label>
            <select className="form-select" name="urg_level" onChange={handleChange}>
              <option value="">Select Urgency Level</option>
              <option>Low - Routine Check</option>
              <option>Medium - Minor Issues</option>
              <option>High - Urgent</option>
            </select>
            {formErrors.urg_level && <div className="text-danger">{formErrors.urg_level}</div>}
          </div>

          <button className="btn btn-primary w-100" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
