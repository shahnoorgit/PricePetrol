"use client";
import { scrapeAndStoreProduct } from "@/lib/actions";
import React, { FormEvent, useState } from "react";

const isValidShopUrl = (url: string): boolean => {
  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname;

    if (
      hostname.includes("amazon.com") ||
      hostname.includes("amazon.in") ||
      hostname.includes("amazon.co.uk") ||
      hostname.includes("amazon.ca") ||
      hostname.includes("amazon.fr") ||
      hostname.includes("amazon.es") ||
      hostname.includes("amazon.it") ||
      hostname.endsWith("amazon")
    ) {
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const Searchbar = () => {
  const [searchPrompt, setSearchPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isUrl = isValidShopUrl(searchPrompt);
    if (!isUrl) {
      alert("Please enter a valid Amazon product link");
      return;
    }

    try {
      setLoading(true);
      //scrape the product
      const product = await scrapeAndStoreProduct(searchPrompt);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className=" flex flex-wrap mt-12 gap-4">
      <input
        value={searchPrompt}
        onChange={(e) => setSearchPrompt(e.target.value)}
        type="text"
        placeholder="Enter product link"
        className="searchbar-input"
      />
      <button
        type="submit"
        disabled={searchPrompt === ""}
        className="searchbar-btn"
      >
        {loading ? "Searching" : "Search"}
      </button>
    </form>
  );
};

export default Searchbar;
