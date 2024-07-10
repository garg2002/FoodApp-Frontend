import React, { useState, useEffect } from "react";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const UserProfile = () => {
  const [userData, setUserData] = useState({
    fullname: "",
    email: "",
    profileImage: null, // Add state for profile image
  });
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    // Function to fetch user profile data
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
        setUserData(data); // Update state with fetched user data
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile(); // Call fetchUserProfile function when component mounts
  }, []); // Empty dependency array ensures this effect runs only once

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("fullname", userData.fullname);
      formData.append("email", userData.email);
      if (userData.profileImage) {
        formData.append("profileImage", userData.profileImage);
      }

      // Make API call to update user information
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
      setUpdated(true); // Set updated state to true upon successful update
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  // Destructure userData for easier access
  const { fullname, email } = userData;

  return (
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
      <div className="flex flex-wrap -mx-4">
        {/* Left Sidebar */}
        <div className="w-full md:w-1/2 xl:w-1/3 p-4">
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-lg font-bold mb-4">User Details</h2>
            <ul>
              <li>
                <strong>Name:</strong> {fullname}
              </li>
              <li>
                <strong>Email:</strong> {email}
              </li>
            </ul>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-1/2 xl:w-2/3 p-4">
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-lg font-bold mb-4">Edit User Information</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block">
                  <span className="text-gray-700">FullName:</span>
                  <input
                    type="text"
                    value={fullname}
                    onChange={(event) =>
                      setUserData({ ...userData, fullname: event.target.value })
                    }
                    className="form-input mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </label>
              </div>
              <div>
                <label className="block">
                  <span className="text-gray-700">Email:</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(event) =>
                      setUserData({ ...userData, email: event.target.value })
                    }
                    className="form-input mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </label>
              </div>
              <div>
                <label className="block">
                  <span className="text-gray-700">Profile Image:</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(event) =>
                      setUserData({
                        ...userData,
                        profileImage: event.target.files[0],
                      })
                    }
                    className="form-input mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </label>
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Update
              </button>
            </form>
            {updated && (
              <p className="mt-4 text-green-600">
                User information updated successfully!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
