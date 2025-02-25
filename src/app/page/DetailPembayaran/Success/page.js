"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Cormorant_Garamond } from "next/font/google";
import { CheckCircle } from "lucide-react";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "600"],
});

const PaymentSuccess = () => {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    let timer;

    if (countdown === 0) {
      router.push("/");
    } else {
      timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [countdown, router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8 text-center">
            <div className="flex justify-center mb-6">
              <CheckCircle className="w-20 h-20 text-green-500" />
            </div>

            <h1
              className={`${cormorant.className} text-2xl font-semibold text-gray-800 mb-4`}
            >
              Pembayaran Berhasil!
            </h1>

            <p className="text-gray-600 mb-6">
              Terima kasih telah melakukan pembayaran. Tim kami akan segera
              menghubungi Anda untuk koordinasi lebih lanjut.
            </p>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-gray-600">
                Redirecting ke halaman utama dalam
              </p>
              <p className="text-2xl font-bold text-pink-600">{countdown}</p>
            </div>

            <button
              onClick={() => router.push("/")}
              className="w-full px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition"
            >
              Kembali Ke Halaman Utama
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
