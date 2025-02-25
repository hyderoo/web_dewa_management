"use client";
import React, { useState } from "react";
import {
  Search,
  Filter,
  MoreVertical,
  ChevronDown,
  Download,
  Calendar,
  MapPin,
  Star,
  MessageCircle,
} from "lucide-react";

const OrderManagement = () => {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: "",
  });

  // Combined data from both review components
  const [orders, setOrders] = useState([
    // Completed orders with reviews
    {
      id: "ORD-001",
      type: "completed",
      packageName: "Paket Pernikahan Lengkap",
      clientName: "Andi & Maya",
      date: "2024-12-15",
      venue: "Shangri-La Ballroom",
      price: "Rp 85.000.000",
      status: "completed",
      hasReviewed: true,
      review: {
        rating: 5,
        comment: "Pelayanan sangat memuaskan! Tim sangat profesional.",
        date: "2024-12-20",
      },
    },
    // Ongoing orders
    {
      id: "ORD-002",
      type: "ongoing",
      packageName: "Paket Pernikahan Lengkap",
      clientName: "Budi & Sarah",
      date: "2025-02-15",
      venue: "Grand Ballroom Hotel Mulia",
      price: "Rp 75.000.000",
      status: "ongoing",
      details: {
        estimatedGuests: 500,
        includedServices: [
          "Dekorasi Lengkap",
          "Katering 500 pax",
          "Dokumentasi Full",
          "Entertainment",
        ],
      },
    },
    // Pending payment orders
    {
      id: "ORD-003",
      type: "pending",
      packageName: "Paket Dekorasi Premium",
      clientName: "Ahmad & Linda",
      date: "2025-03-20",
      venue: "The Glass House",
      price: "Rp 45.000.000",
      status: "pending_payment",
      details: {
        estimatedGuests: 300,
        includedServices: [
          "Dekorasi Premium",
          "Lighting System",
          "Photo Booth",
          "Flower Arrangements",
        ],
      },
    },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "ongoing":
        return "bg-blue-100 text-blue-800";
      case "pending_payment":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusDisplay = (status) => {
    switch (status) {
      case "completed":
        return "Selesai";
      case "ongoing":
        return "Berlangsung";
      case "pending_payment":
        return "Menunggu Pembayaran";
      default:
        return status;
    }
  };

  const handlePaymentClick = (orderId) => {
    router.push(`/page/DetailPembayaran?id=${orderId}`);
  };

  const StarRating = ({ rating, onRatingChange, readonly = false }) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => !readonly && onRatingChange(star)}
            disabled={readonly}
            className={`${
              star <= rating ? "text-yellow-400" : "text-gray-300"
            } focus:outline-none ${!readonly && "hover:text-yellow-400"}`}
          >
            <Star className="w-6 h-6 fill-current" />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8 text-gray-600">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Manajemen Pesanan
        </h1>
        <p className="text-gray-600">
          Kelola semua pesanan dalam satu dashboard
        </p>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="w-full md:w-96 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Cari berdasarkan nama client..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">Semua Status</option>
              <option value="completed">Selesai</option>
              <option value="ongoing">Berlangsung</option>
              <option value="pending_payment">Menunggu Pembayaran</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders
          .filter(
            (order) =>
              selectedStatus === "all" || order.status === selectedStatus
          )
          .filter(
            (order) =>
              order.clientName
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
              order.packageName.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {order.clientName}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      {order.packageName}
                    </p>
                  </div>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {getStatusDisplay(order.status)}
                  </span>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-5 h-5 mr-2" />
                    <span>
                      {new Date(order.date).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span>{order.venue}</span>
                  </div>
                </div>

                {order.status === "completed" && order.hasReviewed && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <StarRating rating={order.review.rating} readonly />
                    <p className="text-gray-600 text-sm mt-2">
                      {order.review.comment}
                    </p>
                    <p className="text-gray-400 text-xs mt-2">
                      Diulas pada:{" "}
                      {new Date(order.review.date).toLocaleDateString()}
                    </p>
                  </div>
                )}

                <div className="mt-6 space-y-2">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="w-full bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700 transition-colors duration-300"
                  >
                    Lihat Detail
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    {selectedOrder.clientName}
                  </h2>
                  <p className="text-gray-600">{selectedOrder.packageName}</p>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900">Detail Acara</h3>
                  <div className="mt-2 space-y-2">
                    <p className="text-gray-600">
                      Tanggal:{" "}
                      {new Date(selectedOrder.date).toLocaleDateString(
                        "id-ID",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }
                      )}
                    </p>
                    <p className="text-gray-600">
                      Lokasi: {selectedOrder.venue}
                    </p>
                    {selectedOrder.details && (
                      <>
                        <p className="text-gray-600">
                          Estimasi Tamu: {selectedOrder.details.estimatedGuests}{" "}
                          orang
                        </p>
                        <div>
                          <h3 className="font-medium text-gray-900 mt-4">
                            Layanan Termasuk
                          </h3>
                          <ul className="mt-2 space-y-1">
                            {selectedOrder.details.includedServices.map(
                              (service, index) => (
                                <li
                                  key={index}
                                  className="flex items-center text-gray-600"
                                >
                                  <svg
                                    className="h-5 w-5 mr-2 text-green-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M5 13l4 4L19 7"
                                    />
                                  </svg>
                                  {service}
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                {selectedOrder.status === "pending_payment" && (
                  <button
                    onClick={() => {
                      handlePaymentClick(selectedOrder.id);
                      setSelectedOrder(null);
                    }}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition-colors duration-300"
                  >
                    Lakukan Pembayaran
                  </button>
                )}
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors duration-300"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;
