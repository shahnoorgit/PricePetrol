import axios from "axios";
import * as cheerio from "cheerio";
import { extractCurrency, extractPrice } from "../utils";
export async function scrapeAmazonProduct(ProductUrl: string) {
  if (!ProductUrl) return;

  //brightdata config
  const username = String(process.env.BRIGHTDATA_USERNAME);
  const password = String(process.env.BRIGHTDATA_PASSWORD);
  const port = 22225;
  const session_id = (1000000 * Math.random()) | 0;
  const options = {
    auth: {
      username: `${username}-session-${session_id}`,
      password,
    },
    host: "brd.superproxy.io",
    port,
    rejectUnauthorized: false,
  };

  try {
    //fetch product
    const response = await axios.get(ProductUrl, options);
    const $ = cheerio.load(response.data);

    //extract title
    const title = $("#productTitle").text().trim();
    const currentPrice = extractPrice(
      $(".priceToPay span.a-price-whole"),
      $(".a.size.base.a-color-price"),
      $(".a-button-selected .a-color-base"),
      $(".a-price-whole")
    );
    const originalPrice = extractPrice(
      $(".a-price.a-text-price span.a-offscreen"),
      $("#priceblock_ourprice"),
      $("#listPrice"),
      $("#priceblock_dealprice"),
      $(".a-size-base.a-color-price")
    );

    const outOfStock =
      $("#availability span").text().trim().toLowerCase() ===
      "currently unavailable";

    const images =
      $("#imgBlkFront").attr("data-a-dynamic-image") ||
      $("#landingImage").attr("data-a-dynamic-image") ||
      "{}";

    const imageUrls = Object.keys(JSON.parse(images));

    const currency = extractCurrency($(".a-price-symbol"));
    const discountRate = $(".savingsPercentage").text().replace(/[-%]/g, "");
    const data = {
      url: ProductUrl,
      title,
      currentPrice: Number(currentPrice),
      originalPrice: Number(originalPrice),
      outOfStock,
      image: imageUrls[0],
      category: "category",
      currency: currency || "$",
      discountRate: Number(discountRate),
      priceHistory: [],
    };
  } catch (error) {
    console.log(error);
  }
}
