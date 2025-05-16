import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getStorage, uploadBytesResumable, ref, getDownloadURL } from 'firebase/storage';
import { app } from '../firebase';
import { updateUserStart, updateUserFailure, updateUserSuccess, deleteUserStart, deleteUserSuccess, deleteUserFailure, signout } from '../redux/User/userSlice';

export default function Profile() {
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const { currentUser, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async (image) => {
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
      () => setImageError(true),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  };

  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data));
        return;
      }
      dispatch(deleteUserSuccess(data));
      alert('User deleted successfully');
    } catch (error) {
      dispatch(deleteUserFailure(error));
    }
  };

  const handleSignOut = async () => {
    try {
      await fetch('api/auth/signout');
      dispatch(signout());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        <h1 className="text-center text-primary mb-4">Profile</h1>
        <form onSubmit={handleSubmit} className="text-center">
          <input type="file" ref={fileRef} hidden accept="image/*" onChange={(e) => setImage(e.target.files[0])} />

          <img
            src={formData.profilePicture || currentUser.profilePicture}
            alt="profile"
            className="rounded-circle border border-primary mb-3"
            width="120"
            height="120"
            style={{ objectFit: 'cover', cursor: 'pointer' }}
            onClick={() => fileRef.current.click()}
          />

          {imageError ? (
            <div className="alert alert-danger">Error uploading image (file size must be less than 2 MB)</div>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <div className="alert alert-warning">{`Uploading: ${imagePercent}%`}</div>
          ) : imagePercent === 100 ? (
            <div className="alert alert-success">Image uploaded successfully</div>
          ) : null}

          <div className="mb-3">
            <input
              defaultValue={currentUser.username}
              type="text"
              id="username"
              className="form-control"
              placeholder="Username"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <input
              defaultValue={currentUser.email}
              type="email"
              id="email"
              className="form-control"
              placeholder="Email"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <input type="password" id="password" className="form-control" placeholder="Password" onChange={handleChange} />
          </div>

          <button className="btn btn-primary w-50">{loading ? 'Loading...' : 'Update'}</button>
        </form>

        <div className="d-flex justify-content-between mt-4">
          <button className="btn btn-danger" onClick={handleDeleteAccount}>
            Close Account
          </button>
          <button className="btn btn-secondary" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>

        <div className="mt-5">
          <Link className="btn btn-success w-50 mb-2" to="/addmain">
            Add Maintain
          </Link>
          <Link className="btn btn-warning w-50 mb-2" to="/mainprofile">
           My Maintains
          </Link>
        
        
        </div>
        
        
        {updateSuccess && <p className="text-success text-center mt-3">User updated successfully</p>}
      </div>
    </div>
  );
}
