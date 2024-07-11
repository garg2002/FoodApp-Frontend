import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const UserProfile = () => {
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mobile_no: "",
    profileImg: null,
  });
  const [formValues, setFormValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mobile_no: "",
    profileImg: null,
  });
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`${backendUrl}/user/userprofile/`, {
          method: "GET",
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }
        const data = await response.json();
        setUserData(data);
        setFormValues(data); // Initialize form values with fetched user data
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleUpdateImage = async (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "userImage");
    data.append("cloud_name", "dxeqwilsn");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dxeqwilsn/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const result = await response.json();
      return result.url;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("first_name", formValues.first_name);
    formData.append("last_name", formValues.last_name);
    formData.append("email", formValues.email);
    formData.append("mobile_no", formValues.mobile_no);
    let imageUrl = formValues.profileImg;
    if (formValues.profileImg instanceof File) {
      imageUrl = await handleUpdateImage(formValues.profileImg);
      formData.append("profileImg", imageUrl);
    }

    try {
      const response = await fetch(`${backendUrl}/user/userprofile/`, {
        method: "PATCH",
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Failed to update user profile");
      }
      const updatedData = await response.json();
      setUserData(updatedData);
      setUpdated(true);
      toast.success("User information updated successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleImageChange = (event) => {
    setFormValues({
      ...formValues,
      profileImg: event.target.files[0],
    });
  };

  const { first_name, last_name, email, mobile_no, profileImg } = userData;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl flex flex-col md:flex-row">
        {/* Profile Section */}
        <div className="w-full md:w-1/3 bg-gradient-to-r from-orange-400 to-pink-500 text-white flex flex-col items-center p-6 rounded-t-lg md:rounded-t-none md:rounded-l-lg">
          <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
            <img
              src={profileImg}
              alt="profileImg"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-2xl font-bold">{(first_name +" " + last_name).toUpperCase()}</h2>
          <div className="mt-6 w-full">
            <h3 className="text-xl font-semibold mb-2 text-center md:text-left">
              Contact Information:-
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center md:text-left">
              <div className="flex flex-col">
                <div className="flex justify-between gap-4">
                  <p className="text-gray-700">Email</p>
                  <p>{email}</p>
                </div>
                <div className="flex justify-between gap-4">
                  <p className="text-gray-700">Phone</p>
                  <p>{mobile_no}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Information and Form Section */}
        <div className="w-full md:w-2/3 p-6">
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">
              Edit User Information
            </h3>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-gray-700">
                  <span>First Name:</span>
                  <input
                    type="text"
                    name="fullname"
                    value={formValues.first_name}
                    onChange={handleChange}
                    className="form-input mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                </label>
              </div>
              <div>
                <label className="block text-gray-700">
                  <span>Last Name:</span>
                  <input
                    type="text"
                    name="fullname"
                    value={formValues.last_name}
                    onChange={handleChange}
                    className="form-input mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                </label>
              </div>
              <div>
                <label className="block text-gray-700">
                  <span>Email:</span>
                  <input
                    type="email"
                    name="email"
                    value={formValues.email}
                    onChange={handleChange}
                    className="form-input mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                </label>
              </div>
              <div>
                <label className="block text-gray-700">
                  <span>Contact:</span>
                  <input
                    type="text"
                    name="mobile_no"
                    value={formValues.mobile_no}
                    onChange={handleChange}
                    className="form-input mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                </label>
              </div>
              <div>
                <label className="block text-gray-700">
                  <span>Profile Image:</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="form-input mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                </label>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition duration-300"
                >
                  Update
                </button>
              </div>
            </form>
            {/* {updated && (
              toast.success("User updated successfully.")
            )} */}
          </div>

          <div className="flex justify-center space-x-4 mt-4">
            <a href="#" className="text-blue-500 hover:text-blue-700">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="text-blue-400 hover:text-blue-600">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-pink-500 hover:text-pink-700">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
