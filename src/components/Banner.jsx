import React from "react";
import WavyBackground from "./ui/BannerUI";

function WavyBackgroundDemo() {
  return (
    <WavyBackground className="max-w-4xl mx-auto ">
      <p className="text-2xl md:text-4xl lg:text-6xl text-white font-bold inter-var text-center">
      Escape reality, page by page.
      </p>
      <p className="text-base md:text-lg mt-4 text-white font-normal inter-var text-center">
        Open a book, open your mind, let the adventure begin!
      </p>
    </WavyBackground>
  );
}

export default WavyBackgroundDemo;
