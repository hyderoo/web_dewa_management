"use client";
import React, { useState, useCallback } from "react";
import {
  Users,
  Edit,
  Trash2,
  Plus,
  AlertCircle,
  X,
  KeyRound,
} from "lucide-react";

const UserManagement = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      phone: "081234567890",
      email: "john@example.com",
    },
    {
      id: 2,
      name: "Jane Smith",
      phone: "087654321098",
      email: "jane@example.com",
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [resetPasswordUserId, setResetPasswordUserId] = useState(null);

  const handleAddUser = useCallback(() => {
    setCurrentUser(null);
    setIsModalOpen(true);
  }, []);

  const handleEditUser = useCallback((user) => {
    setCurrentUser(user);
    setIsModalOpen(true);
  }, []);

  const handleDeleteUser = useCallback(
    (userId) => {
      setUsers(users.filter((user) => user.id !== userId));
      setDeleteUserId(null);
    },
    [users]
  );

  const handleResetPassword = useCallback((userId) => {
    // In a real application, this would trigger a password reset process
    // For this example, we'll just show a confirmation modal
    setResetPasswordUserId(userId);
  }, []);

  const handleSaveUser = useCallback(
    (userData) => {
      if (currentUser) {
        // Edit existing user
        setUsers(
          users.map((user) =>
            user.id === currentUser.id ? { ...user, ...userData } : user
          )
        );
      } else {
        // Add new user
        const newUser = {
          ...userData,
          id: users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1,
        };
        setUsers([...users, newUser]);
      }
      setIsModalOpen(false);
    },
    [users, currentUser]
  );

  return (
    <div className="container mx-auto px-4 py-6 md:px-8 text-gray-600">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-center p-4 md:p-6 border-b">
          <h2 className="text-xl md:text-2xl font-bold flex items-center mb-4 md:mb-0">
            <Users className="mr-2 w-6 h-6" /> User Management
          </h2>
          <button
            onClick={handleAddUser}
            className="flex items-center justify-center w-full md:w-auto bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add User</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="p-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="p-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Phone
                </th>
                <th className="p-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="p-3 text-center text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition">
                  <td className="p-3 whitespace-nowrap">{user.name}</td>
                  <td className="p-3 whitespace-nowrap">{user.phone}</td>
                  <td className="p-3 whitespace-nowrap">{user.email}</td>
                  <td className="p-3">
                    <div className="flex justify-center space-x-3">
                      <button
                        onClick={() => handleEditUser(user)}
                        className="text-blue-500 hover:text-blue-700 transition"
                        title="Edit"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleResetPassword(user.id)}
                        className="text-yellow-500 hover:text-yellow-700 transition"
                        title="Reset Password"
                      >
                        <KeyRound className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => setDeleteUserId(user.id)}
                        className="text-red-500 hover:text-red-700 transition"
                        title="Delete"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <UserModal
          user={currentUser}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveUser}
        />
      )}

      {deleteUserId && (
        <DeleteConfirmationModal
          onConfirm={() => handleDeleteUser(deleteUserId)}
          onCancel={() => setDeleteUserId(null)}
        />
      )}

      {resetPasswordUserId && (
        <ResetPasswordModal
          onConfirm={() => {
            // In a real app, this would trigger a password reset process
            console.log(`Reset password for user ${resetPasswordUserId}`);
            setResetPasswordUserId(null);
          }}
          onCancel={() => setResetPasswordUserId(null)}
        />
      )}
    </div>
  );
};

const UserModal = ({ user, onClose, onSave }) => {
  const [name, setName] = useState(user ? user.name : "");
  const [phone, setPhone] = useState(user ? user.phone : "");
  const [email, setEmail] = useState(user ? user.email : "");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!phone.trim()) newErrors.phone = "Phone number is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave({ name, phone, email });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-xl font-bold">
            {user ? "Edit User" : "Add New User"}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              required
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">
              Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
                errors.phone ? "border-red-500" : "border-gray-300"
              }`}
              required
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              required
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const DeleteConfirmationModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-auto">
        <div className="p-6">
          <div className="flex items-center mb-4">
            <AlertCircle className="w-6 h-6 text-red-500 mr-3" />
            <h3 className="text-xl font-bold text-gray-800">
              Confirm Deletion
            </h3>
          </div>
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete this user? This action cannot be
            undone.
          </p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ResetPasswordModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-auto">
        <div className="p-6">
          <div className="flex items-center mb-4">
            <KeyRound className="w-6 h-6 text-yellow-500 mr-3" />
            <h3 className="text-xl font-bold text-gray-800">Reset Password</h3>
          </div>
          <p className="text-gray-600 mb-6">
            Are you sure you want to reset this user's password? A new temporary
            password will be sent to their email.
          </p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
            >
              Reset Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
