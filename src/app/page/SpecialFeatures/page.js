import React from "react";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import {
  Star,
  Heart,
  Crown,
  Camera,
  Music,
  Palette,
  Users,
  Gift,
} from "lucide-react";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500"],
});

const SpecialFeatures = () => {
  const premiumFeatures = [
    {
      icon: <Crown className="w-12 h-12 mb-4" />,
      title: "Royal Wedding Experience",
      description:
        "Rasakan atmosfer pernikahan mewah dengan dekorasi dan pelayanan setara kerajaan",
    },
    {
      icon: <Camera className="w-12 h-12 mb-4" />,
      title: "Cinema Style Documentation",
      description:
        "Tim dokumentasi profesional dengan peralatan terkini untuk mengabadikan momen berharga",
    },
    {
      icon: <Music className="w-12 h-12 mb-4" />,
      title: "Premium Entertainment",
      description:
        "Pilihan entertainment berkelas untuk memeriahkan acara pernikahan Anda",
    },
    {
      icon: <Palette className="w-12 h-12 mb-4" />,
      title: "Custom Decoration",
      description:
        "Dekorasi yang dipersonalisasi sesuai tema dan keinginan Anda",
    },
  ];

  const additionalServices = [
    {
      title: "Honeymoon Planning",
      description: "Perencanaan bulan madu ke destinasi impian Anda",
      features: [
        "Pemilihan destinasi eksklusif",
        "Akomodasi mewah",
        "Itinerary khusus",
        "Concierge service",
      ],
    },
    {
      title: "Pre-Wedding Services",
      description: "Layanan lengkap untuk sesi foto pre-wedding",
      features: [
        "Lokasi eksotis",
        "Makeup artist profesional",
        "Fashion stylist",
        "Konsep kreatif",
      ],
    },
  ];

  return (
    <div className={`w-full bg-white ${montserrat.className} text-gray-600`}>
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-gray-100 flex items-center justify-center text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className={`text-4xl md:text-5xl mb-6 ${cormorant.className}`}>
            Special Features
          </h1>
          <p className="text-gray-600 text-sm md:text-base tracking-wider max-w-2xl mx-auto">
            Layanan eksklusif untuk mewujudkan pernikahan impian yang tak
            terlupakan
          </p>
        </div>
      </section>

      {/* Premium Features */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-3xl text-center mb-16 ${cormorant.className}`}>
            Premium Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {premiumFeatures.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="text-gray-700">{feature.icon}</div>
                <h3 className={`text-xl mb-3 ${cormorant.className}`}>
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-3xl text-center mb-16 ${cormorant.className}`}>
            Additional Services
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {additionalServices.map((service, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className={`text-2xl mb-4 ${cormorant.className}`}>
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-600">
                      <Star className="w-4 h-4 mr-2 text-gray-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Exclusive Benefits */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`text-3xl mb-16 ${cormorant.className}`}>
            Exclusive Benefits
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6">
              <Heart className="w-10 h-10 mx-auto mb-4 text-gray-700" />
              <h3 className="text-lg mb-3">Personal Touch</h3>
              <p className="text-gray-600 text-sm">
                Pendekatan personal untuk memahami setiap detail keinginan Anda
              </p>
            </div>
            <div className="p-6">
              <Users className="w-10 h-10 mx-auto mb-4 text-gray-700" />
              <h3 className="text-lg mb-3">Dedicated Team</h3>
              <p className="text-gray-600 text-sm">
                Tim khusus yang akan mendampingi persiapan hingga hari H
              </p>
            </div>
            <div className="p-6">
              <Gift className="w-10 h-10 mx-auto mb-4 text-gray-700" />
              <h3 className="text-lg mb-3">Special Gifts</h3>
              <p className="text-gray-600 text-sm">
                Bonus spesial untuk setiap paket premium yang dipilih
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SpecialFeatures;
