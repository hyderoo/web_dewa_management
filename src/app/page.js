"use client";
import React, { useState } from "react";
import BaseLayout from "./page/Base/page";
import HeroSection from "./page/Hero/page";
import WhatsAppFloat from "./page/wa/page";
import SplashScreen from "./page/SplashScreen/page";
import LocationPage from "./page/Maps/page";
import WhyUs from "./page/KenapaKami/page";
import Profile from "./page/Profile/page";
import SpecialFeatures from "./page/SpecialFeatures/page";
import PortfolioPage from "./page/Portofolio/page";

export default function HomePage() {
  const [splashComplete, setSplashComplete] = useState(false);

  const handleSplashComplete = () => {
    setSplashComplete(true);
  };

  return (
    <>
      {!splashComplete ? (
        <SplashScreen onComplete={handleSplashComplete} />
      ) : (
        <BaseLayout>
          <div className="relative">
            <HeroSection />
            <WhyUs />
            <SpecialFeatures />
            <PortfolioPage />
            <WhatsAppFloat />
            <LocationPage />
          </div>
        </BaseLayout>
      )}
    </>
  );
}
