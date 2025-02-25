"use client";
import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const ReviewBerlangsung = () => {
  const router = useRouter();

  // Updated sample data with pending payment status
  const [bookings, setBookings] = useState([
    {
      id: 1,
      packageName: "Paket Pernikahan Lengkap",
      clientName: "Budi & Sarah",
      bookingDate: "2025-02-15",
      status: "Berlangsung",
      price: "Rp 75.000.000",
      details: {
        venue: "Grand Ballroom Hotel Mulia",
        estimatedGuests: 500,
        includedServices: [
          "Dekorasi Lengkap",
          "Katering 500 pax",
          "Dokumentasi Full",
          "Entertainment",
        ],
      },
    },
    {
      id: 2,
      packageName: "Paket Dekorasi Premium",
      clientName: "Ahmad & Linda",
      bookingDate: "2025-03-20",
      status: "Menunggu Pembayaran",
      price: "Rp 45.000.000",
      details: {
        venue: "The Glass House",
        estimatedGuests: 300,
        includedServices: [
          "Dekorasi Premium",
          "Lighting System",
          "Photo Booth",
          "Flower Arrangements",
        ],
      },
    },
    {
      id: 3,
      packageName: "Paket Intimate Wedding",
      clientName: "Rudi & Maya",
      bookingDate: "2025-04-10",
      status: "Menunggu Pembayaran",
      price: "Rp 35.000.000",
      details: {
        venue: "Garden Pavilion",
        estimatedGuests: 100,
        includedServices: [
          "Dekorasi Minimalis",
          "Katering 100 pax",
          "Dokumentasi Standard",
          "Music Entertainment",
        ],
      },
    },
  ]);

  const [selectedBooking, setSelectedBooking] = useState(null);

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "Berlangsung":
        return "bg-green-100 text-green-800";
      case "Menunggu Pembayaran":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Handle payment button click
  const handlePaymentClick = (bookingId) => {
    router.push(`/page/DetailPembayaran?id=${bookingId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6 group"
        >
          <ArrowLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
          Kembali
        </button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-900">
            Daftar Pesanan
          </h1>
          <p className="mt-2 text-gray-600">
            Daftar paket pernikahan yang sedang dalam proses dan menunggu
            pembayaran
          </p>
        </div>

        {/* Booking List */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {booking.clientName}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      {booking.packageName}
                    </p>
                  </div>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      booking.status
                    )}`}
                  >
                    {booking.status}
                  </span>
                </div>

                <div className="mt-4">
                  <div className="flex items-center text-gray-600">
                    <svg
                      className="h-5 w-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span>
                      {new Date(booking.bookingDate).toLocaleDateString(
                        "id-ID",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }
                      )}
                    </span>
                  </div>
                  <div className="flex items-center mt-2 text-gray-600">
                    <svg
                      className="h-5 w-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <span>{booking.price}</span>
                  </div>
                  <div className="flex items-center mt-2 text-gray-600">
                    <svg
                      className="h-5 w-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span>{booking.details.venue}</span>
                  </div>
                </div>

                <div className="mt-6 space-y-2">
                  <button
                    onClick={() => setSelectedBooking(booking)}
                    className="w-full bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700 transition-colors duration-300"
                  >
                    Lihat Detail
                  </button>
                  {booking.status === "Menunggu Pembayaran" && (
                    <button
                      onClick={() => handlePaymentClick(booking.id)}
                      className="w-full bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition-colors duration-300"
                    >
                      Lakukan Pembayaran
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Detail Modal - Remains the same */}
        {selectedBooking && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900">
                      {selectedBooking.clientName}
                    </h2>
                    <p className="text-gray-600">
                      {selectedBooking.packageName}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedBooking(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
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
                        {new Date(
                          selectedBooking.bookingDate
                        ).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                      <p className="text-gray-600">
                        Lokasi: {selectedBooking.details.venue}
                      </p>
                      <p className="text-gray-600">
                        Estimasi Tamu: {selectedBooking.details.estimatedGuests}{" "}
                        orang
                      </p>
                      <p className="text-gray-600">
                        Total Investasi: {selectedBooking.price}
                      </p>
                      <p className="text-gray-600">
                        Status:{" "}
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-sm font-medium ${getStatusColor(
                            selectedBooking.status
                          )}`}
                        >
                          {selectedBooking.status}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-900">
                      Layanan Termasuk
                    </h3>
                    <ul className="mt-2 space-y-1">
                      {selectedBooking.details.includedServices.map(
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
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  {selectedBooking.status === "Menunggu Pembayaran" && (
                    <button
                      onClick={() => {
                        handlePaymentClick(selectedBooking.id);
                        setSelectedBooking(null);
                      }}
                      className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition-colors duration-300"
                    >
                      Lakukan Pembayaran
                    </button>
                  )}
                  <button
                    onClick={() => setSelectedBooking(null)}
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors duration-300"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty State - Remains the same */}
        {bookings.length === 0 && (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              Tidak ada pesanan
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Saat ini tidak ada paket pernikahan yang sedang berlangsung atau
              menunggu pembayaran.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewBerlangsung;
