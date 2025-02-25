"use client";
import React, { useState } from "react";
import {
  Users,
  List,
  Settings,
  Image,
  ShoppingCart,
  Menu,
  X,
  LogOut,
  KeyRound,
} from "lucide-react";
import { useRouter } from "next/navigation";
import TeamManagement from "./page/Team/page";
import Catalog from "./page/Caatalog/page";
import ServiceManagement from "./page/Layanan/page";
import PortfolioManagement from "./page/Portofolio/page";
import UserManagement from "./page/User/page";
import OrderManagement from "./page/Order/page";
import DashboardAdmin from "./page/Dashboard/page";

// Logout Modal Component
const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full text-gray-600">
        <h2 className="text-xl font-bold mb-4 text-center">
          Konfirmasi Logout
        </h2>
        <p className="text-gray-600 mb-6 text-center">
          Apakah Anda yakin ingin keluar dari akun?
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

// Password Change Modal Component
const PasswordChangeModal = ({ isOpen, onClose }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handlePasswordChange = () => {
    // Reset previous errors
    setError("");

    // Basic validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Semua field harus diisi");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Konfirmasi password tidak cocok");
      return;
    }

    if (newPassword.length < 8) {
      setError("Kata sandi baru minimal 8 karakter");
      return;
    }

    // Simulate password change (replace with actual API call)
    try {
      // Here you would typically call an API to change the password
      // Example:
      // await changePasswordAPI(currentPassword, newPassword);

      alert("Kata sandi berhasil diubah");

      // Reset form
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      // Close modal
      onClose();
    } catch (err) {
      setError("Gagal mengubah kata sandi. Silakan coba lagi.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 text-gray-600">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4 text-center">Ubah Kata Sandi</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Kata Sandi Saat Ini
          </label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Masukkan kata sandi saat ini"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Kata Sandi Baru</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Masukkan kata sandi baru"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">
            Konfirmasi Kata Sandi Baru
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Konfirmasi kata sandi baru"
          />
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            Batal
          </button>
          <button
            onClick={handlePasswordChange}
            className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600"
          >
            Ubah Kata Sandi
          </button>
        </div>
      </div>
    </div>
  );
};

// Sidebar Component
const Sidebar = ({
  activeMenu,
  setActiveMenu,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) => {
  const router = useRouter();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isPasswordChangeModalOpen, setIsPasswordChangeModalOpen] =
    useState(false);

  const menuItems = [
    {
      icon: <Users size={20} />,
      label: "Dashboard",
      key: "dashboard",
    },
    {
      icon: <Users size={20} />,
      label: "Manajemen Tim",
      key: "team-management",
    },
    {
      icon: <List size={20} />,
      label: "Manajemen Katalog",
      key: "catalog",
    },
    {
      icon: <Image size={20} />,
      label: "Manajemen Portofolio",
      key: "portfolio-management",
    },
    {
      icon: <Users size={20} />,
      label: "Manajemen User",
      key: "user-management",
    },
    {
      icon: <ShoppingCart size={20} />,
      label: "Manajemen Order",
      key: "order-management",
    },
  ];

  const handleLogout = () => {
    router.push("/page/Logout");
  };

  return (
    <>
      {/* Logout and Password Change Modals */}
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
      <PasswordChangeModal
        isOpen={isPasswordChangeModalOpen}
        onClose={() => setIsPasswordChangeModalOpen(false)}
      />

      {/* Mobile Menu Toggle */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 bg-pink-500 text-white rounded-md"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`
        fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-40 transform transition-transform duration-300 overflow-y-auto
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
      `}
      >
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Admin Dashboard</h2>
        </div>

        <nav className="p-4">
          {menuItems.map((item) => (
            <button
              key={item.key}
              onClick={() => {
                setActiveMenu(item.key);
                setIsMobileMenuOpen(false);
              }}
              className={`
                w-full flex items-center p-3 rounded-lg mb-2 transition-all
                ${
                  activeMenu === item.key
                    ? "bg-pink-500 text-white"
                    : "hover:bg-pink-100 text-gray-700"
                }
              `}
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </button>
          ))}

          {/* Additional Sidebar Actions */}
          <div className="border-t mt-4 pt-4">
            <button
              onClick={() => setIsPasswordChangeModalOpen(true)}
              className="w-full flex items-center p-3 rounded-lg mb-2 hover:bg-pink-100 text-gray-700"
            >
              <span className="mr-3">
                <KeyRound size={20} />
              </span>
              Ubah Kata Sandi
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center p-3 rounded-lg hover:bg-pink-100 text-gray-700"
            >
              <span className="mr-3">
                <LogOut size={20} />
              </span>
              Logout
            </button>
          </div>
        </nav>
      </div>
    </>
  );
};

// Content Area Component
const ContentArea = ({ activeMenu }) => {
  const renderContent = () => {
    switch (activeMenu) {
      case "dashboard":
        return <DashboardAdmin />;
      case "team-management":
        return <TeamManagement />;
      case "catalog":
        return <Catalog />;
      case "portfolio-management":
        return <PortfolioManagement />;
      case "user-management":
        return <UserManagement />;
      case "order-management":
        return <OrderManagement />;
      default:
        return <DashboardAdmin />;
    }
  };

  return (
    <div className="md:ml-64 p-6 bg-gray-50 min-h-screen">
      {renderContent()}
    </div>
  );
};

// Main Admin Dashboard Component
export default function AdminDashboard() {
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative">
      {/* Sidebar */}
      <Sidebar
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* Content Area */}
      <ContentArea activeMenu={activeMenu} />

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}
