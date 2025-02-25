"use client";
import React, { useState, useEffect } from "react";
import { Cormorant_Garamond } from "next/font/google";
import Link from "next/link";
import { Copy } from "lucide-react";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "600"],
});

const paymentMethods = [
  {
    bank: "BCA Virtual Account",
    logo: "/bca-logo.png",
    accountNumber: "8277162789917263",
  },
  {
    bank: "Mandiri Virtual Account",
    logo: "/mandiri-logo.png",
    accountNumber: "8973324467182934",
  },
  {
    bank: "BNI Virtual Account",
    logo: "/bni-logo.png",
    accountNumber: "8277162789917263",
  },
  {
    bank: "BRI Virtual Account",
    logo: "/bri-logo.png",
    accountNumber: "8277162789917263",
  },
];

export default function DetailPembayaran() {
  const [selectedMethod, setSelectedMethod] = useState(paymentMethods[0]);
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60); // 24 hours in seconds

  // Mock data - in real app, this would come from previous page state/props
  const selectedPackage = {
    name: "Paket Pernikahan Lengkap",
    price: "Rp 50.000.000",
    bookingDate: new Date().toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(secs).padStart(2, "0")}`;
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 text-gray-600">
      <div className="max-w-3xl mx-auto px-4">
        {/* Back Button */}
        <Link href="/page/Katalog">
          <button className="mb-8 inline-flex items-center text-gray-600 hover:text-pink-600 transition-colors">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Kembali
          </button>
        </Link>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-pink-600 px-6 py-4">
            <h1 className={`${cormorant.className} text-2xl text-white`}>
              Detail Pembayaran
            </h1>
          </div>

          {/* Order Summary */}
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold mb-4">Ringkasan Pesanan</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Paket</span>
                <span className="font-medium">{selectedPackage.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tanggal Booking</span>
                <span>{selectedPackage.bookingDate}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold mt-4">
                <span>Total Pembayaran</span>
                <span className="text-pink-600">{selectedPackage.price}</span>
              </div>
            </div>
          </div>

          {/* Payment Timer */}
          <div className="p-6 bg-pink-50 border-b">
            <div className="text-center">
              <p className="text-gray-600 mb-2">Selesaikan pembayaran dalam</p>
              <p className="text-2xl font-bold text-pink-600">
                {formatTime(timeLeft)}
              </p>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Metode Pembayaran</h2>

            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <button
                  key={method.bank}
                  onClick={() => setSelectedMethod(method)}
                  className={`w-full flex items-center justify-between p-4 rounded-lg border transition-all ${
                    selectedMethod.bank === method.bank
                      ? "border-pink-500 bg-pink-50"
                      : "border-gray-200 hover:border-pink-200"
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={method.logo}
                      alt={method.bank}
                      className="w-12 h-12 object-contain"
                    />
                    <span className="font-medium">{method.bank}</span>
                  </div>
                  <div
                    className={`w-6 h-6 rounded-full border-2 ${
                      selectedMethod.bank === method.bank
                        ? "border-pink-500 bg-pink-500"
                        : "border-gray-300"
                    }`}
                  >
                    {selectedMethod.bank === method.bank && (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Payment Instructions */}
            <div className="mt-6 p-6 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-4">Nomor Virtual Account</h3>
              <div className="flex items-center justify-between p-3 bg-white rounded border">
                <span className="font-mono text-lg">
                  {selectedMethod.accountNumber}
                </span>
                <button
                  onClick={() => handleCopy(selectedMethod.accountNumber)}
                  className="text-pink-600 hover:text-pink-700"
                >
                  <Copy className="w-5 h-5" />
                </button>
              </div>
              {copied && (
                <p className="text-sm text-green-600 mt-2">
                  Nomor VA berhasil disalin!
                </p>
              )}

              <div className="mt-6 space-y-4">
                <h3 className="font-semibold">Cara Pembayaran:</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-600">
                  <li>Buka aplikasi m-banking {selectedMethod.bank}</li>
                  <li>Pilih menu "Transfer" atau "Pembayaran"</li>
                  <li>Pilih "Virtual Account"</li>
                  <li>Masukkan nomor Virtual Account di atas</li>
                  <li>Periksa detail pembayaran</li>
                  <li>Masukkan PIN untuk konfirmasi</li>
                  <li>Pembayaran selesai</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="p-6 bg-gray-50 border-t">
            <div className="flex space-x-4">
              <Link href="#" className="w-full">
                <button className="w-full px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
                  Batalkan
                </button>
              </Link>
              <Link href="/" className="w-full">
                <button className="w-full px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition">
                  Kembali Ke Halaman Utama
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
