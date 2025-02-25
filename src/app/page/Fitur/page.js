"use client";
import React, { useState } from "react";
import { Cormorant_Garamond } from "next/font/google";
import CatalogPage from "../Katalog/page";
import BaseLayout from "../Base/page";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "600"],
});

export default function FeaturedServices() {
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedType, setSelectedType] = useState("all");

  const services = [
    {
      id: 1,
      title: "Koordinasi Pernikahan Menyeluruh",
      packageName: "Paket Lamaran Premium",
      description:
        "Layanan komprehensif untuk merancang dan mengeksekusi pernikahan impian Anda. Kami menyediakan koordinasi profesional dari perencanaan awal hingga hari bahagia, dengan perhatian detail yang tak tertandingi.",
      highlights: [
        "Koordinator acara berpengalaman",
        "Timeline acara terperinci",
        "Koordinasi vendor terpilih",
        "Gladi bersih profesional",
        "Pendampingan penuh selama 12 jam",
      ],
      image: "/produk1.jpg",
      price: 15000000,
      type: "koordinasi",
    },
    {
      id: 2,
      title: "Dekorasi Pernikahan Eksklusif",
      packageName: "Paket Dekorasi Elit",
      description:
        "Transformasi ruang pernikahan menjadi panggung romantis yang menceritakan kisah cinta Anda. Desain khusus yang memadukan estetika dan makna personal.",
      highlights: [
        "Dekorasi pelaminan premium",
        "Area photo booth artistik",
        "Desain pathway yang memukau",
        "Instalasi standing flower",
        "Konsultasi desain personal",
      ],
      image: "/produk2.jpg",
      price: 25000000,
      type: "dekorasi",
    },
    {
      id: 3,
      title: "Dokumentasi Cinematic",
      packageName: "Paket Dokumentasi Ultra",
      description:
        "Merekam setiap momen berharga dengan kualitas sinematik tinggi. Dokumentasi profesional yang mengabadikan kenangan terindah pernikahan Anda.",
      highlights: [
        "2 Photographer profesional",
        "2 Videographer berkualitas",
        "Drone shot ekslusif",
        "Same day edit video",
        "Album foto premium",
        "Dokumentasi menyeluruh",
      ],
      image: "/produk3.jpg",
      price: 20000000,
      type: "dokumentasi",
    },
  ];

  return (
    <BaseLayout>
      <CatalogPage />
    </BaseLayout>
  );
}
