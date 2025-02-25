"use client";
import React from "react";
import { X } from "lucide-react";
import { Cormorant_Garamond } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "600"],
});

export default function ServiceDetailModal({ isOpen, onClose, service }) {
  if (!isOpen || !service) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-xl shadow-2xl max-w-4xl w-full mx-4 my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-pink-600 transition-colors"
        >
          <X className="w-8 h-8" />
        </button>

        <div className="grid md:grid-cols-2 gap-8 p-8">
          {/* Image Section */}
          <div>
            <div className="rounded-xl overflow-hidden shadow-lg mb-6">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-96 object-cover"
              />
            </div>
          </div>

          {/* Detail Section */}
          <div>
            <h2
              className={`
                ${cormorant.className} 
                text-3xl 
                font-light 
                text-gray-800 
                mb-4
                tracking-wide
              `}
            >
              {service.title}
            </h2>

            <h3 className="text-xl font-medium text-gray-900 mb-3">
              {service.packageName}
            </h3>

            <p className="text-gray-600 mb-6">{service.description}</p>

            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">
                Highlights Layanan
              </h4>
              <ul className="space-y-2 text-gray-600 list-disc list-inside">
                {service.highlights.map((highlight, index) => (
                  <li key={index} className="text-sm">
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between border-t pt-6">
              <div>
                <p className="text-sm text-gray-600">Total Harga</p>
                <p
                  className={`
                    ${cormorant.className}
                    text-2xl 
                    font-semibold 
                    text-pink-600
                  `}
                >
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(service.price)}
                </p>
              </div>

              <button
                className="
                  bg-pink-600 
                  text-white 
                  px-6 
                  py-3 
                  rounded-lg 
                  hover:bg-pink-700 
                  transition-colors
                "
              >
                Pesan Sekarang
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
