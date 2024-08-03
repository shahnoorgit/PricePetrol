"use client";
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";

const heroImg = [
  { src: "/assets/images/hero-1.svg", alt: "smart-watch" },
  { src: "/assets/images/hero-2.svg", alt: "bag" },
  { src: "/assets/images/hero-3.svg", alt: "lamp" },
  { src: "/assets/images/hero-4.svg", alt: "air friyer" },
  { src: "/assets/images/hero-5.svg", alt: "chair" },
];

const HeroCouresell = () => {
  return (
    <div className=" hero-carousel">
      <Carousel
        autoPlay
        infiniteLoop
        interval={2000}
        showArrows={false}
        showStatus={false}
        showThumbs={false}
      >
        {heroImg.map((item) => (
          <div key={item.alt}>
            <Image
              width={484}
              height={484}
              className=" object-contain"
              src={item.src}
              alt={item.alt}
            />
          </div>
        ))}
      </Carousel>
      <Image
        alt="arrow"
        height={175}
        width={175}
        className=" max-xl:hidden absolute -left-[15%] bottom-0 "
        src={"/assets/icons/hand-drawn-arrow.svg"}
      />
    </div>
  );
};

export default HeroCouresell;
