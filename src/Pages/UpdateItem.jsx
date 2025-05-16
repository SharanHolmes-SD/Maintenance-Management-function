import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './css/updateitem.css';
import { app } from '../firebase';
import { getStorage, uploadBytesResumable, ref, getDownloadURL } from 'firebase/storage';

function UpdateMaintenance() {
  const [imagePercent, setImagePercent] = useState(0);
  const navigate = useNavigate();
  const { id } = useParams();
  const fileRef1 = useRef(null);

  const [image1, setImage1] = useState(undefined);
  const [image2, setImage2] = useState(undefined);
  const [updatediscount, setupdatediscount] = useState({
    contact: "",
    m_mail: "",
    bus_details: "",
    main_type: "",
    issue_des: "",
    ser_date: "",
    urg_level: "",
  });

  useEffect(() => {
    if (image1) {
      handleFileUpload(image1, 'profilePicture');
    }
  }, [image1]);

  useEffect(() => {
    if (image2) {
      handleFileUpload(image2, 'alternateProfilePicture');
    }
  }, [image2]);

  const handleFileUpload = async (image, field) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        console.error('Image upload failed:', error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setupdatediscount((prev) => ({
            ...prev,
            [field]: downloadURL,
          }));
        });
      }
    );
  };

  const handleImage1Click = () => {
    if (fileRef1.current) {
      fileRef1.current.click();
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/user/getitem/${id}`);
        const data = await response.json();
        console.log(data);

        if (data.success) {
          setupdatediscount(data.data);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [id]);

  const handleInputChange = (e) => {
    setupdatediscount({
      ...updatediscount,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`/api/user/updateitem`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: updatediscount._id,
          ...updatediscount,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Updated successfully");
        navigate('/mainprofile');
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="service-update">
      <input
        type="text"
        placeholder="ProductId"
        id="contact"
        name="contact"
        onChange={handleInputChange}
        value={updatediscount?.contact}
      />
      <input
        type="text"
        placeholder="productName"
        id="m_mail"
        name="m_mail"
        onChange={handleInputChange}
        value={updatediscount?.m_mail}
      />
      <input
        type="text"
        placeholder="description"
        id="bus_details"
        name="bus_details"
        onChange={handleInputChange}
        value={updatediscount?.bus_details}
      />
      <input
        type="text"
        placeholder="price"
        id="main_type"
        name="main_type"
        onChange={handleInputChange}
        value={updatediscount?.main_type}
      />
      <input
        type="text"
        placeholder="percentage"
        id="issue_des"
        name="issue_des"
        onChange={handleInputChange}
        value={updatediscount?.issue_des}
      />
      <input
        type="text"
        placeholder="finalprice"
        id="ser_date"
        name="ser_date"
        onChange={handleInputChange}
        value={updatediscount?.ser_date}
      />
         <input
        type="text"
        placeholder="finalprice"
        id="urg_level"
        name="urg_level"
        onChange={handleInputChange}
        value={updatediscount?.urg_level}
      />
        
     

     

      <button className="update-btn" onClick={handleUpdate}>
        Update Details
      </button>
      <br />
      <br />
    </div>
  );
}

export default UpdateMaintenance;
