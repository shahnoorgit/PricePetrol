import HeroCouresell from "@/components/HeroCouresell";
import Searchbar from "@/components/Searchbar";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <section className=" px-6 md:px-20 py-24">
        <div className=" flex max-xl:flex-col gap-16">
          <div className=" flex flex-col justify-center">
            <p className=" small-text">
              Smart Shoping Starts From Here:
              <Image
                src={"/assets/icons/arrow-right.svg"}
                alt="right arrow"
                width={16}
                height={16}
              />
            </p>
            <h1 className=" head-text">
              Scrape The Shoping Web With
              <span className="text-primary"> PricePetrol</span>
            </h1>
            <p className=" mt-6">
              PricePetrol is a sophisticated AI-powered web scraping tool that
              helps you find the most affordable prices for your favorite
              products. With its advanced algorithms and expertise, you'll
              always find the best deals on the internet.
            </p>
            <Searchbar />
          </div>
          <HeroCouresell />
        </div>
      </section>
      <section className="trending-section">
        <h2 className=" section-text">Trending</h2>
        <div className="flex flex-wrap gap-x-8 gap-y-16">
          {["apple iphone 15", "new google", "laptop"].map((item) => (
            <div>{item}</div>
          ))}
        </div>
      </section>
    </>
  );
}
