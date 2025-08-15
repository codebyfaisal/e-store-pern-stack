import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { useApiDataStore, useAuthStore } from "@/store/index.js";
import { NoItemError } from "@/components/index.js";

const Profile = () => {
  const { logout } = useAuthStore();
  const { data: profileData, error, fetchData, updateData,loading } = useApiDataStore();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
  });

  useEffect(() => {
    fetchData("/api/users/profile");
  }, [fetchData]);

  useEffect(() => {
    if (profileData) {
      setFormData({
        fname: profileData.fname || "",
        lname: profileData.lname || "",
        email: profileData.email || "",
      });
    }
  }, [profileData]);

    if (loading) return <div>Loading...</div>;

  if (error) return <div>Error: {error}</div>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditToggle = () => {
    if (isEditing) {
      setFormData({
        fname: profileData.fname || "",
        lname: profileData.lname || "",
        email: profileData.email || "",
      });
    }
    setIsEditing((prev) => !prev);
  };

  const handleSave = async () => {
    try {
      console.log();

      if (!formData.fname || !formData.lname || !formData.email) {
        return toast.error("Please fill in all required fields.");
      }

      if (
        formData.fname === profileData.fname &&
        formData.lname === profileData.lname &&
        formData.email === profileData.email
      ) {
        setIsEditing(false);
        return;
      }
      await updateData("/api/users/profile", formData);
      toast.success("Profile updated successfully!");
      setIsEditing(false);
      fetchData("/api/users/profile");
    } catch (err) {
      console.error("Failed to update profile:", err);
      toast.error(err.response?.data?.error || "Failed to update profile.");
    }
  };

  const handleLogout = async () => await logout();

  if (error) {
    return (
      <div className="p-6 text-center text-red-500">
        <p>{error}</p>
        <button onClick={handleLogout} className="mt-4 btn btn-primary">
          Go to Login
        </button>
      </div>
    );
  }

  if (!profileData || Object.keys(profileData).length === 0) {
    return <NoItemError error="No profile data available." />;
  }

    if (loading) return null;

  return (
    <section className="min-h-[85%] flex items-center">
      <div className="bg-base-100 p-8 rounded shadow max-w-3xl mx-auto md:min-w-96 grid gap-4">
        <div className="flex items-center">
          <img
            src={
              profileData?.avatarUrl ||
              "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            }
            alt={`${profileData.fname} ${profileData.lname}`}
            className="w-20 h-20 rounded-full object-cover"
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-base-content">
            {profileData.fname} {profileData.lname}
          </h1>
          <p className="text-base-content opacity-60 capitalize">
            {profileData.role}
          </p>
        </div>

        <div className="space-y-4">
          <div className="grid xs:flex gap-4">
            {/* First Name Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">First Name:</span>
              </label>
              <input
                type="text"
                name="fname"
                value={formData.fname}
                onChange={handleChange}
                className="input input-bordered w-full"
                disabled={!isEditing} // Disabled when not editing
              />
            </div>

            {/* Last Name Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Last Name:</span>
              </label>
              <input
                type="text"
                name="lname"
                value={formData.lname}
                onChange={handleChange}
                className="input input-bordered w-full"
                disabled={!isEditing} // Disabled when not editing
              />
            </div>
          </div>
          {/* Email Field (often read-only or requires special handling for changes) */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email:</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input input-bordered w-full"
              disabled={!isEditing}
            />
          </div>

          {/* Member Since (Read-only) */}
          <div className="flex items-center space-x-3">
            <span className="font-semibold text-base-content">
              Member Since:
            </span>
            <span>{new Date(profileData.created_at).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="mt-8 grid gap-2">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="btn btn-primary flex-grow p-0 m-0"
              >
                Save Changes
              </button>
            </>
          ) : (
            <button onClick={handleEditToggle} className="btn btn-primary">
              Edit Profile
            </button>
          )}
          <button onClick={handleLogout} className="btn btn-ghost text-error">
            Logout
          </button>
        </div>
      </div>
    </section>
  );
};

export default Profile;
