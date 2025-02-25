"use client";
import React, { useState } from "react";
import { Star, Calendar, MapPin, MessageCircle, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const ReviewSelesai = () => {
  const router = useRouter();

  // Sample data - in real app would come from API/database
  const [completedPackages, setCompletedPackages] = useState([
    {
      id: 1,
      packageName: "Paket Pernikahan Lengkap",
      clientName: "Andi & Maya",
      date: "2024-12-15",
      venue: "Shangri-La Ballroom",
      price: "Rp 85.000.000",
      status: "Selesai",
      hasReviewed: false,
      review: null,
    },
    {
      id: 2,
      packageName: "Paket Intimate Wedding",
      clientName: "Deni & Lisa",
      date: "2024-11-20",
      venue: "The Glass House",
      price: "Rp 45.000.000",
      status: "Selesai",
      hasReviewed: true,
      review: {
        rating: 5,
        comment:
          "Pelayanan sangat memuaskan! Tim sangat profesional dan hasil sesuai ekspektasi.",
        date: "2024-11-25",
      },
    },
  ]);

  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: "",
  });

  const handleSubmitReview = (packageId) => {
    const updatedPackages = completedPackages.map((pkg) => {
      if (pkg.id === packageId) {
        return {
          ...pkg,
          hasReviewed: true,
          review: {
            ...newReview,
            date: new Date().toISOString().split("T")[0],
          },
        };
      }
      return pkg;
    });

    setCompletedPackages(updatedPackages);
    setShowReviewForm(false);
    setNewReview({ rating: 5, comment: "" });
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
    <div className="min-h-screen bg-gray-50 py-8 text-gray-600">
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
            Paket Selesai
          </h1>
          <p className="mt-2 text-gray-600">
            Daftar paket pernikahan yang telah selesai dan ulasan
          </p>
        </div>

        {/* Package List */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {completedPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {pkg.clientName}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      {pkg.packageName}
                    </p>
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {pkg.status}
                  </span>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-5 w-5 mr-2" />
                    <span>
                      {new Date(pkg.date).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>{pkg.venue}</span>
                  </div>
                </div>

                {pkg.hasReviewed ? (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <div className="mb-2">
                      <StarRating rating={pkg.review.rating} readonly />
                    </div>
                    <p className="text-gray-600 text-sm">
                      {pkg.review.comment}
                    </p>
                    <p className="text-gray-400 text-xs mt-2">
                      Diulas pada:{" "}
                      {new Date(pkg.review.date).toLocaleDateString()}
                    </p>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setSelectedPackage(pkg);
                      setShowReviewForm(true);
                    }}
                    className="mt-4 w-full bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700 transition-colors duration-300"
                  >
                    Berikan Ulasan
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Review Form Modal */}
        {showReviewForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Berikan Ulasan</h3>
                <button
                  onClick={() => setShowReviewForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <span className="sr-only">Close</span>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="mt-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rating
                  </label>
                  <StarRating
                    rating={newReview.rating}
                    onRatingChange={(rating) =>
                      setNewReview((prev) => ({ ...prev, rating }))
                    }
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Komentar
                  </label>
                  <textarea
                    rows={4}
                    className="w-full border rounded-md p-2 focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    value={newReview.comment}
                    onChange={(e) =>
                      setNewReview((prev) => ({
                        ...prev,
                        comment: e.target.value,
                      }))
                    }
                    placeholder="Bagikan pengalaman Anda..."
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowReviewForm(false)}
                    className="px-4 py-2 border rounded-md hover:bg-gray-50"
                  >
                    Batal
                  </button>
                  <button
                    onClick={() => handleSubmitReview(selectedPackage.id)}
                    className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700"
                  >
                    Kirim Ulasan
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {completedPackages.length === 0 && (
          <div className="text-center py-12">
            <MessageCircle className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              Belum ada paket selesai
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Saat ini belum ada paket pernikahan yang telah selesai.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewSelesai;
