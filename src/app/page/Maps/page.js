import React from "react";
import { Cormorant_Garamond } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "600"],
});

export default function LocationPage() {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center sm:mb-16">
          <h2
            className={`
              ${cormorant.className}
              text-3xl 
              font-light 
              text-black 
              tracking-wide
              sm:text-4xl 
            `}
          >
            Lokasi Kami
          </h2>
          <p className="mt-3 mx-auto max-w-xl tracking-wider leading-relaxed text-gray-600 px-4 sm:mt-4 sm:max-w-2xl sm:px-0">
            Kunjungi studio kami atau hubungi untuk konsultasi pernikahan impian
            Anda
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Informasi Kontak */}
          <div className="space-y-6 p-6 bg-gray-50 rounded-lg">
            <div>
              <h3 className="text-xl font-semibold text-black mb-2">
                Alamat Kantor
              </h3>
              <p className="text-gray-700">
                Jalan Gading Serpong Boulevard Blok LA2 No. 22 Tangerang, Banten
                15810 Indonesia
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-black mb-2">Kontak</h3>
              <p className="text-gray-700">
                <strong>Telepon:</strong> +62 812-3456-7890
              </p>
              <p className="text-gray-700">
                <strong>Email:</strong> hello@weddingorganizer.com
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-black mb-2">
                Jam Operasional
              </h3>
              <p className="text-gray-700">
                Senin - Jumat: 09.00 - 18.00 WIB Sabtu: 10.00 - 16.00 WIB
                Minggu: Tutup
              </p>
            </div>
          </div>

          {/* Google Maps Embed */}
          <div className="w-full h-96 overflow-hidden rounded-lg shadow-xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.6533798019!2d106.61776367500577!3d-6.1753497619373655!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ff13fde3a34f%3A0x6f2a1d9680a2bec6!2sGading%20Serpong%20Boulevard!5e0!3m2!1sid!2sid!4v1703319481395!5m2!1sid!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* Petunjuk Arah */}
        <div className="mt-16 text-center">
          <h3
            className={`
              ${cormorant.className}
              text-2xl 
              font-light 
              text-black 
              tracking-wide
              mb-6
            `}
          >
            Petunjuk Arah
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="text-lg font-semibold mb-4 text-gray-600">
                Dari Arah Jakarta
              </h4>
              <p className="text-gray-700">
                Ambil Tol Jakarta-Serpong, keluar di Gerbang Tol Serpong, lalu
                ikuti Jalan Gading Serpong Boulevard
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="text-lg font-semibold mb-4 text-gray-600">
                Dari Arah Tangerang
              </h4>
              <p className="text-gray-700">
                Ikuti Jalan BSD, masuk ke Gading Serpong, lanjutkan ke Boulevard
                utama
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="text-lg font-semibold mb-4 text-gray-600">
                Transportasi Umum
              </h4>
              <p className="text-gray-700">
                Tersedia transportasi online dari area Jakarta dan Tangerang.
                Informasikan lokasi spesifik kepada pengemudi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
