import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import Product from "./models/Product.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const products = [
  {
    "name": "Razer Electronics 553",
    "image": "https://picsum.photos/seed/10/800/800",
    "images": [
      "https://picsum.photos/seed/10/800/800",
      "https://picsum.photos/seed/11/800/800",
      "https://picsum.photos/seed/12/800/800",
      "https://picsum.photos/seed/13/800/800",
      "https://picsum.photos/seed/14/800/800"
    ],
    "description": "High-quality electronics from Razer. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Razer",
    "category": "Electronics",
    "price": 160710,
    "countInStock": 73,
    "isFeatured": false,
    "rating": 3.4,
    "numReviews": 102
  },
  {
    "name": "Puma Fashion 718",
    "image": "https://picsum.photos/seed/15/800/800",
    "images": [
      "https://picsum.photos/seed/15/800/800",
      "https://picsum.photos/seed/16/800/800",
      "https://picsum.photos/seed/17/800/800",
      "https://picsum.photos/seed/18/800/800",
      "https://picsum.photos/seed/19/800/800"
    ],
    "description": "High-quality fashion from Puma. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Puma",
    "category": "Fashion",
    "price": 8515,
    "countInStock": 42,
    "isFeatured": false,
    "rating": 3.6,
    "numReviews": 217
  },
  {
    "name": "Pepperfry Home & Furniture 134",
    "image": "https://picsum.photos/seed/20/800/800",
    "images": [
      "https://picsum.photos/seed/20/800/800",
      "https://picsum.photos/seed/21/800/800",
      "https://picsum.photos/seed/22/800/800",
      "https://picsum.photos/seed/23/800/800",
      "https://picsum.photos/seed/24/800/800"
    ],
    "description": "High-quality home & furniture from Pepperfry. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Pepperfry",
    "category": "Home & Furniture",
    "price": 40321,
    "countInStock": 61,
    "isFeatured": false,
    "rating": 3.9,
    "numReviews": 745
  },
  {
    "name": "Whirlpool Appliances 276",
    "image": "https://picsum.photos/seed/25/800/800",
    "images": [
      "https://picsum.photos/seed/25/800/800",
      "https://picsum.photos/seed/26/800/800",
      "https://picsum.photos/seed/27/800/800",
      "https://picsum.photos/seed/28/800/800",
      "https://picsum.photos/seed/29/800/800"
    ],
    "description": "High-quality appliances from Whirlpool. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Whirlpool",
    "category": "Appliances",
    "price": 24627,
    "countInStock": 76,
    "isFeatured": false,
    "rating": 3.9,
    "numReviews": 636
  },
  {
    "name": "Amul Grocery 136",
    "image": "https://picsum.photos/seed/30/800/800",
    "images": [
      "https://picsum.photos/seed/30/800/800",
      "https://picsum.photos/seed/31/800/800",
      "https://picsum.photos/seed/32/800/800",
      "https://picsum.photos/seed/33/800/800",
      "https://picsum.photos/seed/34/800/800"
    ],
    "description": "High-quality grocery from Amul. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Amul",
    "category": "Grocery",
    "price": 285,
    "countInStock": 74,
    "isFeatured": false,
    "rating": 3.2,
    "numReviews": 151
  },
  {
    "name": "Maybelline Beauty 171",
    "image": "https://picsum.photos/seed/35/800/800",
    "images": [
      "https://picsum.photos/seed/35/800/800",
      "https://picsum.photos/seed/36/800/800",
      "https://picsum.photos/seed/37/800/800",
      "https://picsum.photos/seed/38/800/800",
      "https://picsum.photos/seed/39/800/800"
    ],
    "description": "High-quality beauty from Maybelline. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Maybelline",
    "category": "Beauty",
    "price": 1732,
    "countInStock": 9,
    "isFeatured": true,
    "rating": 3.2,
    "numReviews": 215
  },
  {
    "name": "Samsung Wearables 831",
    "image": "https://picsum.photos/seed/40/800/800",
    "images": [
      "https://picsum.photos/seed/40/800/800",
      "https://picsum.photos/seed/41/800/800",
      "https://picsum.photos/seed/42/800/800",
      "https://picsum.photos/seed/43/800/800",
      "https://picsum.photos/seed/44/800/800"
    ],
    "description": "High-quality wearables from Samsung. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Samsung",
    "category": "Wearables",
    "price": 27612,
    "countInStock": 54,
    "isFeatured": false,
    "rating": 3.1,
    "numReviews": 754
  },
  {
    "name": "Samsonite Travel 129",
    "image": "https://picsum.photos/seed/45/800/800",
    "images": [
      "https://picsum.photos/seed/45/800/800",
      "https://picsum.photos/seed/46/800/800",
      "https://picsum.photos/seed/47/800/800",
      "https://picsum.photos/seed/48/800/800",
      "https://picsum.photos/seed/49/800/800"
    ],
    "description": "High-quality travel from Samsonite. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Samsonite",
    "category": "Travel",
    "price": 10113,
    "countInStock": 16,
    "isFeatured": true,
    "rating": 4.4,
    "numReviews": 298
  },
  {
    "name": "Decathlon Sports 73",
    "image": "https://picsum.photos/seed/50/800/800",
    "images": [
      "https://picsum.photos/seed/50/800/800",
      "https://picsum.photos/seed/51/800/800",
      "https://picsum.photos/seed/52/800/800",
      "https://picsum.photos/seed/53/800/800",
      "https://picsum.photos/seed/54/800/800"
    ],
    "description": "High-quality sports from Decathlon. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Decathlon",
    "category": "Sports",
    "price": 8033,
    "countInStock": 2,
    "isFeatured": false,
    "rating": 3.4,
    "numReviews": 61
  },
  {
    "name": "Oxford Books 212",
    "image": "https://picsum.photos/seed/55/800/800",
    "images": [
      "https://picsum.photos/seed/55/800/800",
      "https://picsum.photos/seed/56/800/800",
      "https://picsum.photos/seed/57/800/800",
      "https://picsum.photos/seed/58/800/800",
      "https://picsum.photos/seed/59/800/800"
    ],
    "description": "High-quality books from Oxford. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Oxford",
    "category": "Books",
    "price": 2039,
    "countInStock": 46,
    "isFeatured": false,
    "rating": 3.5,
    "numReviews": 379
  },
  {
    "name": "Realme Mobiles 400",
    "image": "https://picsum.photos/seed/60/800/800",
    "images": [
      "https://picsum.photos/seed/60/800/800",
      "https://picsum.photos/seed/61/800/800",
      "https://picsum.photos/seed/62/800/800",
      "https://picsum.photos/seed/63/800/800",
      "https://picsum.photos/seed/64/800/800"
    ],
    "description": "High-quality mobiles from Realme. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Realme",
    "category": "Mobiles",
    "price": 44555,
    "countInStock": 72,
    "isFeatured": false,
    "rating": 4.5,
    "numReviews": 439
  },
  {
    "name": "Razer Electronics 763",
    "image": "https://picsum.photos/seed/65/800/800",
    "images": [
      "https://picsum.photos/seed/65/800/800",
      "https://picsum.photos/seed/66/800/800",
      "https://picsum.photos/seed/67/800/800",
      "https://picsum.photos/seed/68/800/800",
      "https://picsum.photos/seed/69/800/800"
    ],
    "description": "High-quality electronics from Razer. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Razer",
    "category": "Electronics",
    "price": 68822,
    "countInStock": 60,
    "isFeatured": false,
    "rating": 4.2,
    "numReviews": 635
  },
  {
    "name": "FabIndia Fashion 165",
    "image": "https://picsum.photos/seed/70/800/800",
    "images": [
      "https://picsum.photos/seed/70/800/800",
      "https://picsum.photos/seed/71/800/800",
      "https://picsum.photos/seed/72/800/800",
      "https://picsum.photos/seed/73/800/800",
      "https://picsum.photos/seed/74/800/800"
    ],
    "description": "High-quality fashion from FabIndia. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "FabIndia",
    "category": "Fashion",
    "price": 9319,
    "countInStock": 49,
    "isFeatured": false,
    "rating": 4,
    "numReviews": 14
  },
  {
    "name": "IKEA Home & Furniture 888",
    "image": "https://picsum.photos/seed/75/800/800",
    "images": [
      "https://picsum.photos/seed/75/800/800",
      "https://picsum.photos/seed/76/800/800",
      "https://picsum.photos/seed/77/800/800",
      "https://picsum.photos/seed/78/800/800",
      "https://picsum.photos/seed/79/800/800"
    ],
    "description": "High-quality home & furniture from IKEA. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "IKEA",
    "category": "Home & Furniture",
    "price": 44619,
    "countInStock": 22,
    "isFeatured": false,
    "rating": 4.9,
    "numReviews": 481
  },
  {
    "name": "Bajaj Appliances 254",
    "image": "https://picsum.photos/seed/80/800/800",
    "images": [
      "https://picsum.photos/seed/80/800/800",
      "https://picsum.photos/seed/81/800/800",
      "https://picsum.photos/seed/82/800/800",
      "https://picsum.photos/seed/83/800/800",
      "https://picsum.photos/seed/84/800/800"
    ],
    "description": "High-quality appliances from Bajaj. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Bajaj",
    "category": "Appliances",
    "price": 60702,
    "countInStock": 85,
    "isFeatured": true,
    "rating": 4.2,
    "numReviews": 783
  },
  {
    "name": "Organic India Grocery 436",
    "image": "https://picsum.photos/seed/85/800/800",
    "images": [
      "https://picsum.photos/seed/85/800/800",
      "https://picsum.photos/seed/86/800/800",
      "https://picsum.photos/seed/87/800/800",
      "https://picsum.photos/seed/88/800/800",
      "https://picsum.photos/seed/89/800/800"
    ],
    "description": "High-quality grocery from Organic India. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Organic India",
    "category": "Grocery",
    "price": 1777,
    "countInStock": 2,
    "isFeatured": false,
    "rating": 3.8,
    "numReviews": 173
  },
  {
    "name": "Lakme Beauty 761",
    "image": "https://picsum.photos/seed/90/800/800",
    "images": [
      "https://picsum.photos/seed/90/800/800",
      "https://picsum.photos/seed/91/800/800",
      "https://picsum.photos/seed/92/800/800",
      "https://picsum.photos/seed/93/800/800",
      "https://picsum.photos/seed/94/800/800"
    ],
    "description": "High-quality beauty from Lakme. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Lakme",
    "category": "Beauty",
    "price": 377,
    "countInStock": 64,
    "isFeatured": false,
    "rating": 3.6,
    "numReviews": 770
  },
  {
    "name": "Garmin Wearables 810",
    "image": "https://picsum.photos/seed/95/800/800",
    "images": [
      "https://picsum.photos/seed/95/800/800",
      "https://picsum.photos/seed/96/800/800",
      "https://picsum.photos/seed/97/800/800",
      "https://picsum.photos/seed/98/800/800",
      "https://picsum.photos/seed/99/800/800"
    ],
    "description": "High-quality wearables from Garmin. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Garmin",
    "category": "Wearables",
    "price": 38123,
    "countInStock": 91,
    "isFeatured": true,
    "rating": 4.6,
    "numReviews": 250
  },
  {
    "name": "Mocobara Travel 127",
    "image": "https://picsum.photos/seed/100/800/800",
    "images": [
      "https://picsum.photos/seed/100/800/800",
      "https://picsum.photos/seed/101/800/800",
      "https://picsum.photos/seed/102/800/800",
      "https://picsum.photos/seed/103/800/800",
      "https://picsum.photos/seed/104/800/800"
    ],
    "description": "High-quality travel from Mocobara. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Mocobara",
    "category": "Travel",
    "price": 14305,
    "countInStock": 85,
    "isFeatured": true,
    "rating": 4.3,
    "numReviews": 180
  },
  {
    "name": "Wilson Sports 719",
    "image": "https://picsum.photos/seed/105/800/800",
    "images": [
      "https://picsum.photos/seed/105/800/800",
      "https://picsum.photos/seed/106/800/800",
      "https://picsum.photos/seed/107/800/800",
      "https://picsum.photos/seed/108/800/800",
      "https://picsum.photos/seed/109/800/800"
    ],
    "description": "High-quality sports from Wilson. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Wilson",
    "category": "Sports",
    "price": 27355,
    "countInStock": 61,
    "isFeatured": false,
    "rating": 4.5,
    "numReviews": 364
  },
  {
    "name": "Rupa Books 177",
    "image": "https://picsum.photos/seed/110/800/800",
    "images": [
      "https://picsum.photos/seed/110/800/800",
      "https://picsum.photos/seed/111/800/800",
      "https://picsum.photos/seed/112/800/800",
      "https://picsum.photos/seed/113/800/800",
      "https://picsum.photos/seed/114/800/800"
    ],
    "description": "High-quality books from Rupa. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Rupa",
    "category": "Books",
    "price": 243,
    "countInStock": 63,
    "isFeatured": true,
    "rating": 4.9,
    "numReviews": 906
  },
  {
    "name": "Realme Mobiles 477",
    "image": "https://picsum.photos/seed/115/800/800",
    "images": [
      "https://picsum.photos/seed/115/800/800",
      "https://picsum.photos/seed/116/800/800",
      "https://picsum.photos/seed/117/800/800",
      "https://picsum.photos/seed/118/800/800",
      "https://picsum.photos/seed/119/800/800"
    ],
    "description": "High-quality mobiles from Realme. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Realme",
    "category": "Mobiles",
    "price": 66293,
    "countInStock": 21,
    "isFeatured": false,
    "rating": 4.3,
    "numReviews": 86
  },
  {
    "name": "Asus Electronics 698",
    "image": "https://picsum.photos/seed/120/800/800",
    "images": [
      "https://picsum.photos/seed/120/800/800",
      "https://picsum.photos/seed/121/800/800",
      "https://picsum.photos/seed/122/800/800",
      "https://picsum.photos/seed/123/800/800",
      "https://picsum.photos/seed/124/800/800"
    ],
    "description": "High-quality electronics from Asus. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Asus",
    "category": "Electronics",
    "price": 92393,
    "countInStock": 46,
    "isFeatured": false,
    "rating": 4.2,
    "numReviews": 282
  },
  {
    "name": "Allen Solly Fashion 634",
    "image": "https://picsum.photos/seed/125/800/800",
    "images": [
      "https://picsum.photos/seed/125/800/800",
      "https://picsum.photos/seed/126/800/800",
      "https://picsum.photos/seed/127/800/800",
      "https://picsum.photos/seed/128/800/800",
      "https://picsum.photos/seed/129/800/800"
    ],
    "description": "High-quality fashion from Allen Solly. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Allen Solly",
    "category": "Fashion",
    "price": 9090,
    "countInStock": 69,
    "isFeatured": false,
    "rating": 3.6,
    "numReviews": 613
  },
  {
    "name": "Nilkamal Home & Furniture 338",
    "image": "https://picsum.photos/seed/130/800/800",
    "images": [
      "https://picsum.photos/seed/130/800/800",
      "https://picsum.photos/seed/131/800/800",
      "https://picsum.photos/seed/132/800/800",
      "https://picsum.photos/seed/133/800/800",
      "https://picsum.photos/seed/134/800/800"
    ],
    "description": "High-quality home & furniture from Nilkamal. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Nilkamal",
    "category": "Home & Furniture",
    "price": 13058,
    "countInStock": 74,
    "isFeatured": false,
    "rating": 4.5,
    "numReviews": 736
  },
  {
    "name": "Bajaj Appliances 912",
    "image": "https://picsum.photos/seed/135/800/800",
    "images": [
      "https://picsum.photos/seed/135/800/800",
      "https://picsum.photos/seed/136/800/800",
      "https://picsum.photos/seed/137/800/800",
      "https://picsum.photos/seed/138/800/800",
      "https://picsum.photos/seed/139/800/800"
    ],
    "description": "High-quality appliances from Bajaj. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Bajaj",
    "category": "Appliances",
    "price": 11597,
    "countInStock": 5,
    "isFeatured": false,
    "rating": 4.3,
    "numReviews": 355
  },
  {
    "name": "Reliance Grocery 227",
    "image": "https://picsum.photos/seed/140/800/800",
    "images": [
      "https://picsum.photos/seed/140/800/800",
      "https://picsum.photos/seed/141/800/800",
      "https://picsum.photos/seed/142/800/800",
      "https://picsum.photos/seed/143/800/800",
      "https://picsum.photos/seed/144/800/800"
    ],
    "description": "High-quality grocery from Reliance. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Reliance",
    "category": "Grocery",
    "price": 2102,
    "countInStock": 99,
    "isFeatured": false,
    "rating": 3.8,
    "numReviews": 920
  },
  {
    "name": "Estee Lauder Beauty 746",
    "image": "https://picsum.photos/seed/145/800/800",
    "images": [
      "https://picsum.photos/seed/145/800/800",
      "https://picsum.photos/seed/146/800/800",
      "https://picsum.photos/seed/147/800/800",
      "https://picsum.photos/seed/148/800/800",
      "https://picsum.photos/seed/149/800/800"
    ],
    "description": "High-quality beauty from Estee Lauder. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Estee Lauder",
    "category": "Beauty",
    "price": 4607,
    "countInStock": 80,
    "isFeatured": false,
    "rating": 4.8,
    "numReviews": 282
  },
  {
    "name": "boAt Wearables 466",
    "image": "https://picsum.photos/seed/150/800/800",
    "images": [
      "https://picsum.photos/seed/150/800/800",
      "https://picsum.photos/seed/151/800/800",
      "https://picsum.photos/seed/152/800/800",
      "https://picsum.photos/seed/153/800/800",
      "https://picsum.photos/seed/154/800/800"
    ],
    "description": "High-quality wearables from boAt. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "boAt",
    "category": "Wearables",
    "price": 3042,
    "countInStock": 68,
    "isFeatured": false,
    "rating": 4.5,
    "numReviews": 856
  },
  {
    "name": "Mocobara Travel 485",
    "image": "https://picsum.photos/seed/155/800/800",
    "images": [
      "https://picsum.photos/seed/155/800/800",
      "https://picsum.photos/seed/156/800/800",
      "https://picsum.photos/seed/157/800/800",
      "https://picsum.photos/seed/158/800/800",
      "https://picsum.photos/seed/159/800/800"
    ],
    "description": "High-quality travel from Mocobara. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Mocobara",
    "category": "Travel",
    "price": 19828,
    "countInStock": 45,
    "isFeatured": true,
    "rating": 4.9,
    "numReviews": 28
  },
  {
    "name": "Speedo Sports 444",
    "image": "https://picsum.photos/seed/160/800/800",
    "images": [
      "https://picsum.photos/seed/160/800/800",
      "https://picsum.photos/seed/161/800/800",
      "https://picsum.photos/seed/162/800/800",
      "https://picsum.photos/seed/163/800/800",
      "https://picsum.photos/seed/164/800/800"
    ],
    "description": "High-quality sports from Speedo. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Speedo",
    "category": "Sports",
    "price": 27933,
    "countInStock": 56,
    "isFeatured": false,
    "rating": 3.2,
    "numReviews": 135
  },
  {
    "name": "Oxford Books 534",
    "image": "https://picsum.photos/seed/165/800/800",
    "images": [
      "https://picsum.photos/seed/165/800/800",
      "https://picsum.photos/seed/166/800/800",
      "https://picsum.photos/seed/167/800/800",
      "https://picsum.photos/seed/168/800/800",
      "https://picsum.photos/seed/169/800/800"
    ],
    "description": "High-quality books from Oxford. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Oxford",
    "category": "Books",
    "price": 2021,
    "countInStock": 99,
    "isFeatured": true,
    "rating": 3.3,
    "numReviews": 844
  },
  {
    "name": "Samsung Mobiles 451",
    "image": "https://picsum.photos/seed/170/800/800",
    "images": [
      "https://picsum.photos/seed/170/800/800",
      "https://picsum.photos/seed/171/800/800",
      "https://picsum.photos/seed/172/800/800",
      "https://picsum.photos/seed/173/800/800",
      "https://picsum.photos/seed/174/800/800"
    ],
    "description": "High-quality mobiles from Samsung. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Samsung",
    "category": "Mobiles",
    "price": 82386,
    "countInStock": 4,
    "isFeatured": false,
    "rating": 5,
    "numReviews": 64
  },
  {
    "name": "MSI Electronics 1",
    "image": "https://picsum.photos/seed/175/800/800",
    "images": [
      "https://picsum.photos/seed/175/800/800",
      "https://picsum.photos/seed/176/800/800",
      "https://picsum.photos/seed/177/800/800",
      "https://picsum.photos/seed/178/800/800",
      "https://picsum.photos/seed/179/800/800"
    ],
    "description": "High-quality electronics from MSI. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "MSI",
    "category": "Electronics",
    "price": 134590,
    "countInStock": 75,
    "isFeatured": false,
    "rating": 4,
    "numReviews": 853
  },
  {
    "name": "Adidas Fashion 55",
    "image": "https://picsum.photos/seed/180/800/800",
    "images": [
      "https://picsum.photos/seed/180/800/800",
      "https://picsum.photos/seed/181/800/800",
      "https://picsum.photos/seed/182/800/800",
      "https://picsum.photos/seed/183/800/800",
      "https://picsum.photos/seed/184/800/800"
    ],
    "description": "High-quality fashion from Adidas. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Adidas",
    "category": "Fashion",
    "price": 7817,
    "countInStock": 42,
    "isFeatured": false,
    "rating": 4,
    "numReviews": 126
  },
  {
    "name": "Urban Ladder Home & Furniture 930",
    "image": "https://picsum.photos/seed/185/800/800",
    "images": [
      "https://picsum.photos/seed/185/800/800",
      "https://picsum.photos/seed/186/800/800",
      "https://picsum.photos/seed/187/800/800",
      "https://picsum.photos/seed/188/800/800",
      "https://picsum.photos/seed/189/800/800"
    ],
    "description": "High-quality home & furniture from Urban Ladder. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Urban Ladder",
    "category": "Home & Furniture",
    "price": 43040,
    "countInStock": 67,
    "isFeatured": true,
    "rating": 3.4,
    "numReviews": 459
  },
  {
    "name": "Whirlpool Appliances 625",
    "image": "https://picsum.photos/seed/190/800/800",
    "images": [
      "https://picsum.photos/seed/190/800/800",
      "https://picsum.photos/seed/191/800/800",
      "https://picsum.photos/seed/192/800/800",
      "https://picsum.photos/seed/193/800/800",
      "https://picsum.photos/seed/194/800/800"
    ],
    "description": "High-quality appliances from Whirlpool. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Whirlpool",
    "category": "Appliances",
    "price": 40251,
    "countInStock": 24,
    "isFeatured": false,
    "rating": 4.5,
    "numReviews": 229
  },
  {
    "name": "Reliance Grocery 18",
    "image": "https://picsum.photos/seed/195/800/800",
    "images": [
      "https://picsum.photos/seed/195/800/800",
      "https://picsum.photos/seed/196/800/800",
      "https://picsum.photos/seed/197/800/800",
      "https://picsum.photos/seed/198/800/800",
      "https://picsum.photos/seed/199/800/800"
    ],
    "description": "High-quality grocery from Reliance. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Reliance",
    "category": "Grocery",
    "price": 2324,
    "countInStock": 97,
    "isFeatured": false,
    "rating": 4.5,
    "numReviews": 755
  },
  {
    "name": "Estee Lauder Beauty 77",
    "image": "https://picsum.photos/seed/200/800/800",
    "images": [
      "https://picsum.photos/seed/200/800/800",
      "https://picsum.photos/seed/201/800/800",
      "https://picsum.photos/seed/202/800/800",
      "https://picsum.photos/seed/203/800/800",
      "https://picsum.photos/seed/204/800/800"
    ],
    "description": "High-quality beauty from Estee Lauder. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Estee Lauder",
    "category": "Beauty",
    "price": 3034,
    "countInStock": 46,
    "isFeatured": false,
    "rating": 3.7,
    "numReviews": 765
  },
  {
    "name": "Noise Wearables 770",
    "image": "https://picsum.photos/seed/205/800/800",
    "images": [
      "https://picsum.photos/seed/205/800/800",
      "https://picsum.photos/seed/206/800/800",
      "https://picsum.photos/seed/207/800/800",
      "https://picsum.photos/seed/208/800/800",
      "https://picsum.photos/seed/209/800/800"
    ],
    "description": "High-quality wearables from Noise. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Noise",
    "category": "Wearables",
    "price": 37755,
    "countInStock": 41,
    "isFeatured": false,
    "rating": 4.4,
    "numReviews": 483
  },
  {
    "name": "Wildcraft Travel 963",
    "image": "https://picsum.photos/seed/210/800/800",
    "images": [
      "https://picsum.photos/seed/210/800/800",
      "https://picsum.photos/seed/211/800/800",
      "https://picsum.photos/seed/212/800/800",
      "https://picsum.photos/seed/213/800/800",
      "https://picsum.photos/seed/214/800/800"
    ],
    "description": "High-quality travel from Wildcraft. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Wildcraft",
    "category": "Travel",
    "price": 3512,
    "countInStock": 42,
    "isFeatured": false,
    "rating": 3.7,
    "numReviews": 947
  },
  {
    "name": "Cosco Sports 660",
    "image": "https://picsum.photos/seed/215/800/800",
    "images": [
      "https://picsum.photos/seed/215/800/800",
      "https://picsum.photos/seed/216/800/800",
      "https://picsum.photos/seed/217/800/800",
      "https://picsum.photos/seed/218/800/800",
      "https://picsum.photos/seed/219/800/800"
    ],
    "description": "High-quality sports from Cosco. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Cosco",
    "category": "Sports",
    "price": 26623,
    "countInStock": 18,
    "isFeatured": false,
    "rating": 4.3,
    "numReviews": 371
  },
  {
    "name": "Scholastic Books 479",
    "image": "https://picsum.photos/seed/220/800/800",
    "images": [
      "https://picsum.photos/seed/220/800/800",
      "https://picsum.photos/seed/221/800/800",
      "https://picsum.photos/seed/222/800/800",
      "https://picsum.photos/seed/223/800/800",
      "https://picsum.photos/seed/224/800/800"
    ],
    "description": "High-quality books from Scholastic. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Scholastic",
    "category": "Books",
    "price": 796,
    "countInStock": 60,
    "isFeatured": false,
    "rating": 4,
    "numReviews": 604
  },
  {
    "name": "Google Mobiles 191",
    "image": "https://picsum.photos/seed/225/800/800",
    "images": [
      "https://picsum.photos/seed/225/800/800",
      "https://picsum.photos/seed/226/800/800",
      "https://picsum.photos/seed/227/800/800",
      "https://picsum.photos/seed/228/800/800",
      "https://picsum.photos/seed/229/800/800"
    ],
    "description": "High-quality mobiles from Google. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Google",
    "category": "Mobiles",
    "price": 74010,
    "countInStock": 83,
    "isFeatured": false,
    "rating": 4.4,
    "numReviews": 952
  },
  {
    "name": "Razer Electronics 166",
    "image": "https://picsum.photos/seed/230/800/800",
    "images": [
      "https://picsum.photos/seed/230/800/800",
      "https://picsum.photos/seed/231/800/800",
      "https://picsum.photos/seed/232/800/800",
      "https://picsum.photos/seed/233/800/800",
      "https://picsum.photos/seed/234/800/800"
    ],
    "description": "High-quality electronics from Razer. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Razer",
    "category": "Electronics",
    "price": 106112,
    "countInStock": 7,
    "isFeatured": true,
    "rating": 4.8,
    "numReviews": 62
  },
  {
    "name": "Nike Fashion 438",
    "image": "https://picsum.photos/seed/235/800/800",
    "images": [
      "https://picsum.photos/seed/235/800/800",
      "https://picsum.photos/seed/236/800/800",
      "https://picsum.photos/seed/237/800/800",
      "https://picsum.photos/seed/238/800/800",
      "https://picsum.photos/seed/239/800/800"
    ],
    "description": "High-quality fashion from Nike. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Nike",
    "category": "Fashion",
    "price": 5510,
    "countInStock": 38,
    "isFeatured": false,
    "rating": 4.7,
    "numReviews": 160
  },
  {
    "name": "Pepperfry Home & Furniture 188",
    "image": "https://picsum.photos/seed/240/800/800",
    "images": [
      "https://picsum.photos/seed/240/800/800",
      "https://picsum.photos/seed/241/800/800",
      "https://picsum.photos/seed/242/800/800",
      "https://picsum.photos/seed/243/800/800",
      "https://picsum.photos/seed/244/800/800"
    ],
    "description": "High-quality home & furniture from Pepperfry. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Pepperfry",
    "category": "Home & Furniture",
    "price": 50926,
    "countInStock": 75,
    "isFeatured": false,
    "rating": 4.4,
    "numReviews": 985
  },
  {
    "name": "Kent Appliances 469",
    "image": "https://picsum.photos/seed/245/800/800",
    "images": [
      "https://picsum.photos/seed/245/800/800",
      "https://picsum.photos/seed/246/800/800",
      "https://picsum.photos/seed/247/800/800",
      "https://picsum.photos/seed/248/800/800",
      "https://picsum.photos/seed/249/800/800"
    ],
    "description": "High-quality appliances from Kent. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Kent",
    "category": "Appliances",
    "price": 54204,
    "countInStock": 60,
    "isFeatured": false,
    "rating": 4.5,
    "numReviews": 252
  },
  {
    "name": "Reliance Grocery 294",
    "image": "https://picsum.photos/seed/250/800/800",
    "images": [
      "https://picsum.photos/seed/250/800/800",
      "https://picsum.photos/seed/251/800/800",
      "https://picsum.photos/seed/252/800/800",
      "https://picsum.photos/seed/253/800/800",
      "https://picsum.photos/seed/254/800/800"
    ],
    "description": "High-quality grocery from Reliance. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Reliance",
    "category": "Grocery",
    "price": 3838,
    "countInStock": 94,
    "isFeatured": false,
    "rating": 4.2,
    "numReviews": 217
  },
  {
    "name": "Neutrogena Beauty 394",
    "image": "https://picsum.photos/seed/255/800/800",
    "images": [
      "https://picsum.photos/seed/255/800/800",
      "https://picsum.photos/seed/256/800/800",
      "https://picsum.photos/seed/257/800/800",
      "https://picsum.photos/seed/258/800/800",
      "https://picsum.photos/seed/259/800/800"
    ],
    "description": "High-quality beauty from Neutrogena. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Neutrogena",
    "category": "Beauty",
    "price": 2783,
    "countInStock": 44,
    "isFeatured": false,
    "rating": 4.3,
    "numReviews": 349
  },
  {
    "name": "Samsung Wearables 86",
    "image": "https://picsum.photos/seed/260/800/800",
    "images": [
      "https://picsum.photos/seed/260/800/800",
      "https://picsum.photos/seed/261/800/800",
      "https://picsum.photos/seed/262/800/800",
      "https://picsum.photos/seed/263/800/800",
      "https://picsum.photos/seed/264/800/800"
    ],
    "description": "High-quality wearables from Samsung. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Samsung",
    "category": "Wearables",
    "price": 38418,
    "countInStock": 87,
    "isFeatured": true,
    "rating": 3.2,
    "numReviews": 111
  },
  {
    "name": "Skybags Travel 51",
    "image": "https://picsum.photos/seed/265/800/800",
    "images": [
      "https://picsum.photos/seed/265/800/800",
      "https://picsum.photos/seed/266/800/800",
      "https://picsum.photos/seed/267/800/800",
      "https://picsum.photos/seed/268/800/800",
      "https://picsum.photos/seed/269/800/800"
    ],
    "description": "High-quality travel from Skybags. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Skybags",
    "category": "Travel",
    "price": 15809,
    "countInStock": 67,
    "isFeatured": false,
    "rating": 4.9,
    "numReviews": 824
  },
  {
    "name": "Powermax Sports 493",
    "image": "https://picsum.photos/seed/270/800/800",
    "images": [
      "https://picsum.photos/seed/270/800/800",
      "https://picsum.photos/seed/271/800/800",
      "https://picsum.photos/seed/272/800/800",
      "https://picsum.photos/seed/273/800/800",
      "https://picsum.photos/seed/274/800/800"
    ],
    "description": "High-quality sports from Powermax. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Powermax",
    "category": "Sports",
    "price": 19613,
    "countInStock": 91,
    "isFeatured": false,
    "rating": 4.9,
    "numReviews": 250
  },
  {
    "name": "Westland Books 287",
    "image": "https://picsum.photos/seed/275/800/800",
    "images": [
      "https://picsum.photos/seed/275/800/800",
      "https://picsum.photos/seed/276/800/800",
      "https://picsum.photos/seed/277/800/800",
      "https://picsum.photos/seed/278/800/800",
      "https://picsum.photos/seed/279/800/800"
    ],
    "description": "High-quality books from Westland. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Westland",
    "category": "Books",
    "price": 883,
    "countInStock": 51,
    "isFeatured": false,
    "rating": 3.5,
    "numReviews": 360
  },
  {
    "name": "Google Mobiles 579",
    "image": "https://picsum.photos/seed/280/800/800",
    "images": [
      "https://picsum.photos/seed/280/800/800",
      "https://picsum.photos/seed/281/800/800",
      "https://picsum.photos/seed/282/800/800",
      "https://picsum.photos/seed/283/800/800",
      "https://picsum.photos/seed/284/800/800"
    ],
    "description": "High-quality mobiles from Google. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Google",
    "category": "Mobiles",
    "price": 122647,
    "countInStock": 70,
    "isFeatured": false,
    "rating": 4.8,
    "numReviews": 391
  },
  {
    "name": "Microsoft Electronics 205",
    "image": "https://picsum.photos/seed/285/800/800",
    "images": [
      "https://picsum.photos/seed/285/800/800",
      "https://picsum.photos/seed/286/800/800",
      "https://picsum.photos/seed/287/800/800",
      "https://picsum.photos/seed/288/800/800",
      "https://picsum.photos/seed/289/800/800"
    ],
    "description": "High-quality electronics from Microsoft. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Microsoft",
    "category": "Electronics",
    "price": 72270,
    "countInStock": 79,
    "isFeatured": false,
    "rating": 4.1,
    "numReviews": 840
  },
  {
    "name": "Biba Fashion 462",
    "image": "https://picsum.photos/seed/290/800/800",
    "images": [
      "https://picsum.photos/seed/290/800/800",
      "https://picsum.photos/seed/291/800/800",
      "https://picsum.photos/seed/292/800/800",
      "https://picsum.photos/seed/293/800/800",
      "https://picsum.photos/seed/294/800/800"
    ],
    "description": "High-quality fashion from Biba. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Biba",
    "category": "Fashion",
    "price": 9241,
    "countInStock": 4,
    "isFeatured": false,
    "rating": 4.7,
    "numReviews": 989
  },
  {
    "name": "Urban Ladder Home & Furniture 231",
    "image": "https://picsum.photos/seed/295/800/800",
    "images": [
      "https://picsum.photos/seed/295/800/800",
      "https://picsum.photos/seed/296/800/800",
      "https://picsum.photos/seed/297/800/800",
      "https://picsum.photos/seed/298/800/800",
      "https://picsum.photos/seed/299/800/800"
    ],
    "description": "High-quality home & furniture from Urban Ladder. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Urban Ladder",
    "category": "Home & Furniture",
    "price": 41231,
    "countInStock": 90,
    "isFeatured": false,
    "rating": 4.5,
    "numReviews": 118
  },
  {
    "name": "Samsung Appliances 289",
    "image": "https://picsum.photos/seed/300/800/800",
    "images": [
      "https://picsum.photos/seed/300/800/800",
      "https://picsum.photos/seed/301/800/800",
      "https://picsum.photos/seed/302/800/800",
      "https://picsum.photos/seed/303/800/800",
      "https://picsum.photos/seed/304/800/800"
    ],
    "description": "High-quality appliances from Samsung. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Samsung",
    "category": "Appliances",
    "price": 48035,
    "countInStock": 56,
    "isFeatured": false,
    "rating": 4.5,
    "numReviews": 114
  },
  {
    "name": "Reliance Grocery 959",
    "image": "https://picsum.photos/seed/305/800/800",
    "images": [
      "https://picsum.photos/seed/305/800/800",
      "https://picsum.photos/seed/306/800/800",
      "https://picsum.photos/seed/307/800/800",
      "https://picsum.photos/seed/308/800/800",
      "https://picsum.photos/seed/309/800/800"
    ],
    "description": "High-quality grocery from Reliance. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Reliance",
    "category": "Grocery",
    "price": 3141,
    "countInStock": 82,
    "isFeatured": false,
    "rating": 4.1,
    "numReviews": 739
  },
  {
    "name": "The Body Shop Beauty 381",
    "image": "https://picsum.photos/seed/310/800/800",
    "images": [
      "https://picsum.photos/seed/310/800/800",
      "https://picsum.photos/seed/311/800/800",
      "https://picsum.photos/seed/312/800/800",
      "https://picsum.photos/seed/313/800/800",
      "https://picsum.photos/seed/314/800/800"
    ],
    "description": "High-quality beauty from The Body Shop. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "The Body Shop",
    "category": "Beauty",
    "price": 2141,
    "countInStock": 5,
    "isFeatured": false,
    "rating": 3.4,
    "numReviews": 541
  },
  {
    "name": "Fossil Wearables 274",
    "image": "https://picsum.photos/seed/315/800/800",
    "images": [
      "https://picsum.photos/seed/315/800/800",
      "https://picsum.photos/seed/316/800/800",
      "https://picsum.photos/seed/317/800/800",
      "https://picsum.photos/seed/318/800/800",
      "https://picsum.photos/seed/319/800/800"
    ],
    "description": "High-quality wearables from Fossil. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Fossil",
    "category": "Wearables",
    "price": 26462,
    "countInStock": 24,
    "isFeatured": true,
    "rating": 4.9,
    "numReviews": 731
  },
  {
    "name": "Samsonite Travel 79",
    "image": "https://picsum.photos/seed/320/800/800",
    "images": [
      "https://picsum.photos/seed/320/800/800",
      "https://picsum.photos/seed/321/800/800",
      "https://picsum.photos/seed/322/800/800",
      "https://picsum.photos/seed/323/800/800",
      "https://picsum.photos/seed/324/800/800"
    ],
    "description": "High-quality travel from Samsonite. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Samsonite",
    "category": "Travel",
    "price": 17520,
    "countInStock": 60,
    "isFeatured": false,
    "rating": 4.8,
    "numReviews": 788
  },
  {
    "name": "Decathlon Sports 736",
    "image": "https://picsum.photos/seed/325/800/800",
    "images": [
      "https://picsum.photos/seed/325/800/800",
      "https://picsum.photos/seed/326/800/800",
      "https://picsum.photos/seed/327/800/800",
      "https://picsum.photos/seed/328/800/800",
      "https://picsum.photos/seed/329/800/800"
    ],
    "description": "High-quality sports from Decathlon. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Decathlon",
    "category": "Sports",
    "price": 38061,
    "countInStock": 24,
    "isFeatured": false,
    "rating": 3.4,
    "numReviews": 800
  },
  {
    "name": "Oxford Books 520",
    "image": "https://picsum.photos/seed/330/800/800",
    "images": [
      "https://picsum.photos/seed/330/800/800",
      "https://picsum.photos/seed/331/800/800",
      "https://picsum.photos/seed/332/800/800",
      "https://picsum.photos/seed/333/800/800",
      "https://picsum.photos/seed/334/800/800"
    ],
    "description": "High-quality books from Oxford. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Oxford",
    "category": "Books",
    "price": 1126,
    "countInStock": 97,
    "isFeatured": false,
    "rating": 3.2,
    "numReviews": 519
  },
  {
    "name": "OnePlus Mobiles 201",
    "image": "https://picsum.photos/seed/335/800/800",
    "images": [
      "https://picsum.photos/seed/335/800/800",
      "https://picsum.photos/seed/336/800/800",
      "https://picsum.photos/seed/337/800/800",
      "https://picsum.photos/seed/338/800/800",
      "https://picsum.photos/seed/339/800/800"
    ],
    "description": "High-quality mobiles from OnePlus. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "OnePlus",
    "category": "Mobiles",
    "price": 39902,
    "countInStock": 72,
    "isFeatured": true,
    "rating": 5,
    "numReviews": 350
  },
  {
    "name": "Sony Electronics 47",
    "image": "https://picsum.photos/seed/340/800/800",
    "images": [
      "https://picsum.photos/seed/340/800/800",
      "https://picsum.photos/seed/341/800/800",
      "https://picsum.photos/seed/342/800/800",
      "https://picsum.photos/seed/343/800/800",
      "https://picsum.photos/seed/344/800/800"
    ],
    "description": "High-quality electronics from Sony. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Sony",
    "category": "Electronics",
    "price": 46834,
    "countInStock": 22,
    "isFeatured": false,
    "rating": 3.2,
    "numReviews": 564
  },
  {
    "name": "Allen Solly Fashion 365",
    "image": "https://picsum.photos/seed/345/800/800",
    "images": [
      "https://picsum.photos/seed/345/800/800",
      "https://picsum.photos/seed/346/800/800",
      "https://picsum.photos/seed/347/800/800",
      "https://picsum.photos/seed/348/800/800",
      "https://picsum.photos/seed/349/800/800"
    ],
    "description": "High-quality fashion from Allen Solly. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Allen Solly",
    "category": "Fashion",
    "price": 507,
    "countInStock": 68,
    "isFeatured": false,
    "rating": 4.9,
    "numReviews": 120
  },
  {
    "name": "Sleepwell Home & Furniture 639",
    "image": "https://picsum.photos/seed/350/800/800",
    "images": [
      "https://picsum.photos/seed/350/800/800",
      "https://picsum.photos/seed/351/800/800",
      "https://picsum.photos/seed/352/800/800",
      "https://picsum.photos/seed/353/800/800",
      "https://picsum.photos/seed/354/800/800"
    ],
    "description": "High-quality home & furniture from Sleepwell. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Sleepwell",
    "category": "Home & Furniture",
    "price": 20900,
    "countInStock": 98,
    "isFeatured": false,
    "rating": 3,
    "numReviews": 14
  },
  {
    "name": "Prestige Appliances 314",
    "image": "https://picsum.photos/seed/355/800/800",
    "images": [
      "https://picsum.photos/seed/355/800/800",
      "https://picsum.photos/seed/356/800/800",
      "https://picsum.photos/seed/357/800/800",
      "https://picsum.photos/seed/358/800/800",
      "https://picsum.photos/seed/359/800/800"
    ],
    "description": "High-quality appliances from Prestige. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Prestige",
    "category": "Appliances",
    "price": 40829,
    "countInStock": 23,
    "isFeatured": false,
    "rating": 5,
    "numReviews": 386
  },
  {
    "name": "Nestle Grocery 366",
    "image": "https://picsum.photos/seed/360/800/800",
    "images": [
      "https://picsum.photos/seed/360/800/800",
      "https://picsum.photos/seed/361/800/800",
      "https://picsum.photos/seed/362/800/800",
      "https://picsum.photos/seed/363/800/800",
      "https://picsum.photos/seed/364/800/800"
    ],
    "description": "High-quality grocery from Nestle. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Nestle",
    "category": "Grocery",
    "price": 492,
    "countInStock": 21,
    "isFeatured": false,
    "rating": 4,
    "numReviews": 407
  },
  {
    "name": "Neutrogena Beauty 427",
    "image": "https://picsum.photos/seed/365/800/800",
    "images": [
      "https://picsum.photos/seed/365/800/800",
      "https://picsum.photos/seed/366/800/800",
      "https://picsum.photos/seed/367/800/800",
      "https://picsum.photos/seed/368/800/800",
      "https://picsum.photos/seed/369/800/800"
    ],
    "description": "High-quality beauty from Neutrogena. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Neutrogena",
    "category": "Beauty",
    "price": 4029,
    "countInStock": 22,
    "isFeatured": false,
    "rating": 4.2,
    "numReviews": 873
  },
  {
    "name": "Fossil Wearables 316",
    "image": "https://picsum.photos/seed/370/800/800",
    "images": [
      "https://picsum.photos/seed/370/800/800",
      "https://picsum.photos/seed/371/800/800",
      "https://picsum.photos/seed/372/800/800",
      "https://picsum.photos/seed/373/800/800",
      "https://picsum.photos/seed/374/800/800"
    ],
    "description": "High-quality wearables from Fossil. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Fossil",
    "category": "Wearables",
    "price": 22576,
    "countInStock": 53,
    "isFeatured": false,
    "rating": 4.5,
    "numReviews": 509
  },
  {
    "name": "Safari Travel 142",
    "image": "https://picsum.photos/seed/375/800/800",
    "images": [
      "https://picsum.photos/seed/375/800/800",
      "https://picsum.photos/seed/376/800/800",
      "https://picsum.photos/seed/377/800/800",
      "https://picsum.photos/seed/378/800/800",
      "https://picsum.photos/seed/379/800/800"
    ],
    "description": "High-quality travel from Safari. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Safari",
    "category": "Travel",
    "price": 11340,
    "countInStock": 25,
    "isFeatured": false,
    "rating": 4.3,
    "numReviews": 224
  },
  {
    "name": "Cosco Sports 438",
    "image": "https://picsum.photos/seed/380/800/800",
    "images": [
      "https://picsum.photos/seed/380/800/800",
      "https://picsum.photos/seed/381/800/800",
      "https://picsum.photos/seed/382/800/800",
      "https://picsum.photos/seed/383/800/800",
      "https://picsum.photos/seed/384/800/800"
    ],
    "description": "High-quality sports from Cosco. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Cosco",
    "category": "Sports",
    "price": 18218,
    "countInStock": 41,
    "isFeatured": false,
    "rating": 4.9,
    "numReviews": 752
  },
  {
    "name": "Penguin Books 845",
    "image": "https://picsum.photos/seed/385/800/800",
    "images": [
      "https://picsum.photos/seed/385/800/800",
      "https://picsum.photos/seed/386/800/800",
      "https://picsum.photos/seed/387/800/800",
      "https://picsum.photos/seed/388/800/800",
      "https://picsum.photos/seed/389/800/800"
    ],
    "description": "High-quality books from Penguin. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Penguin",
    "category": "Books",
    "price": 1054,
    "countInStock": 41,
    "isFeatured": true,
    "rating": 3.7,
    "numReviews": 559
  },
  {
    "name": "Nothing Mobiles 225",
    "image": "https://picsum.photos/seed/390/800/800",
    "images": [
      "https://picsum.photos/seed/390/800/800",
      "https://picsum.photos/seed/391/800/800",
      "https://picsum.photos/seed/392/800/800",
      "https://picsum.photos/seed/393/800/800",
      "https://picsum.photos/seed/394/800/800"
    ],
    "description": "High-quality mobiles from Nothing. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Nothing",
    "category": "Mobiles",
    "price": 84402,
    "countInStock": 64,
    "isFeatured": false,
    "rating": 3.4,
    "numReviews": 779
  },
  {
    "name": "Acer Electronics 547",
    "image": "https://picsum.photos/seed/395/800/800",
    "images": [
      "https://picsum.photos/seed/395/800/800",
      "https://picsum.photos/seed/396/800/800",
      "https://picsum.photos/seed/397/800/800",
      "https://picsum.photos/seed/398/800/800",
      "https://picsum.photos/seed/399/800/800"
    ],
    "description": "High-quality electronics from Acer. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Acer",
    "category": "Electronics",
    "price": 62260,
    "countInStock": 1,
    "isFeatured": false,
    "rating": 4.5,
    "numReviews": 917
  },
  {
    "name": "Biba Fashion 800",
    "image": "https://picsum.photos/seed/400/800/800",
    "images": [
      "https://picsum.photos/seed/400/800/800",
      "https://picsum.photos/seed/401/800/800",
      "https://picsum.photos/seed/402/800/800",
      "https://picsum.photos/seed/403/800/800",
      "https://picsum.photos/seed/404/800/800"
    ],
    "description": "High-quality fashion from Biba. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Biba",
    "category": "Fashion",
    "price": 10260,
    "countInStock": 65,
    "isFeatured": false,
    "rating": 3.9,
    "numReviews": 163
  },
  {
    "name": "Home Centre Home & Furniture 775",
    "image": "https://picsum.photos/seed/405/800/800",
    "images": [
      "https://picsum.photos/seed/405/800/800",
      "https://picsum.photos/seed/406/800/800",
      "https://picsum.photos/seed/407/800/800",
      "https://picsum.photos/seed/408/800/800",
      "https://picsum.photos/seed/409/800/800"
    ],
    "description": "High-quality home & furniture from Home Centre. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Home Centre",
    "category": "Home & Furniture",
    "price": 17500,
    "countInStock": 91,
    "isFeatured": false,
    "rating": 3.5,
    "numReviews": 735
  },
  {
    "name": "Philips Appliances 306",
    "image": "https://picsum.photos/seed/410/800/800",
    "images": [
      "https://picsum.photos/seed/410/800/800",
      "https://picsum.photos/seed/411/800/800",
      "https://picsum.photos/seed/412/800/800",
      "https://picsum.photos/seed/413/800/800",
      "https://picsum.photos/seed/414/800/800"
    ],
    "description": "High-quality appliances from Philips. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Philips",
    "category": "Appliances",
    "price": 3787,
    "countInStock": 83,
    "isFeatured": false,
    "rating": 3.5,
    "numReviews": 492
  },
  {
    "name": "Hindustan Unilever Grocery 771",
    "image": "https://picsum.photos/seed/415/800/800",
    "images": [
      "https://picsum.photos/seed/415/800/800",
      "https://picsum.photos/seed/416/800/800",
      "https://picsum.photos/seed/417/800/800",
      "https://picsum.photos/seed/418/800/800",
      "https://picsum.photos/seed/419/800/800"
    ],
    "description": "High-quality grocery from Hindustan Unilever. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Hindustan Unilever",
    "category": "Grocery",
    "price": 2669,
    "countInStock": 60,
    "isFeatured": false,
    "rating": 4.2,
    "numReviews": 640
  },
  {
    "name": "The Body Shop Beauty 739",
    "image": "https://picsum.photos/seed/420/800/800",
    "images": [
      "https://picsum.photos/seed/420/800/800",
      "https://picsum.photos/seed/421/800/800",
      "https://picsum.photos/seed/422/800/800",
      "https://picsum.photos/seed/423/800/800",
      "https://picsum.photos/seed/424/800/800"
    ],
    "description": "High-quality beauty from The Body Shop. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "The Body Shop",
    "category": "Beauty",
    "price": 4390,
    "countInStock": 61,
    "isFeatured": false,
    "rating": 3.6,
    "numReviews": 145
  },
  {
    "name": "Apple Wearables 975",
    "image": "https://picsum.photos/seed/425/800/800",
    "images": [
      "https://picsum.photos/seed/425/800/800",
      "https://picsum.photos/seed/426/800/800",
      "https://picsum.photos/seed/427/800/800",
      "https://picsum.photos/seed/428/800/800",
      "https://picsum.photos/seed/429/800/800"
    ],
    "description": "High-quality wearables from Apple. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Apple",
    "category": "Wearables",
    "price": 41118,
    "countInStock": 42,
    "isFeatured": false,
    "rating": 3.9,
    "numReviews": 498
  },
  {
    "name": "Safari Travel 158",
    "image": "https://picsum.photos/seed/430/800/800",
    "images": [
      "https://picsum.photos/seed/430/800/800",
      "https://picsum.photos/seed/431/800/800",
      "https://picsum.photos/seed/432/800/800",
      "https://picsum.photos/seed/433/800/800",
      "https://picsum.photos/seed/434/800/800"
    ],
    "description": "High-quality travel from Safari. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Safari",
    "category": "Travel",
    "price": 8700,
    "countInStock": 92,
    "isFeatured": false,
    "rating": 3.5,
    "numReviews": 665
  },
  {
    "name": "Decathlon Sports 824",
    "image": "https://picsum.photos/seed/435/800/800",
    "images": [
      "https://picsum.photos/seed/435/800/800",
      "https://picsum.photos/seed/436/800/800",
      "https://picsum.photos/seed/437/800/800",
      "https://picsum.photos/seed/438/800/800",
      "https://picsum.photos/seed/439/800/800"
    ],
    "description": "High-quality sports from Decathlon. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Decathlon",
    "category": "Sports",
    "price": 12864,
    "countInStock": 85,
    "isFeatured": false,
    "rating": 5,
    "numReviews": 998
  },
  {
    "name": "Pearson Books 386",
    "image": "https://picsum.photos/seed/440/800/800",
    "images": [
      "https://picsum.photos/seed/440/800/800",
      "https://picsum.photos/seed/441/800/800",
      "https://picsum.photos/seed/442/800/800",
      "https://picsum.photos/seed/443/800/800",
      "https://picsum.photos/seed/444/800/800"
    ],
    "description": "High-quality books from Pearson. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Pearson",
    "category": "Books",
    "price": 996,
    "countInStock": 34,
    "isFeatured": false,
    "rating": 4.2,
    "numReviews": 211
  },
  {
    "name": "Xiaomi Mobiles 980",
    "image": "https://picsum.photos/seed/445/800/800",
    "images": [
      "https://picsum.photos/seed/445/800/800",
      "https://picsum.photos/seed/446/800/800",
      "https://picsum.photos/seed/447/800/800",
      "https://picsum.photos/seed/448/800/800",
      "https://picsum.photos/seed/449/800/800"
    ],
    "description": "High-quality mobiles from Xiaomi. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Xiaomi",
    "category": "Mobiles",
    "price": 97622,
    "countInStock": 61,
    "isFeatured": false,
    "rating": 4.2,
    "numReviews": 989
  },
  {
    "name": "Microsoft Electronics 142",
    "image": "https://picsum.photos/seed/450/800/800",
    "images": [
      "https://picsum.photos/seed/450/800/800",
      "https://picsum.photos/seed/451/800/800",
      "https://picsum.photos/seed/452/800/800",
      "https://picsum.photos/seed/453/800/800",
      "https://picsum.photos/seed/454/800/800"
    ],
    "description": "High-quality electronics from Microsoft. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Microsoft",
    "category": "Electronics",
    "price": 55165,
    "countInStock": 20,
    "isFeatured": false,
    "rating": 5,
    "numReviews": 6
  },
  {
    "name": "Zara Fashion 987",
    "image": "https://picsum.photos/seed/455/800/800",
    "images": [
      "https://picsum.photos/seed/455/800/800",
      "https://picsum.photos/seed/456/800/800",
      "https://picsum.photos/seed/457/800/800",
      "https://picsum.photos/seed/458/800/800",
      "https://picsum.photos/seed/459/800/800"
    ],
    "description": "High-quality fashion from Zara. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Zara",
    "category": "Fashion",
    "price": 1510,
    "countInStock": 45,
    "isFeatured": false,
    "rating": 3.1,
    "numReviews": 7
  },
  {
    "name": "Godrej Interio Home & Furniture 48",
    "image": "https://picsum.photos/seed/460/800/800",
    "images": [
      "https://picsum.photos/seed/460/800/800",
      "https://picsum.photos/seed/461/800/800",
      "https://picsum.photos/seed/462/800/800",
      "https://picsum.photos/seed/463/800/800",
      "https://picsum.photos/seed/464/800/800"
    ],
    "description": "High-quality home & furniture from Godrej Interio. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Godrej Interio",
    "category": "Home & Furniture",
    "price": 8251,
    "countInStock": 61,
    "isFeatured": false,
    "rating": 3.3,
    "numReviews": 145
  },
  {
    "name": "Whirlpool Appliances 106",
    "image": "https://picsum.photos/seed/465/800/800",
    "images": [
      "https://picsum.photos/seed/465/800/800",
      "https://picsum.photos/seed/466/800/800",
      "https://picsum.photos/seed/467/800/800",
      "https://picsum.photos/seed/468/800/800",
      "https://picsum.photos/seed/469/800/800"
    ],
    "description": "High-quality appliances from Whirlpool. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Whirlpool",
    "category": "Appliances",
    "price": 21965,
    "countInStock": 26,
    "isFeatured": true,
    "rating": 4.6,
    "numReviews": 252
  },
  {
    "name": "Dabur Grocery 427",
    "image": "https://picsum.photos/seed/470/800/800",
    "images": [
      "https://picsum.photos/seed/470/800/800",
      "https://picsum.photos/seed/471/800/800",
      "https://picsum.photos/seed/472/800/800",
      "https://picsum.photos/seed/473/800/800",
      "https://picsum.photos/seed/474/800/800"
    ],
    "description": "High-quality grocery from Dabur. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Dabur",
    "category": "Grocery",
    "price": 3298,
    "countInStock": 66,
    "isFeatured": false,
    "rating": 3,
    "numReviews": 407
  },
  {
    "name": "Mamaearth Beauty 899",
    "image": "https://picsum.photos/seed/475/800/800",
    "images": [
      "https://picsum.photos/seed/475/800/800",
      "https://picsum.photos/seed/476/800/800",
      "https://picsum.photos/seed/477/800/800",
      "https://picsum.photos/seed/478/800/800",
      "https://picsum.photos/seed/479/800/800"
    ],
    "description": "High-quality beauty from Mamaearth. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Mamaearth",
    "category": "Beauty",
    "price": 4911,
    "countInStock": 21,
    "isFeatured": false,
    "rating": 3.7,
    "numReviews": 148
  },
  {
    "name": "Garmin Wearables 722",
    "image": "https://picsum.photos/seed/480/800/800",
    "images": [
      "https://picsum.photos/seed/480/800/800",
      "https://picsum.photos/seed/481/800/800",
      "https://picsum.photos/seed/482/800/800",
      "https://picsum.photos/seed/483/800/800",
      "https://picsum.photos/seed/484/800/800"
    ],
    "description": "High-quality wearables from Garmin. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Garmin",
    "category": "Wearables",
    "price": 20709,
    "countInStock": 76,
    "isFeatured": false,
    "rating": 3.8,
    "numReviews": 650
  },
  {
    "name": "Wildcraft Travel 996",
    "image": "https://picsum.photos/seed/485/800/800",
    "images": [
      "https://picsum.photos/seed/485/800/800",
      "https://picsum.photos/seed/486/800/800",
      "https://picsum.photos/seed/487/800/800",
      "https://picsum.photos/seed/488/800/800",
      "https://picsum.photos/seed/489/800/800"
    ],
    "description": "High-quality travel from Wildcraft. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Wildcraft",
    "category": "Travel",
    "price": 15163,
    "countInStock": 95,
    "isFeatured": false,
    "rating": 4.7,
    "numReviews": 282
  },
  {
    "name": "Spalding Sports 704",
    "image": "https://picsum.photos/seed/490/800/800",
    "images": [
      "https://picsum.photos/seed/490/800/800",
      "https://picsum.photos/seed/491/800/800",
      "https://picsum.photos/seed/492/800/800",
      "https://picsum.photos/seed/493/800/800",
      "https://picsum.photos/seed/494/800/800"
    ],
    "description": "High-quality sports from Spalding. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Spalding",
    "category": "Sports",
    "price": 6414,
    "countInStock": 94,
    "isFeatured": false,
    "rating": 4.3,
    "numReviews": 874
  },
  {
    "name": "Scholastic Books 41",
    "image": "https://picsum.photos/seed/495/800/800",
    "images": [
      "https://picsum.photos/seed/495/800/800",
      "https://picsum.photos/seed/496/800/800",
      "https://picsum.photos/seed/497/800/800",
      "https://picsum.photos/seed/498/800/800",
      "https://picsum.photos/seed/499/800/800"
    ],
    "description": "High-quality books from Scholastic. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Scholastic",
    "category": "Books",
    "price": 1549,
    "countInStock": 28,
    "isFeatured": false,
    "rating": 3.8,
    "numReviews": 356
  },
  {
    "name": "Xiaomi Mobiles 199",
    "image": "https://picsum.photos/seed/500/800/800",
    "images": [
      "https://picsum.photos/seed/500/800/800",
      "https://picsum.photos/seed/501/800/800",
      "https://picsum.photos/seed/502/800/800",
      "https://picsum.photos/seed/503/800/800",
      "https://picsum.photos/seed/504/800/800"
    ],
    "description": "High-quality mobiles from Xiaomi. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Xiaomi",
    "category": "Mobiles",
    "price": 90166,
    "countInStock": 97,
    "isFeatured": false,
    "rating": 4.2,
    "numReviews": 492
  },
  {
    "name": "Asus Electronics 117",
    "image": "https://picsum.photos/seed/505/800/800",
    "images": [
      "https://picsum.photos/seed/505/800/800",
      "https://picsum.photos/seed/506/800/800",
      "https://picsum.photos/seed/507/800/800",
      "https://picsum.photos/seed/508/800/800",
      "https://picsum.photos/seed/509/800/800"
    ],
    "description": "High-quality electronics from Asus. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Asus",
    "category": "Electronics",
    "price": 139989,
    "countInStock": 36,
    "isFeatured": false,
    "rating": 4.1,
    "numReviews": 635
  },
  {
    "name": "Zara Fashion 892",
    "image": "https://picsum.photos/seed/510/800/800",
    "images": [
      "https://picsum.photos/seed/510/800/800",
      "https://picsum.photos/seed/511/800/800",
      "https://picsum.photos/seed/512/800/800",
      "https://picsum.photos/seed/513/800/800",
      "https://picsum.photos/seed/514/800/800"
    ],
    "description": "High-quality fashion from Zara. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Zara",
    "category": "Fashion",
    "price": 4836,
    "countInStock": 23,
    "isFeatured": false,
    "rating": 4.2,
    "numReviews": 748
  },
  {
    "name": "Sleepwell Home & Furniture 380",
    "image": "https://picsum.photos/seed/515/800/800",
    "images": [
      "https://picsum.photos/seed/515/800/800",
      "https://picsum.photos/seed/516/800/800",
      "https://picsum.photos/seed/517/800/800",
      "https://picsum.photos/seed/518/800/800",
      "https://picsum.photos/seed/519/800/800"
    ],
    "description": "High-quality home & furniture from Sleepwell. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Sleepwell",
    "category": "Home & Furniture",
    "price": 30628,
    "countInStock": 95,
    "isFeatured": false,
    "rating": 3.9,
    "numReviews": 862
  },
  {
    "name": "Kent Appliances 58",
    "image": "https://picsum.photos/seed/520/800/800",
    "images": [
      "https://picsum.photos/seed/520/800/800",
      "https://picsum.photos/seed/521/800/800",
      "https://picsum.photos/seed/522/800/800",
      "https://picsum.photos/seed/523/800/800",
      "https://picsum.photos/seed/524/800/800"
    ],
    "description": "High-quality appliances from Kent. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Kent",
    "category": "Appliances",
    "price": 35912,
    "countInStock": 27,
    "isFeatured": false,
    "rating": 3.9,
    "numReviews": 789
  },
  {
    "name": "Tata Grocery 258",
    "image": "https://picsum.photos/seed/525/800/800",
    "images": [
      "https://picsum.photos/seed/525/800/800",
      "https://picsum.photos/seed/526/800/800",
      "https://picsum.photos/seed/527/800/800",
      "https://picsum.photos/seed/528/800/800",
      "https://picsum.photos/seed/529/800/800"
    ],
    "description": "High-quality grocery from Tata. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Tata",
    "category": "Grocery",
    "price": 2468,
    "countInStock": 87,
    "isFeatured": false,
    "rating": 4.9,
    "numReviews": 231
  },
  {
    "name": "The Body Shop Beauty 172",
    "image": "https://picsum.photos/seed/530/800/800",
    "images": [
      "https://picsum.photos/seed/530/800/800",
      "https://picsum.photos/seed/531/800/800",
      "https://picsum.photos/seed/532/800/800",
      "https://picsum.photos/seed/533/800/800",
      "https://picsum.photos/seed/534/800/800"
    ],
    "description": "High-quality beauty from The Body Shop. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "The Body Shop",
    "category": "Beauty",
    "price": 2772,
    "countInStock": 89,
    "isFeatured": false,
    "rating": 3.9,
    "numReviews": 559
  },
  {
    "name": "Fitbit Wearables 702",
    "image": "https://picsum.photos/seed/535/800/800",
    "images": [
      "https://picsum.photos/seed/535/800/800",
      "https://picsum.photos/seed/536/800/800",
      "https://picsum.photos/seed/537/800/800",
      "https://picsum.photos/seed/538/800/800",
      "https://picsum.photos/seed/539/800/800"
    ],
    "description": "High-quality wearables from Fitbit. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Fitbit",
    "category": "Wearables",
    "price": 4150,
    "countInStock": 88,
    "isFeatured": true,
    "rating": 3.9,
    "numReviews": 843
  },
  {
    "name": "Skybags Travel 622",
    "image": "https://picsum.photos/seed/540/800/800",
    "images": [
      "https://picsum.photos/seed/540/800/800",
      "https://picsum.photos/seed/541/800/800",
      "https://picsum.photos/seed/542/800/800",
      "https://picsum.photos/seed/543/800/800",
      "https://picsum.photos/seed/544/800/800"
    ],
    "description": "High-quality travel from Skybags. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Skybags",
    "category": "Travel",
    "price": 11379,
    "countInStock": 53,
    "isFeatured": false,
    "rating": 4.7,
    "numReviews": 322
  },
  {
    "name": "Yonex Sports 541",
    "image": "https://picsum.photos/seed/545/800/800",
    "images": [
      "https://picsum.photos/seed/545/800/800",
      "https://picsum.photos/seed/546/800/800",
      "https://picsum.photos/seed/547/800/800",
      "https://picsum.photos/seed/548/800/800",
      "https://picsum.photos/seed/549/800/800"
    ],
    "description": "High-quality sports from Yonex. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Yonex",
    "category": "Sports",
    "price": 2729,
    "countInStock": 5,
    "isFeatured": false,
    "rating": 4.3,
    "numReviews": 203
  },
  {
    "name": "Scholastic Books 554",
    "image": "https://picsum.photos/seed/550/800/800",
    "images": [
      "https://picsum.photos/seed/550/800/800",
      "https://picsum.photos/seed/551/800/800",
      "https://picsum.photos/seed/552/800/800",
      "https://picsum.photos/seed/553/800/800",
      "https://picsum.photos/seed/554/800/800"
    ],
    "description": "High-quality books from Scholastic. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Scholastic",
    "category": "Books",
    "price": 1883,
    "countInStock": 38,
    "isFeatured": false,
    "rating": 4.8,
    "numReviews": 51
  },
  {
    "name": "Oppo Mobiles 868",
    "image": "https://picsum.photos/seed/555/800/800",
    "images": [
      "https://picsum.photos/seed/555/800/800",
      "https://picsum.photos/seed/556/800/800",
      "https://picsum.photos/seed/557/800/800",
      "https://picsum.photos/seed/558/800/800",
      "https://picsum.photos/seed/559/800/800"
    ],
    "description": "High-quality mobiles from Oppo. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Oppo",
    "category": "Mobiles",
    "price": 47508,
    "countInStock": 49,
    "isFeatured": false,
    "rating": 5,
    "numReviews": 181
  },
  {
    "name": "Asus Electronics 603",
    "image": "https://picsum.photos/seed/560/800/800",
    "images": [
      "https://picsum.photos/seed/560/800/800",
      "https://picsum.photos/seed/561/800/800",
      "https://picsum.photos/seed/562/800/800",
      "https://picsum.photos/seed/563/800/800",
      "https://picsum.photos/seed/564/800/800"
    ],
    "description": "High-quality electronics from Asus. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Asus",
    "category": "Electronics",
    "price": 74757,
    "countInStock": 18,
    "isFeatured": false,
    "rating": 4,
    "numReviews": 466
  },
  {
    "name": "Puma Fashion 659",
    "image": "https://picsum.photos/seed/565/800/800",
    "images": [
      "https://picsum.photos/seed/565/800/800",
      "https://picsum.photos/seed/566/800/800",
      "https://picsum.photos/seed/567/800/800",
      "https://picsum.photos/seed/568/800/800",
      "https://picsum.photos/seed/569/800/800"
    ],
    "description": "High-quality fashion from Puma. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Puma",
    "category": "Fashion",
    "price": 5871,
    "countInStock": 32,
    "isFeatured": false,
    "rating": 3.3,
    "numReviews": 481
  },
  {
    "name": "Pepperfry Home & Furniture 343",
    "image": "https://picsum.photos/seed/570/800/800",
    "images": [
      "https://picsum.photos/seed/570/800/800",
      "https://picsum.photos/seed/571/800/800",
      "https://picsum.photos/seed/572/800/800",
      "https://picsum.photos/seed/573/800/800",
      "https://picsum.photos/seed/574/800/800"
    ],
    "description": "High-quality home & furniture from Pepperfry. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Pepperfry",
    "category": "Home & Furniture",
    "price": 22118,
    "countInStock": 2,
    "isFeatured": false,
    "rating": 4.5,
    "numReviews": 967
  },
  {
    "name": "Haier Appliances 81",
    "image": "https://picsum.photos/seed/575/800/800",
    "images": [
      "https://picsum.photos/seed/575/800/800",
      "https://picsum.photos/seed/576/800/800",
      "https://picsum.photos/seed/577/800/800",
      "https://picsum.photos/seed/578/800/800",
      "https://picsum.photos/seed/579/800/800"
    ],
    "description": "High-quality appliances from Haier. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Haier",
    "category": "Appliances",
    "price": 13209,
    "countInStock": 37,
    "isFeatured": false,
    "rating": 3.5,
    "numReviews": 1
  },
  {
    "name": "Reliance Grocery 949",
    "image": "https://picsum.photos/seed/580/800/800",
    "images": [
      "https://picsum.photos/seed/580/800/800",
      "https://picsum.photos/seed/581/800/800",
      "https://picsum.photos/seed/582/800/800",
      "https://picsum.photos/seed/583/800/800",
      "https://picsum.photos/seed/584/800/800"
    ],
    "description": "High-quality grocery from Reliance. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Reliance",
    "category": "Grocery",
    "price": 847,
    "countInStock": 67,
    "isFeatured": false,
    "rating": 4.9,
    "numReviews": 423
  },
  {
    "name": "Maybelline Beauty 550",
    "image": "https://picsum.photos/seed/585/800/800",
    "images": [
      "https://picsum.photos/seed/585/800/800",
      "https://picsum.photos/seed/586/800/800",
      "https://picsum.photos/seed/587/800/800",
      "https://picsum.photos/seed/588/800/800",
      "https://picsum.photos/seed/589/800/800"
    ],
    "description": "High-quality beauty from Maybelline. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Maybelline",
    "category": "Beauty",
    "price": 525,
    "countInStock": 6,
    "isFeatured": false,
    "rating": 3.9,
    "numReviews": 900
  },
  {
    "name": "Fitbit Wearables 210",
    "image": "https://picsum.photos/seed/590/800/800",
    "images": [
      "https://picsum.photos/seed/590/800/800",
      "https://picsum.photos/seed/591/800/800",
      "https://picsum.photos/seed/592/800/800",
      "https://picsum.photos/seed/593/800/800",
      "https://picsum.photos/seed/594/800/800"
    ],
    "description": "High-quality wearables from Fitbit. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Fitbit",
    "category": "Wearables",
    "price": 8401,
    "countInStock": 97,
    "isFeatured": false,
    "rating": 3.1,
    "numReviews": 314
  },
  {
    "name": "Samsonite Travel 641",
    "image": "https://picsum.photos/seed/595/800/800",
    "images": [
      "https://picsum.photos/seed/595/800/800",
      "https://picsum.photos/seed/596/800/800",
      "https://picsum.photos/seed/597/800/800",
      "https://picsum.photos/seed/598/800/800",
      "https://picsum.photos/seed/599/800/800"
    ],
    "description": "High-quality travel from Samsonite. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Samsonite",
    "category": "Travel",
    "price": 2465,
    "countInStock": 42,
    "isFeatured": false,
    "rating": 4.7,
    "numReviews": 314
  },
  {
    "name": "Decathlon Sports 794",
    "image": "https://picsum.photos/seed/600/800/800",
    "images": [
      "https://picsum.photos/seed/600/800/800",
      "https://picsum.photos/seed/601/800/800",
      "https://picsum.photos/seed/602/800/800",
      "https://picsum.photos/seed/603/800/800",
      "https://picsum.photos/seed/604/800/800"
    ],
    "description": "High-quality sports from Decathlon. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Decathlon",
    "category": "Sports",
    "price": 14807,
    "countInStock": 89,
    "isFeatured": false,
    "rating": 4.5,
    "numReviews": 115
  },
  {
    "name": "Rupa Books 466",
    "image": "https://picsum.photos/seed/605/800/800",
    "images": [
      "https://picsum.photos/seed/605/800/800",
      "https://picsum.photos/seed/606/800/800",
      "https://picsum.photos/seed/607/800/800",
      "https://picsum.photos/seed/608/800/800",
      "https://picsum.photos/seed/609/800/800"
    ],
    "description": "High-quality books from Rupa. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Rupa",
    "category": "Books",
    "price": 1086,
    "countInStock": 60,
    "isFeatured": false,
    "rating": 4.2,
    "numReviews": 918
  },
  {
    "name": "Nothing Mobiles 129",
    "image": "https://picsum.photos/seed/610/800/800",
    "images": [
      "https://picsum.photos/seed/610/800/800",
      "https://picsum.photos/seed/611/800/800",
      "https://picsum.photos/seed/612/800/800",
      "https://picsum.photos/seed/613/800/800",
      "https://picsum.photos/seed/614/800/800"
    ],
    "description": "High-quality mobiles from Nothing. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Nothing",
    "category": "Mobiles",
    "price": 58635,
    "countInStock": 41,
    "isFeatured": false,
    "rating": 4.8,
    "numReviews": 416
  },
  {
    "name": "LG Electronics 481",
    "image": "https://picsum.photos/seed/615/800/800",
    "images": [
      "https://picsum.photos/seed/615/800/800",
      "https://picsum.photos/seed/616/800/800",
      "https://picsum.photos/seed/617/800/800",
      "https://picsum.photos/seed/618/800/800",
      "https://picsum.photos/seed/619/800/800"
    ],
    "description": "High-quality electronics from LG. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "LG",
    "category": "Electronics",
    "price": 99826,
    "countInStock": 19,
    "isFeatured": false,
    "rating": 3.5,
    "numReviews": 55
  },
  {
    "name": "Nike Fashion 961",
    "image": "https://picsum.photos/seed/620/800/800",
    "images": [
      "https://picsum.photos/seed/620/800/800",
      "https://picsum.photos/seed/621/800/800",
      "https://picsum.photos/seed/622/800/800",
      "https://picsum.photos/seed/623/800/800",
      "https://picsum.photos/seed/624/800/800"
    ],
    "description": "High-quality fashion from Nike. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Nike",
    "category": "Fashion",
    "price": 10276,
    "countInStock": 30,
    "isFeatured": true,
    "rating": 3.3,
    "numReviews": 434
  },
  {
    "name": "IKEA Home & Furniture 735",
    "image": "https://picsum.photos/seed/625/800/800",
    "images": [
      "https://picsum.photos/seed/625/800/800",
      "https://picsum.photos/seed/626/800/800",
      "https://picsum.photos/seed/627/800/800",
      "https://picsum.photos/seed/628/800/800",
      "https://picsum.photos/seed/629/800/800"
    ],
    "description": "High-quality home & furniture from IKEA. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "IKEA",
    "category": "Home & Furniture",
    "price": 4892,
    "countInStock": 11,
    "isFeatured": false,
    "rating": 3.8,
    "numReviews": 842
  },
  {
    "name": "LG Appliances 567",
    "image": "https://picsum.photos/seed/630/800/800",
    "images": [
      "https://picsum.photos/seed/630/800/800",
      "https://picsum.photos/seed/631/800/800",
      "https://picsum.photos/seed/632/800/800",
      "https://picsum.photos/seed/633/800/800",
      "https://picsum.photos/seed/634/800/800"
    ],
    "description": "High-quality appliances from LG. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "LG",
    "category": "Appliances",
    "price": 40361,
    "countInStock": 97,
    "isFeatured": true,
    "rating": 4.9,
    "numReviews": 468
  },
  {
    "name": "Nestle Grocery 807",
    "image": "https://picsum.photos/seed/635/800/800",
    "images": [
      "https://picsum.photos/seed/635/800/800",
      "https://picsum.photos/seed/636/800/800",
      "https://picsum.photos/seed/637/800/800",
      "https://picsum.photos/seed/638/800/800",
      "https://picsum.photos/seed/639/800/800"
    ],
    "description": "High-quality grocery from Nestle. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Nestle",
    "category": "Grocery",
    "price": 1499,
    "countInStock": 12,
    "isFeatured": false,
    "rating": 3.7,
    "numReviews": 379
  },
  {
    "name": "Mamaearth Beauty 353",
    "image": "https://picsum.photos/seed/640/800/800",
    "images": [
      "https://picsum.photos/seed/640/800/800",
      "https://picsum.photos/seed/641/800/800",
      "https://picsum.photos/seed/642/800/800",
      "https://picsum.photos/seed/643/800/800",
      "https://picsum.photos/seed/644/800/800"
    ],
    "description": "High-quality beauty from Mamaearth. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Mamaearth",
    "category": "Beauty",
    "price": 4313,
    "countInStock": 89,
    "isFeatured": false,
    "rating": 4.7,
    "numReviews": 113
  },
  {
    "name": "Fossil Wearables 194",
    "image": "https://picsum.photos/seed/645/800/800",
    "images": [
      "https://picsum.photos/seed/645/800/800",
      "https://picsum.photos/seed/646/800/800",
      "https://picsum.photos/seed/647/800/800",
      "https://picsum.photos/seed/648/800/800",
      "https://picsum.photos/seed/649/800/800"
    ],
    "description": "High-quality wearables from Fossil. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Fossil",
    "category": "Wearables",
    "price": 6917,
    "countInStock": 6,
    "isFeatured": false,
    "rating": 3.9,
    "numReviews": 742
  },
  {
    "name": "Skybags Travel 321",
    "image": "https://picsum.photos/seed/650/800/800",
    "images": [
      "https://picsum.photos/seed/650/800/800",
      "https://picsum.photos/seed/651/800/800",
      "https://picsum.photos/seed/652/800/800",
      "https://picsum.photos/seed/653/800/800",
      "https://picsum.photos/seed/654/800/800"
    ],
    "description": "High-quality travel from Skybags. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Skybags",
    "category": "Travel",
    "price": 14016,
    "countInStock": 18,
    "isFeatured": false,
    "rating": 3,
    "numReviews": 630
  },
  {
    "name": "Nivea Sports 466",
    "image": "https://picsum.photos/seed/655/800/800",
    "images": [
      "https://picsum.photos/seed/655/800/800",
      "https://picsum.photos/seed/656/800/800",
      "https://picsum.photos/seed/657/800/800",
      "https://picsum.photos/seed/658/800/800",
      "https://picsum.photos/seed/659/800/800"
    ],
    "description": "High-quality sports from Nivea. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Nivea",
    "category": "Sports",
    "price": 3523,
    "countInStock": 73,
    "isFeatured": false,
    "rating": 3.6,
    "numReviews": 749
  },
  {
    "name": "Scholastic Books 827",
    "image": "https://picsum.photos/seed/660/800/800",
    "images": [
      "https://picsum.photos/seed/660/800/800",
      "https://picsum.photos/seed/661/800/800",
      "https://picsum.photos/seed/662/800/800",
      "https://picsum.photos/seed/663/800/800",
      "https://picsum.photos/seed/664/800/800"
    ],
    "description": "High-quality books from Scholastic. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Scholastic",
    "category": "Books",
    "price": 832,
    "countInStock": 58,
    "isFeatured": false,
    "rating": 3.9,
    "numReviews": 647
  },
  {
    "name": "Motorola Mobiles 197",
    "image": "https://picsum.photos/seed/665/800/800",
    "images": [
      "https://picsum.photos/seed/665/800/800",
      "https://picsum.photos/seed/666/800/800",
      "https://picsum.photos/seed/667/800/800",
      "https://picsum.photos/seed/668/800/800",
      "https://picsum.photos/seed/669/800/800"
    ],
    "description": "High-quality mobiles from Motorola. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Motorola",
    "category": "Mobiles",
    "price": 47805,
    "countInStock": 81,
    "isFeatured": false,
    "rating": 3.9,
    "numReviews": 412
  },
  {
    "name": "Acer Electronics 702",
    "image": "https://picsum.photos/seed/670/800/800",
    "images": [
      "https://picsum.photos/seed/670/800/800",
      "https://picsum.photos/seed/671/800/800",
      "https://picsum.photos/seed/672/800/800",
      "https://picsum.photos/seed/673/800/800",
      "https://picsum.photos/seed/674/800/800"
    ],
    "description": "High-quality electronics from Acer. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Acer",
    "category": "Electronics",
    "price": 94635,
    "countInStock": 80,
    "isFeatured": false,
    "rating": 4.9,
    "numReviews": 66
  },
  {
    "name": "Zara Fashion 558",
    "image": "https://picsum.photos/seed/675/800/800",
    "images": [
      "https://picsum.photos/seed/675/800/800",
      "https://picsum.photos/seed/676/800/800",
      "https://picsum.photos/seed/677/800/800",
      "https://picsum.photos/seed/678/800/800",
      "https://picsum.photos/seed/679/800/800"
    ],
    "description": "High-quality fashion from Zara. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Zara",
    "category": "Fashion",
    "price": 747,
    "countInStock": 98,
    "isFeatured": false,
    "rating": 4.5,
    "numReviews": 294
  },
  {
    "name": "Pepperfry Home & Furniture 729",
    "image": "https://picsum.photos/seed/680/800/800",
    "images": [
      "https://picsum.photos/seed/680/800/800",
      "https://picsum.photos/seed/681/800/800",
      "https://picsum.photos/seed/682/800/800",
      "https://picsum.photos/seed/683/800/800",
      "https://picsum.photos/seed/684/800/800"
    ],
    "description": "High-quality home & furniture from Pepperfry. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Pepperfry",
    "category": "Home & Furniture",
    "price": 41946,
    "countInStock": 22,
    "isFeatured": false,
    "rating": 3.3,
    "numReviews": 392
  },
  {
    "name": "LG Appliances 203",
    "image": "https://picsum.photos/seed/685/800/800",
    "images": [
      "https://picsum.photos/seed/685/800/800",
      "https://picsum.photos/seed/686/800/800",
      "https://picsum.photos/seed/687/800/800",
      "https://picsum.photos/seed/688/800/800",
      "https://picsum.photos/seed/689/800/800"
    ],
    "description": "High-quality appliances from LG. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "LG",
    "category": "Appliances",
    "price": 13242,
    "countInStock": 29,
    "isFeatured": false,
    "rating": 5,
    "numReviews": 693
  },
  {
    "name": "Hindustan Unilever Grocery 602",
    "image": "https://picsum.photos/seed/690/800/800",
    "images": [
      "https://picsum.photos/seed/690/800/800",
      "https://picsum.photos/seed/691/800/800",
      "https://picsum.photos/seed/692/800/800",
      "https://picsum.photos/seed/693/800/800",
      "https://picsum.photos/seed/694/800/800"
    ],
    "description": "High-quality grocery from Hindustan Unilever. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Hindustan Unilever",
    "category": "Grocery",
    "price": 1896,
    "countInStock": 58,
    "isFeatured": false,
    "rating": 3.1,
    "numReviews": 184
  },
  {
    "name": "Clinique Beauty 354",
    "image": "https://picsum.photos/seed/695/800/800",
    "images": [
      "https://picsum.photos/seed/695/800/800",
      "https://picsum.photos/seed/696/800/800",
      "https://picsum.photos/seed/697/800/800",
      "https://picsum.photos/seed/698/800/800",
      "https://picsum.photos/seed/699/800/800"
    ],
    "description": "High-quality beauty from Clinique. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Clinique",
    "category": "Beauty",
    "price": 3113,
    "countInStock": 54,
    "isFeatured": false,
    "rating": 4,
    "numReviews": 478
  },
  {
    "name": "Samsung Wearables 325",
    "image": "https://picsum.photos/seed/700/800/800",
    "images": [
      "https://picsum.photos/seed/700/800/800",
      "https://picsum.photos/seed/701/800/800",
      "https://picsum.photos/seed/702/800/800",
      "https://picsum.photos/seed/703/800/800",
      "https://picsum.photos/seed/704/800/800"
    ],
    "description": "High-quality wearables from Samsung. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Samsung",
    "category": "Wearables",
    "price": 9330,
    "countInStock": 31,
    "isFeatured": false,
    "rating": 3.9,
    "numReviews": 417
  },
  {
    "name": "Mocobara Travel 363",
    "image": "https://picsum.photos/seed/705/800/800",
    "images": [
      "https://picsum.photos/seed/705/800/800",
      "https://picsum.photos/seed/706/800/800",
      "https://picsum.photos/seed/707/800/800",
      "https://picsum.photos/seed/708/800/800",
      "https://picsum.photos/seed/709/800/800"
    ],
    "description": "High-quality travel from Mocobara. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Mocobara",
    "category": "Travel",
    "price": 15257,
    "countInStock": 67,
    "isFeatured": false,
    "rating": 3.4,
    "numReviews": 322
  },
  {
    "name": "Decathlon Sports 181",
    "image": "https://picsum.photos/seed/710/800/800",
    "images": [
      "https://picsum.photos/seed/710/800/800",
      "https://picsum.photos/seed/711/800/800",
      "https://picsum.photos/seed/712/800/800",
      "https://picsum.photos/seed/713/800/800",
      "https://picsum.photos/seed/714/800/800"
    ],
    "description": "High-quality sports from Decathlon. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Decathlon",
    "category": "Sports",
    "price": 28530,
    "countInStock": 91,
    "isFeatured": true,
    "rating": 3.3,
    "numReviews": 379
  },
  {
    "name": "HarperCollins Books 238",
    "image": "https://picsum.photos/seed/715/800/800",
    "images": [
      "https://picsum.photos/seed/715/800/800",
      "https://picsum.photos/seed/716/800/800",
      "https://picsum.photos/seed/717/800/800",
      "https://picsum.photos/seed/718/800/800",
      "https://picsum.photos/seed/719/800/800"
    ],
    "description": "High-quality books from HarperCollins. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "HarperCollins",
    "category": "Books",
    "price": 934,
    "countInStock": 43,
    "isFeatured": false,
    "rating": 4,
    "numReviews": 540
  },
  {
    "name": "Samsung Mobiles 854",
    "image": "https://picsum.photos/seed/720/800/800",
    "images": [
      "https://picsum.photos/seed/720/800/800",
      "https://picsum.photos/seed/721/800/800",
      "https://picsum.photos/seed/722/800/800",
      "https://picsum.photos/seed/723/800/800",
      "https://picsum.photos/seed/724/800/800"
    ],
    "description": "High-quality mobiles from Samsung. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Samsung",
    "category": "Mobiles",
    "price": 65432,
    "countInStock": 24,
    "isFeatured": false,
    "rating": 3.3,
    "numReviews": 642
  },
  {
    "name": "Razer Electronics 486",
    "image": "https://picsum.photos/seed/725/800/800",
    "images": [
      "https://picsum.photos/seed/725/800/800",
      "https://picsum.photos/seed/726/800/800",
      "https://picsum.photos/seed/727/800/800",
      "https://picsum.photos/seed/728/800/800",
      "https://picsum.photos/seed/729/800/800"
    ],
    "description": "High-quality electronics from Razer. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Razer",
    "category": "Electronics",
    "price": 113850,
    "countInStock": 60,
    "isFeatured": false,
    "rating": 4.3,
    "numReviews": 71
  },
  {
    "name": "FabIndia Fashion 374",
    "image": "https://picsum.photos/seed/730/800/800",
    "images": [
      "https://picsum.photos/seed/730/800/800",
      "https://picsum.photos/seed/731/800/800",
      "https://picsum.photos/seed/732/800/800",
      "https://picsum.photos/seed/733/800/800",
      "https://picsum.photos/seed/734/800/800"
    ],
    "description": "High-quality fashion from FabIndia. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "FabIndia",
    "category": "Fashion",
    "price": 5143,
    "countInStock": 84,
    "isFeatured": false,
    "rating": 4.6,
    "numReviews": 740
  },
  {
    "name": "IKEA Home & Furniture 845",
    "image": "https://picsum.photos/seed/735/800/800",
    "images": [
      "https://picsum.photos/seed/735/800/800",
      "https://picsum.photos/seed/736/800/800",
      "https://picsum.photos/seed/737/800/800",
      "https://picsum.photos/seed/738/800/800",
      "https://picsum.photos/seed/739/800/800"
    ],
    "description": "High-quality home & furniture from IKEA. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "IKEA",
    "category": "Home & Furniture",
    "price": 50074,
    "countInStock": 77,
    "isFeatured": false,
    "rating": 3.6,
    "numReviews": 936
  },
  {
    "name": "Bajaj Appliances 830",
    "image": "https://picsum.photos/seed/740/800/800",
    "images": [
      "https://picsum.photos/seed/740/800/800",
      "https://picsum.photos/seed/741/800/800",
      "https://picsum.photos/seed/742/800/800",
      "https://picsum.photos/seed/743/800/800",
      "https://picsum.photos/seed/744/800/800"
    ],
    "description": "High-quality appliances from Bajaj. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Bajaj",
    "category": "Appliances",
    "price": 33140,
    "countInStock": 18,
    "isFeatured": true,
    "rating": 3.4,
    "numReviews": 103
  },
  {
    "name": "Britannia Grocery 970",
    "image": "https://picsum.photos/seed/745/800/800",
    "images": [
      "https://picsum.photos/seed/745/800/800",
      "https://picsum.photos/seed/746/800/800",
      "https://picsum.photos/seed/747/800/800",
      "https://picsum.photos/seed/748/800/800",
      "https://picsum.photos/seed/749/800/800"
    ],
    "description": "High-quality grocery from Britannia. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Britannia",
    "category": "Grocery",
    "price": 3077,
    "countInStock": 83,
    "isFeatured": false,
    "rating": 4.7,
    "numReviews": 381
  },
  {
    "name": "Lakme Beauty 745",
    "image": "https://picsum.photos/seed/750/800/800",
    "images": [
      "https://picsum.photos/seed/750/800/800",
      "https://picsum.photos/seed/751/800/800",
      "https://picsum.photos/seed/752/800/800",
      "https://picsum.photos/seed/753/800/800",
      "https://picsum.photos/seed/754/800/800"
    ],
    "description": "High-quality beauty from Lakme. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Lakme",
    "category": "Beauty",
    "price": 2048,
    "countInStock": 14,
    "isFeatured": false,
    "rating": 3.6,
    "numReviews": 810
  },
  {
    "name": "boAt Wearables 164",
    "image": "https://picsum.photos/seed/755/800/800",
    "images": [
      "https://picsum.photos/seed/755/800/800",
      "https://picsum.photos/seed/756/800/800",
      "https://picsum.photos/seed/757/800/800",
      "https://picsum.photos/seed/758/800/800",
      "https://picsum.photos/seed/759/800/800"
    ],
    "description": "High-quality wearables from boAt. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "boAt",
    "category": "Wearables",
    "price": 3959,
    "countInStock": 78,
    "isFeatured": false,
    "rating": 4.8,
    "numReviews": 283
  },
  {
    "name": "Samsonite Travel 376",
    "image": "https://picsum.photos/seed/760/800/800",
    "images": [
      "https://picsum.photos/seed/760/800/800",
      "https://picsum.photos/seed/761/800/800",
      "https://picsum.photos/seed/762/800/800",
      "https://picsum.photos/seed/763/800/800",
      "https://picsum.photos/seed/764/800/800"
    ],
    "description": "High-quality travel from Samsonite. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Samsonite",
    "category": "Travel",
    "price": 9377,
    "countInStock": 1,
    "isFeatured": false,
    "rating": 4.3,
    "numReviews": 69
  },
  {
    "name": "Yonex Sports 87",
    "image": "https://picsum.photos/seed/765/800/800",
    "images": [
      "https://picsum.photos/seed/765/800/800",
      "https://picsum.photos/seed/766/800/800",
      "https://picsum.photos/seed/767/800/800",
      "https://picsum.photos/seed/768/800/800",
      "https://picsum.photos/seed/769/800/800"
    ],
    "description": "High-quality sports from Yonex. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Yonex",
    "category": "Sports",
    "price": 21753,
    "countInStock": 32,
    "isFeatured": false,
    "rating": 4.4,
    "numReviews": 685
  },
  {
    "name": "HarperCollins Books 901",
    "image": "https://picsum.photos/seed/770/800/800",
    "images": [
      "https://picsum.photos/seed/770/800/800",
      "https://picsum.photos/seed/771/800/800",
      "https://picsum.photos/seed/772/800/800",
      "https://picsum.photos/seed/773/800/800",
      "https://picsum.photos/seed/774/800/800"
    ],
    "description": "High-quality books from HarperCollins. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "HarperCollins",
    "category": "Books",
    "price": 451,
    "countInStock": 34,
    "isFeatured": false,
    "rating": 4.9,
    "numReviews": 406
  },
  {
    "name": "Samsung Mobiles 629",
    "image": "https://picsum.photos/seed/775/800/800",
    "images": [
      "https://picsum.photos/seed/775/800/800",
      "https://picsum.photos/seed/776/800/800",
      "https://picsum.photos/seed/777/800/800",
      "https://picsum.photos/seed/778/800/800",
      "https://picsum.photos/seed/779/800/800"
    ],
    "description": "High-quality mobiles from Samsung. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Samsung",
    "category": "Mobiles",
    "price": 91073,
    "countInStock": 28,
    "isFeatured": false,
    "rating": 4.9,
    "numReviews": 22
  },
  {
    "name": "MSI Electronics 400",
    "image": "https://picsum.photos/seed/780/800/800",
    "images": [
      "https://picsum.photos/seed/780/800/800",
      "https://picsum.photos/seed/781/800/800",
      "https://picsum.photos/seed/782/800/800",
      "https://picsum.photos/seed/783/800/800",
      "https://picsum.photos/seed/784/800/800"
    ],
    "description": "High-quality electronics from MSI. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "MSI",
    "category": "Electronics",
    "price": 120886,
    "countInStock": 79,
    "isFeatured": false,
    "rating": 3.4,
    "numReviews": 562
  },
  {
    "name": "FabIndia Fashion 863",
    "image": "https://picsum.photos/seed/785/800/800",
    "images": [
      "https://picsum.photos/seed/785/800/800",
      "https://picsum.photos/seed/786/800/800",
      "https://picsum.photos/seed/787/800/800",
      "https://picsum.photos/seed/788/800/800",
      "https://picsum.photos/seed/789/800/800"
    ],
    "description": "High-quality fashion from FabIndia. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "FabIndia",
    "category": "Fashion",
    "price": 2439,
    "countInStock": 25,
    "isFeatured": false,
    "rating": 4.2,
    "numReviews": 503
  },
  {
    "name": "Urban Ladder Home & Furniture 145",
    "image": "https://picsum.photos/seed/790/800/800",
    "images": [
      "https://picsum.photos/seed/790/800/800",
      "https://picsum.photos/seed/791/800/800",
      "https://picsum.photos/seed/792/800/800",
      "https://picsum.photos/seed/793/800/800",
      "https://picsum.photos/seed/794/800/800"
    ],
    "description": "High-quality home & furniture from Urban Ladder. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Urban Ladder",
    "category": "Home & Furniture",
    "price": 47967,
    "countInStock": 67,
    "isFeatured": true,
    "rating": 3.5,
    "numReviews": 739
  },
  {
    "name": "LG Appliances 724",
    "image": "https://picsum.photos/seed/795/800/800",
    "images": [
      "https://picsum.photos/seed/795/800/800",
      "https://picsum.photos/seed/796/800/800",
      "https://picsum.photos/seed/797/800/800",
      "https://picsum.photos/seed/798/800/800",
      "https://picsum.photos/seed/799/800/800"
    ],
    "description": "High-quality appliances from LG. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "LG",
    "category": "Appliances",
    "price": 36119,
    "countInStock": 62,
    "isFeatured": false,
    "rating": 4.7,
    "numReviews": 326
  },
  {
    "name": "Dabur Grocery 778",
    "image": "https://picsum.photos/seed/800/800/800",
    "images": [
      "https://picsum.photos/seed/800/800/800",
      "https://picsum.photos/seed/801/800/800",
      "https://picsum.photos/seed/802/800/800",
      "https://picsum.photos/seed/803/800/800",
      "https://picsum.photos/seed/804/800/800"
    ],
    "description": "High-quality grocery from Dabur. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Dabur",
    "category": "Grocery",
    "price": 4447,
    "countInStock": 5,
    "isFeatured": false,
    "rating": 4.4,
    "numReviews": 229
  },
  {
    "name": "Neutrogena Beauty 488",
    "image": "https://picsum.photos/seed/805/800/800",
    "images": [
      "https://picsum.photos/seed/805/800/800",
      "https://picsum.photos/seed/806/800/800",
      "https://picsum.photos/seed/807/800/800",
      "https://picsum.photos/seed/808/800/800",
      "https://picsum.photos/seed/809/800/800"
    ],
    "description": "High-quality beauty from Neutrogena. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Neutrogena",
    "category": "Beauty",
    "price": 1295,
    "countInStock": 45,
    "isFeatured": true,
    "rating": 4.2,
    "numReviews": 383
  },
  {
    "name": "Samsung Wearables 997",
    "image": "https://picsum.photos/seed/810/800/800",
    "images": [
      "https://picsum.photos/seed/810/800/800",
      "https://picsum.photos/seed/811/800/800",
      "https://picsum.photos/seed/812/800/800",
      "https://picsum.photos/seed/813/800/800",
      "https://picsum.photos/seed/814/800/800"
    ],
    "description": "High-quality wearables from Samsung. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Samsung",
    "category": "Wearables",
    "price": 38336,
    "countInStock": 71,
    "isFeatured": false,
    "rating": 3,
    "numReviews": 649
  },
  {
    "name": "Wildcraft Travel 879",
    "image": "https://picsum.photos/seed/815/800/800",
    "images": [
      "https://picsum.photos/seed/815/800/800",
      "https://picsum.photos/seed/816/800/800",
      "https://picsum.photos/seed/817/800/800",
      "https://picsum.photos/seed/818/800/800",
      "https://picsum.photos/seed/819/800/800"
    ],
    "description": "High-quality travel from Wildcraft. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Wildcraft",
    "category": "Travel",
    "price": 16196,
    "countInStock": 0,
    "isFeatured": true,
    "rating": 4.2,
    "numReviews": 118
  },
  {
    "name": "Spalding Sports 800",
    "image": "https://picsum.photos/seed/820/800/800",
    "images": [
      "https://picsum.photos/seed/820/800/800",
      "https://picsum.photos/seed/821/800/800",
      "https://picsum.photos/seed/822/800/800",
      "https://picsum.photos/seed/823/800/800",
      "https://picsum.photos/seed/824/800/800"
    ],
    "description": "High-quality sports from Spalding. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Spalding",
    "category": "Sports",
    "price": 38560,
    "countInStock": 81,
    "isFeatured": false,
    "rating": 3.2,
    "numReviews": 154
  },
  {
    "name": "Pearson Books 974",
    "image": "https://picsum.photos/seed/825/800/800",
    "images": [
      "https://picsum.photos/seed/825/800/800",
      "https://picsum.photos/seed/826/800/800",
      "https://picsum.photos/seed/827/800/800",
      "https://picsum.photos/seed/828/800/800",
      "https://picsum.photos/seed/829/800/800"
    ],
    "description": "High-quality books from Pearson. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Pearson",
    "category": "Books",
    "price": 281,
    "countInStock": 65,
    "isFeatured": false,
    "rating": 3.7,
    "numReviews": 404
  },
  {
    "name": "Samsung Mobiles 262",
    "image": "https://picsum.photos/seed/830/800/800",
    "images": [
      "https://picsum.photos/seed/830/800/800",
      "https://picsum.photos/seed/831/800/800",
      "https://picsum.photos/seed/832/800/800",
      "https://picsum.photos/seed/833/800/800",
      "https://picsum.photos/seed/834/800/800"
    ],
    "description": "High-quality mobiles from Samsung. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Samsung",
    "category": "Mobiles",
    "price": 75056,
    "countInStock": 14,
    "isFeatured": false,
    "rating": 4.2,
    "numReviews": 45
  },
  {
    "name": "Microsoft Electronics 463",
    "image": "https://picsum.photos/seed/835/800/800",
    "images": [
      "https://picsum.photos/seed/835/800/800",
      "https://picsum.photos/seed/836/800/800",
      "https://picsum.photos/seed/837/800/800",
      "https://picsum.photos/seed/838/800/800",
      "https://picsum.photos/seed/839/800/800"
    ],
    "description": "High-quality electronics from Microsoft. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Microsoft",
    "category": "Electronics",
    "price": 149259,
    "countInStock": 18,
    "isFeatured": true,
    "rating": 4.7,
    "numReviews": 42
  },
  {
    "name": "Adidas Fashion 97",
    "image": "https://picsum.photos/seed/840/800/800",
    "images": [
      "https://picsum.photos/seed/840/800/800",
      "https://picsum.photos/seed/841/800/800",
      "https://picsum.photos/seed/842/800/800",
      "https://picsum.photos/seed/843/800/800",
      "https://picsum.photos/seed/844/800/800"
    ],
    "description": "High-quality fashion from Adidas. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Adidas",
    "category": "Fashion",
    "price": 1656,
    "countInStock": 60,
    "isFeatured": false,
    "rating": 4.1,
    "numReviews": 543
  },
  {
    "name": "Duroflex Home & Furniture 67",
    "image": "https://picsum.photos/seed/845/800/800",
    "images": [
      "https://picsum.photos/seed/845/800/800",
      "https://picsum.photos/seed/846/800/800",
      "https://picsum.photos/seed/847/800/800",
      "https://picsum.photos/seed/848/800/800",
      "https://picsum.photos/seed/849/800/800"
    ],
    "description": "High-quality home & furniture from Duroflex. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Duroflex",
    "category": "Home & Furniture",
    "price": 12072,
    "countInStock": 2,
    "isFeatured": false,
    "rating": 3.4,
    "numReviews": 6
  },
  {
    "name": "LG Appliances 912",
    "image": "https://picsum.photos/seed/850/800/800",
    "images": [
      "https://picsum.photos/seed/850/800/800",
      "https://picsum.photos/seed/851/800/800",
      "https://picsum.photos/seed/852/800/800",
      "https://picsum.photos/seed/853/800/800",
      "https://picsum.photos/seed/854/800/800"
    ],
    "description": "High-quality appliances from LG. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "LG",
    "category": "Appliances",
    "price": 40124,
    "countInStock": 79,
    "isFeatured": false,
    "rating": 3.9,
    "numReviews": 345
  },
  {
    "name": "Hindustan Unilever Grocery 714",
    "image": "https://picsum.photos/seed/855/800/800",
    "images": [
      "https://picsum.photos/seed/855/800/800",
      "https://picsum.photos/seed/856/800/800",
      "https://picsum.photos/seed/857/800/800",
      "https://picsum.photos/seed/858/800/800",
      "https://picsum.photos/seed/859/800/800"
    ],
    "description": "High-quality grocery from Hindustan Unilever. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Hindustan Unilever",
    "category": "Grocery",
    "price": 4297,
    "countInStock": 45,
    "isFeatured": true,
    "rating": 4.6,
    "numReviews": 177
  },
  {
    "name": "Neutrogena Beauty 597",
    "image": "https://picsum.photos/seed/860/800/800",
    "images": [
      "https://picsum.photos/seed/860/800/800",
      "https://picsum.photos/seed/861/800/800",
      "https://picsum.photos/seed/862/800/800",
      "https://picsum.photos/seed/863/800/800",
      "https://picsum.photos/seed/864/800/800"
    ],
    "description": "High-quality beauty from Neutrogena. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Neutrogena",
    "category": "Beauty",
    "price": 1910,
    "countInStock": 42,
    "isFeatured": false,
    "rating": 4.6,
    "numReviews": 322
  },
  {
    "name": "Fossil Wearables 5",
    "image": "https://picsum.photos/seed/865/800/800",
    "images": [
      "https://picsum.photos/seed/865/800/800",
      "https://picsum.photos/seed/866/800/800",
      "https://picsum.photos/seed/867/800/800",
      "https://picsum.photos/seed/868/800/800",
      "https://picsum.photos/seed/869/800/800"
    ],
    "description": "High-quality wearables from Fossil. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Fossil",
    "category": "Wearables",
    "price": 11186,
    "countInStock": 18,
    "isFeatured": false,
    "rating": 3.5,
    "numReviews": 613
  },
  {
    "name": "Wildcraft Travel 156",
    "image": "https://picsum.photos/seed/870/800/800",
    "images": [
      "https://picsum.photos/seed/870/800/800",
      "https://picsum.photos/seed/871/800/800",
      "https://picsum.photos/seed/872/800/800",
      "https://picsum.photos/seed/873/800/800",
      "https://picsum.photos/seed/874/800/800"
    ],
    "description": "High-quality travel from Wildcraft. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Wildcraft",
    "category": "Travel",
    "price": 13335,
    "countInStock": 27,
    "isFeatured": false,
    "rating": 5,
    "numReviews": 912
  },
  {
    "name": "Decathlon Sports 573",
    "image": "https://picsum.photos/seed/875/800/800",
    "images": [
      "https://picsum.photos/seed/875/800/800",
      "https://picsum.photos/seed/876/800/800",
      "https://picsum.photos/seed/877/800/800",
      "https://picsum.photos/seed/878/800/800",
      "https://picsum.photos/seed/879/800/800"
    ],
    "description": "High-quality sports from Decathlon. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Decathlon",
    "category": "Sports",
    "price": 646,
    "countInStock": 6,
    "isFeatured": false,
    "rating": 3.9,
    "numReviews": 931
  },
  {
    "name": "Oxford Books 531",
    "image": "https://picsum.photos/seed/880/800/800",
    "images": [
      "https://picsum.photos/seed/880/800/800",
      "https://picsum.photos/seed/881/800/800",
      "https://picsum.photos/seed/882/800/800",
      "https://picsum.photos/seed/883/800/800",
      "https://picsum.photos/seed/884/800/800"
    ],
    "description": "High-quality books from Oxford. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Oxford",
    "category": "Books",
    "price": 973,
    "countInStock": 24,
    "isFeatured": false,
    "rating": 4.4,
    "numReviews": 249
  },
  {
    "name": "Realme Mobiles 685",
    "image": "https://picsum.photos/seed/885/800/800",
    "images": [
      "https://picsum.photos/seed/885/800/800",
      "https://picsum.photos/seed/886/800/800",
      "https://picsum.photos/seed/887/800/800",
      "https://picsum.photos/seed/888/800/800",
      "https://picsum.photos/seed/889/800/800"
    ],
    "description": "High-quality mobiles from Realme. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Realme",
    "category": "Mobiles",
    "price": 43185,
    "countInStock": 43,
    "isFeatured": false,
    "rating": 4.1,
    "numReviews": 516
  },
  {
    "name": "MSI Electronics 716",
    "image": "https://picsum.photos/seed/890/800/800",
    "images": [
      "https://picsum.photos/seed/890/800/800",
      "https://picsum.photos/seed/891/800/800",
      "https://picsum.photos/seed/892/800/800",
      "https://picsum.photos/seed/893/800/800",
      "https://picsum.photos/seed/894/800/800"
    ],
    "description": "High-quality electronics from MSI. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "MSI",
    "category": "Electronics",
    "price": 127957,
    "countInStock": 4,
    "isFeatured": false,
    "rating": 4.9,
    "numReviews": 993
  },
  {
    "name": "Nike Fashion 420",
    "image": "https://picsum.photos/seed/895/800/800",
    "images": [
      "https://picsum.photos/seed/895/800/800",
      "https://picsum.photos/seed/896/800/800",
      "https://picsum.photos/seed/897/800/800",
      "https://picsum.photos/seed/898/800/800",
      "https://picsum.photos/seed/899/800/800"
    ],
    "description": "High-quality fashion from Nike. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Nike",
    "category": "Fashion",
    "price": 2286,
    "countInStock": 74,
    "isFeatured": false,
    "rating": 4.4,
    "numReviews": 502
  },
  {
    "name": "Sleepwell Home & Furniture 533",
    "image": "https://picsum.photos/seed/900/800/800",
    "images": [
      "https://picsum.photos/seed/900/800/800",
      "https://picsum.photos/seed/901/800/800",
      "https://picsum.photos/seed/902/800/800",
      "https://picsum.photos/seed/903/800/800",
      "https://picsum.photos/seed/904/800/800"
    ],
    "description": "High-quality home & furniture from Sleepwell. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Sleepwell",
    "category": "Home & Furniture",
    "price": 50542,
    "countInStock": 32,
    "isFeatured": false,
    "rating": 4.4,
    "numReviews": 139
  },
  {
    "name": "Haier Appliances 52",
    "image": "https://picsum.photos/seed/905/800/800",
    "images": [
      "https://picsum.photos/seed/905/800/800",
      "https://picsum.photos/seed/906/800/800",
      "https://picsum.photos/seed/907/800/800",
      "https://picsum.photos/seed/908/800/800",
      "https://picsum.photos/seed/909/800/800"
    ],
    "description": "High-quality appliances from Haier. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Haier",
    "category": "Appliances",
    "price": 25893,
    "countInStock": 79,
    "isFeatured": false,
    "rating": 3.1,
    "numReviews": 440
  },
  {
    "name": "Happilo Grocery 955",
    "image": "https://picsum.photos/seed/910/800/800",
    "images": [
      "https://picsum.photos/seed/910/800/800",
      "https://picsum.photos/seed/911/800/800",
      "https://picsum.photos/seed/912/800/800",
      "https://picsum.photos/seed/913/800/800",
      "https://picsum.photos/seed/914/800/800"
    ],
    "description": "High-quality grocery from Happilo. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Happilo",
    "category": "Grocery",
    "price": 2918,
    "countInStock": 19,
    "isFeatured": true,
    "rating": 4.6,
    "numReviews": 710
  },
  {
    "name": "MAC Beauty 196",
    "image": "https://picsum.photos/seed/915/800/800",
    "images": [
      "https://picsum.photos/seed/915/800/800",
      "https://picsum.photos/seed/916/800/800",
      "https://picsum.photos/seed/917/800/800",
      "https://picsum.photos/seed/918/800/800",
      "https://picsum.photos/seed/919/800/800"
    ],
    "description": "High-quality beauty from MAC. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "MAC",
    "category": "Beauty",
    "price": 2305,
    "countInStock": 85,
    "isFeatured": false,
    "rating": 4.4,
    "numReviews": 877
  },
  {
    "name": "Noise Wearables 655",
    "image": "https://picsum.photos/seed/920/800/800",
    "images": [
      "https://picsum.photos/seed/920/800/800",
      "https://picsum.photos/seed/921/800/800",
      "https://picsum.photos/seed/922/800/800",
      "https://picsum.photos/seed/923/800/800",
      "https://picsum.photos/seed/924/800/800"
    ],
    "description": "High-quality wearables from Noise. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Noise",
    "category": "Wearables",
    "price": 17495,
    "countInStock": 46,
    "isFeatured": false,
    "rating": 3.8,
    "numReviews": 879
  },
  {
    "name": "Safari Travel 924",
    "image": "https://picsum.photos/seed/925/800/800",
    "images": [
      "https://picsum.photos/seed/925/800/800",
      "https://picsum.photos/seed/926/800/800",
      "https://picsum.photos/seed/927/800/800",
      "https://picsum.photos/seed/928/800/800",
      "https://picsum.photos/seed/929/800/800"
    ],
    "description": "High-quality travel from Safari. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Safari",
    "category": "Travel",
    "price": 20206,
    "countInStock": 27,
    "isFeatured": true,
    "rating": 4.9,
    "numReviews": 379
  },
  {
    "name": "Powermax Sports 302",
    "image": "https://picsum.photos/seed/930/800/800",
    "images": [
      "https://picsum.photos/seed/930/800/800",
      "https://picsum.photos/seed/931/800/800",
      "https://picsum.photos/seed/932/800/800",
      "https://picsum.photos/seed/933/800/800",
      "https://picsum.photos/seed/934/800/800"
    ],
    "description": "High-quality sports from Powermax. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Powermax",
    "category": "Sports",
    "price": 1186,
    "countInStock": 35,
    "isFeatured": false,
    "rating": 4.2,
    "numReviews": 581
  },
  {
    "name": "Scholastic Books 473",
    "image": "https://picsum.photos/seed/935/800/800",
    "images": [
      "https://picsum.photos/seed/935/800/800",
      "https://picsum.photos/seed/936/800/800",
      "https://picsum.photos/seed/937/800/800",
      "https://picsum.photos/seed/938/800/800",
      "https://picsum.photos/seed/939/800/800"
    ],
    "description": "High-quality books from Scholastic. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Scholastic",
    "category": "Books",
    "price": 1316,
    "countInStock": 36,
    "isFeatured": false,
    "rating": 4.5,
    "numReviews": 682
  },
  {
    "name": "Motorola Mobiles 423",
    "image": "https://picsum.photos/seed/940/800/800",
    "images": [
      "https://picsum.photos/seed/940/800/800",
      "https://picsum.photos/seed/941/800/800",
      "https://picsum.photos/seed/942/800/800",
      "https://picsum.photos/seed/943/800/800",
      "https://picsum.photos/seed/944/800/800"
    ],
    "description": "High-quality mobiles from Motorola. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Motorola",
    "category": "Mobiles",
    "price": 54098,
    "countInStock": 20,
    "isFeatured": false,
    "rating": 3.6,
    "numReviews": 183
  },
  {
    "name": "Dell Electronics 90",
    "image": "https://picsum.photos/seed/945/800/800",
    "images": [
      "https://picsum.photos/seed/945/800/800",
      "https://picsum.photos/seed/946/800/800",
      "https://picsum.photos/seed/947/800/800",
      "https://picsum.photos/seed/948/800/800",
      "https://picsum.photos/seed/949/800/800"
    ],
    "description": "High-quality electronics from Dell. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Dell",
    "category": "Electronics",
    "price": 48042,
    "countInStock": 92,
    "isFeatured": false,
    "rating": 5,
    "numReviews": 200
  },
  {
    "name": "Allen Solly Fashion 507",
    "image": "https://picsum.photos/seed/950/800/800",
    "images": [
      "https://picsum.photos/seed/950/800/800",
      "https://picsum.photos/seed/951/800/800",
      "https://picsum.photos/seed/952/800/800",
      "https://picsum.photos/seed/953/800/800",
      "https://picsum.photos/seed/954/800/800"
    ],
    "description": "High-quality fashion from Allen Solly. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Allen Solly",
    "category": "Fashion",
    "price": 5920,
    "countInStock": 52,
    "isFeatured": true,
    "rating": 4.5,
    "numReviews": 791
  },
  {
    "name": "Godrej Interio Home & Furniture 141",
    "image": "https://picsum.photos/seed/955/800/800",
    "images": [
      "https://picsum.photos/seed/955/800/800",
      "https://picsum.photos/seed/956/800/800",
      "https://picsum.photos/seed/957/800/800",
      "https://picsum.photos/seed/958/800/800",
      "https://picsum.photos/seed/959/800/800"
    ],
    "description": "High-quality home & furniture from Godrej Interio. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Godrej Interio",
    "category": "Home & Furniture",
    "price": 3690,
    "countInStock": 45,
    "isFeatured": false,
    "rating": 3.1,
    "numReviews": 568
  },
  {
    "name": "Samsung Appliances 572",
    "image": "https://picsum.photos/seed/960/800/800",
    "images": [
      "https://picsum.photos/seed/960/800/800",
      "https://picsum.photos/seed/961/800/800",
      "https://picsum.photos/seed/962/800/800",
      "https://picsum.photos/seed/963/800/800",
      "https://picsum.photos/seed/964/800/800"
    ],
    "description": "High-quality appliances from Samsung. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Samsung",
    "category": "Appliances",
    "price": 54392,
    "countInStock": 79,
    "isFeatured": false,
    "rating": 3.9,
    "numReviews": 768
  },
  {
    "name": "Amul Grocery 248",
    "image": "https://picsum.photos/seed/965/800/800",
    "images": [
      "https://picsum.photos/seed/965/800/800",
      "https://picsum.photos/seed/966/800/800",
      "https://picsum.photos/seed/967/800/800",
      "https://picsum.photos/seed/968/800/800",
      "https://picsum.photos/seed/969/800/800"
    ],
    "description": "High-quality grocery from Amul. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Amul",
    "category": "Grocery",
    "price": 1518,
    "countInStock": 64,
    "isFeatured": true,
    "rating": 4.3,
    "numReviews": 919
  },
  {
    "name": "Mamaearth Beauty 269",
    "image": "https://picsum.photos/seed/970/800/800",
    "images": [
      "https://picsum.photos/seed/970/800/800",
      "https://picsum.photos/seed/971/800/800",
      "https://picsum.photos/seed/972/800/800",
      "https://picsum.photos/seed/973/800/800",
      "https://picsum.photos/seed/974/800/800"
    ],
    "description": "High-quality beauty from Mamaearth. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Mamaearth",
    "category": "Beauty",
    "price": 513,
    "countInStock": 39,
    "isFeatured": false,
    "rating": 4.1,
    "numReviews": 619
  },
  {
    "name": "Samsung Wearables 804",
    "image": "https://picsum.photos/seed/975/800/800",
    "images": [
      "https://picsum.photos/seed/975/800/800",
      "https://picsum.photos/seed/976/800/800",
      "https://picsum.photos/seed/977/800/800",
      "https://picsum.photos/seed/978/800/800",
      "https://picsum.photos/seed/979/800/800"
    ],
    "description": "High-quality wearables from Samsung. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Samsung",
    "category": "Wearables",
    "price": 27355,
    "countInStock": 52,
    "isFeatured": false,
    "rating": 3.3,
    "numReviews": 767
  },
  {
    "name": "Skybags Travel 695",
    "image": "https://picsum.photos/seed/980/800/800",
    "images": [
      "https://picsum.photos/seed/980/800/800",
      "https://picsum.photos/seed/981/800/800",
      "https://picsum.photos/seed/982/800/800",
      "https://picsum.photos/seed/983/800/800",
      "https://picsum.photos/seed/984/800/800"
    ],
    "description": "High-quality travel from Skybags. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Skybags",
    "category": "Travel",
    "price": 12242,
    "countInStock": 25,
    "isFeatured": false,
    "rating": 3.4,
    "numReviews": 160
  },
  {
    "name": "Spalding Sports 809",
    "image": "https://picsum.photos/seed/985/800/800",
    "images": [
      "https://picsum.photos/seed/985/800/800",
      "https://picsum.photos/seed/986/800/800",
      "https://picsum.photos/seed/987/800/800",
      "https://picsum.photos/seed/988/800/800",
      "https://picsum.photos/seed/989/800/800"
    ],
    "description": "High-quality sports from Spalding. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Spalding",
    "category": "Sports",
    "price": 26595,
    "countInStock": 64,
    "isFeatured": false,
    "rating": 3,
    "numReviews": 300
  },
  {
    "name": "HarperCollins Books 425",
    "image": "https://picsum.photos/seed/990/800/800",
    "images": [
      "https://picsum.photos/seed/990/800/800",
      "https://picsum.photos/seed/991/800/800",
      "https://picsum.photos/seed/992/800/800",
      "https://picsum.photos/seed/993/800/800",
      "https://picsum.photos/seed/994/800/800"
    ],
    "description": "High-quality books from HarperCollins. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "HarperCollins",
    "category": "Books",
    "price": 573,
    "countInStock": 77,
    "isFeatured": false,
    "rating": 4.4,
    "numReviews": 893
  },
  {
    "name": "Oppo Mobiles 593",
    "image": "https://picsum.photos/seed/995/800/800",
    "images": [
      "https://picsum.photos/seed/995/800/800",
      "https://picsum.photos/seed/996/800/800",
      "https://picsum.photos/seed/997/800/800",
      "https://picsum.photos/seed/998/800/800",
      "https://picsum.photos/seed/999/800/800"
    ],
    "description": "High-quality mobiles from Oppo. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Oppo",
    "category": "Mobiles",
    "price": 35499,
    "countInStock": 72,
    "isFeatured": false,
    "rating": 4.4,
    "numReviews": 512
  },
  {
    "name": "Lenovo Electronics 792",
    "image": "https://picsum.photos/seed/1000/800/800",
    "images": [
      "https://picsum.photos/seed/1000/800/800",
      "https://picsum.photos/seed/1001/800/800",
      "https://picsum.photos/seed/1002/800/800",
      "https://picsum.photos/seed/1003/800/800",
      "https://picsum.photos/seed/1004/800/800"
    ],
    "description": "High-quality electronics from Lenovo. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Lenovo",
    "category": "Electronics",
    "price": 38400,
    "countInStock": 1,
    "isFeatured": false,
    "rating": 4.8,
    "numReviews": 93
  },
  {
    "name": "Puma Fashion 946",
    "image": "https://picsum.photos/seed/1005/800/800",
    "images": [
      "https://picsum.photos/seed/1005/800/800",
      "https://picsum.photos/seed/1006/800/800",
      "https://picsum.photos/seed/1007/800/800",
      "https://picsum.photos/seed/1008/800/800",
      "https://picsum.photos/seed/1009/800/800"
    ],
    "description": "High-quality fashion from Puma. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Puma",
    "category": "Fashion",
    "price": 6090,
    "countInStock": 18,
    "isFeatured": false,
    "rating": 4.2,
    "numReviews": 510
  },
  {
    "name": "Godrej Interio Home & Furniture 268",
    "image": "https://picsum.photos/seed/1010/800/800",
    "images": [
      "https://picsum.photos/seed/1010/800/800",
      "https://picsum.photos/seed/1011/800/800",
      "https://picsum.photos/seed/1012/800/800",
      "https://picsum.photos/seed/1013/800/800",
      "https://picsum.photos/seed/1014/800/800"
    ],
    "description": "High-quality home & furniture from Godrej Interio. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Godrej Interio",
    "category": "Home & Furniture",
    "price": 37028,
    "countInStock": 36,
    "isFeatured": false,
    "rating": 4.2,
    "numReviews": 1
  },
  {
    "name": "Samsung Appliances 869",
    "image": "https://picsum.photos/seed/1015/800/800",
    "images": [
      "https://picsum.photos/seed/1015/800/800",
      "https://picsum.photos/seed/1016/800/800",
      "https://picsum.photos/seed/1017/800/800",
      "https://picsum.photos/seed/1018/800/800",
      "https://picsum.photos/seed/1019/800/800"
    ],
    "description": "High-quality appliances from Samsung. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Samsung",
    "category": "Appliances",
    "price": 21752,
    "countInStock": 52,
    "isFeatured": false,
    "rating": 4.3,
    "numReviews": 829
  },
  {
    "name": "Nestle Grocery 67",
    "image": "https://picsum.photos/seed/1020/800/800",
    "images": [
      "https://picsum.photos/seed/1020/800/800",
      "https://picsum.photos/seed/1021/800/800",
      "https://picsum.photos/seed/1022/800/800",
      "https://picsum.photos/seed/1023/800/800",
      "https://picsum.photos/seed/1024/800/800"
    ],
    "description": "High-quality grocery from Nestle. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Nestle",
    "category": "Grocery",
    "price": 4460,
    "countInStock": 52,
    "isFeatured": false,
    "rating": 3.7,
    "numReviews": 541
  },
  {
    "name": "L Oreoal Beauty 521",
    "image": "https://picsum.photos/seed/1025/800/800",
    "images": [
      "https://picsum.photos/seed/1025/800/800",
      "https://picsum.photos/seed/1026/800/800",
      "https://picsum.photos/seed/1027/800/800",
      "https://picsum.photos/seed/1028/800/800",
      "https://picsum.photos/seed/1029/800/800"
    ],
    "description": "High-quality beauty from L Oreoal. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "L Oreoal",
    "category": "Beauty",
    "price": 3723,
    "countInStock": 96,
    "isFeatured": false,
    "rating": 3.8,
    "numReviews": 950
  },
  {
    "name": "Noise Wearables 241",
    "image": "https://picsum.photos/seed/1030/800/800",
    "images": [
      "https://picsum.photos/seed/1030/800/800",
      "https://picsum.photos/seed/1031/800/800",
      "https://picsum.photos/seed/1032/800/800",
      "https://picsum.photos/seed/1033/800/800",
      "https://picsum.photos/seed/1034/800/800"
    ],
    "description": "High-quality wearables from Noise. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Noise",
    "category": "Wearables",
    "price": 39389,
    "countInStock": 30,
    "isFeatured": false,
    "rating": 3,
    "numReviews": 672
  },
  {
    "name": "Skybags Travel 367",
    "image": "https://picsum.photos/seed/1035/800/800",
    "images": [
      "https://picsum.photos/seed/1035/800/800",
      "https://picsum.photos/seed/1036/800/800",
      "https://picsum.photos/seed/1037/800/800",
      "https://picsum.photos/seed/1038/800/800",
      "https://picsum.photos/seed/1039/800/800"
    ],
    "description": "High-quality travel from Skybags. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Skybags",
    "category": "Travel",
    "price": 2868,
    "countInStock": 46,
    "isFeatured": false,
    "rating": 3.9,
    "numReviews": 851
  },
  {
    "name": "Yonex Sports 149",
    "image": "https://picsum.photos/seed/1040/800/800",
    "images": [
      "https://picsum.photos/seed/1040/800/800",
      "https://picsum.photos/seed/1041/800/800",
      "https://picsum.photos/seed/1042/800/800",
      "https://picsum.photos/seed/1043/800/800",
      "https://picsum.photos/seed/1044/800/800"
    ],
    "description": "High-quality sports from Yonex. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Yonex",
    "category": "Sports",
    "price": 536,
    "countInStock": 23,
    "isFeatured": false,
    "rating": 4.1,
    "numReviews": 668
  },
  {
    "name": "Penguin Books 287",
    "image": "https://picsum.photos/seed/1045/800/800",
    "images": [
      "https://picsum.photos/seed/1045/800/800",
      "https://picsum.photos/seed/1046/800/800",
      "https://picsum.photos/seed/1047/800/800",
      "https://picsum.photos/seed/1048/800/800",
      "https://picsum.photos/seed/1049/800/800"
    ],
    "description": "High-quality books from Penguin. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Penguin",
    "category": "Books",
    "price": 1996,
    "countInStock": 4,
    "isFeatured": false,
    "rating": 4.3,
    "numReviews": 106
  },
  {
    "name": "Google Mobiles 255",
    "image": "https://picsum.photos/seed/1050/800/800",
    "images": [
      "https://picsum.photos/seed/1050/800/800",
      "https://picsum.photos/seed/1051/800/800",
      "https://picsum.photos/seed/1052/800/800",
      "https://picsum.photos/seed/1053/800/800",
      "https://picsum.photos/seed/1054/800/800"
    ],
    "description": "High-quality mobiles from Google. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Google",
    "category": "Mobiles",
    "price": 55884,
    "countInStock": 37,
    "isFeatured": false,
    "rating": 3.5,
    "numReviews": 17
  },
  {
    "name": "Lenovo Electronics 265",
    "image": "https://picsum.photos/seed/1055/800/800",
    "images": [
      "https://picsum.photos/seed/1055/800/800",
      "https://picsum.photos/seed/1056/800/800",
      "https://picsum.photos/seed/1057/800/800",
      "https://picsum.photos/seed/1058/800/800",
      "https://picsum.photos/seed/1059/800/800"
    ],
    "description": "High-quality electronics from Lenovo. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Lenovo",
    "category": "Electronics",
    "price": 102123,
    "countInStock": 75,
    "isFeatured": true,
    "rating": 4,
    "numReviews": 776
  },
  {
    "name": "H&M Fashion 846",
    "image": "https://picsum.photos/seed/1060/800/800",
    "images": [
      "https://picsum.photos/seed/1060/800/800",
      "https://picsum.photos/seed/1061/800/800",
      "https://picsum.photos/seed/1062/800/800",
      "https://picsum.photos/seed/1063/800/800",
      "https://picsum.photos/seed/1064/800/800"
    ],
    "description": "High-quality fashion from H&M. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "H&M",
    "category": "Fashion",
    "price": 8882,
    "countInStock": 89,
    "isFeatured": true,
    "rating": 4.9,
    "numReviews": 860
  },
  {
    "name": "Home Centre Home & Furniture 553",
    "image": "https://picsum.photos/seed/1065/800/800",
    "images": [
      "https://picsum.photos/seed/1065/800/800",
      "https://picsum.photos/seed/1066/800/800",
      "https://picsum.photos/seed/1067/800/800",
      "https://picsum.photos/seed/1068/800/800",
      "https://picsum.photos/seed/1069/800/800"
    ],
    "description": "High-quality home & furniture from Home Centre. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Home Centre",
    "category": "Home & Furniture",
    "price": 50849,
    "countInStock": 94,
    "isFeatured": false,
    "rating": 4.9,
    "numReviews": 28
  },
  {
    "name": "Prestige Appliances 441",
    "image": "https://picsum.photos/seed/1070/800/800",
    "images": [
      "https://picsum.photos/seed/1070/800/800",
      "https://picsum.photos/seed/1071/800/800",
      "https://picsum.photos/seed/1072/800/800",
      "https://picsum.photos/seed/1073/800/800",
      "https://picsum.photos/seed/1074/800/800"
    ],
    "description": "High-quality appliances from Prestige. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Prestige",
    "category": "Appliances",
    "price": 20754,
    "countInStock": 46,
    "isFeatured": false,
    "rating": 3.7,
    "numReviews": 881
  },
  {
    "name": "Organic India Grocery 636",
    "image": "https://picsum.photos/seed/1075/800/800",
    "images": [
      "https://picsum.photos/seed/1075/800/800",
      "https://picsum.photos/seed/1076/800/800",
      "https://picsum.photos/seed/1077/800/800",
      "https://picsum.photos/seed/1078/800/800",
      "https://picsum.photos/seed/1079/800/800"
    ],
    "description": "High-quality grocery from Organic India. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Organic India",
    "category": "Grocery",
    "price": 132,
    "countInStock": 16,
    "isFeatured": false,
    "rating": 3.2,
    "numReviews": 383
  },
  {
    "name": "The Body Shop Beauty 342",
    "image": "https://picsum.photos/seed/1080/800/800",
    "images": [
      "https://picsum.photos/seed/1080/800/800",
      "https://picsum.photos/seed/1081/800/800",
      "https://picsum.photos/seed/1082/800/800",
      "https://picsum.photos/seed/1083/800/800",
      "https://picsum.photos/seed/1084/800/800"
    ],
    "description": "High-quality beauty from The Body Shop. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "The Body Shop",
    "category": "Beauty",
    "price": 2553,
    "countInStock": 24,
    "isFeatured": false,
    "rating": 3.1,
    "numReviews": 309
  },
  {
    "name": "boAt Wearables 516",
    "image": "https://picsum.photos/seed/1085/800/800",
    "images": [
      "https://picsum.photos/seed/1085/800/800",
      "https://picsum.photos/seed/1086/800/800",
      "https://picsum.photos/seed/1087/800/800",
      "https://picsum.photos/seed/1088/800/800",
      "https://picsum.photos/seed/1089/800/800"
    ],
    "description": "High-quality wearables from boAt. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "boAt",
    "category": "Wearables",
    "price": 7903,
    "countInStock": 62,
    "isFeatured": false,
    "rating": 4.6,
    "numReviews": 172
  },
  {
    "name": "Skybags Travel 522",
    "image": "https://picsum.photos/seed/1090/800/800",
    "images": [
      "https://picsum.photos/seed/1090/800/800",
      "https://picsum.photos/seed/1091/800/800",
      "https://picsum.photos/seed/1092/800/800",
      "https://picsum.photos/seed/1093/800/800",
      "https://picsum.photos/seed/1094/800/800"
    ],
    "description": "High-quality travel from Skybags. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Skybags",
    "category": "Travel",
    "price": 20843,
    "countInStock": 29,
    "isFeatured": false,
    "rating": 4,
    "numReviews": 277
  },
  {
    "name": "Cosco Sports 105",
    "image": "https://picsum.photos/seed/1095/800/800",
    "images": [
      "https://picsum.photos/seed/1095/800/800",
      "https://picsum.photos/seed/1096/800/800",
      "https://picsum.photos/seed/1097/800/800",
      "https://picsum.photos/seed/1098/800/800",
      "https://picsum.photos/seed/1099/800/800"
    ],
    "description": "High-quality sports from Cosco. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Cosco",
    "category": "Sports",
    "price": 16247,
    "countInStock": 69,
    "isFeatured": false,
    "rating": 3.6,
    "numReviews": 412
  },
  {
    "name": "Westland Books 768",
    "image": "https://picsum.photos/seed/1100/800/800",
    "images": [
      "https://picsum.photos/seed/1100/800/800",
      "https://picsum.photos/seed/1101/800/800",
      "https://picsum.photos/seed/1102/800/800",
      "https://picsum.photos/seed/1103/800/800",
      "https://picsum.photos/seed/1104/800/800"
    ],
    "description": "High-quality books from Westland. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Westland",
    "category": "Books",
    "price": 1692,
    "countInStock": 98,
    "isFeatured": false,
    "rating": 4.4,
    "numReviews": 506
  },
  {
    "name": "Xiaomi Mobiles 683",
    "image": "https://picsum.photos/seed/1105/800/800",
    "images": [
      "https://picsum.photos/seed/1105/800/800",
      "https://picsum.photos/seed/1106/800/800",
      "https://picsum.photos/seed/1107/800/800",
      "https://picsum.photos/seed/1108/800/800",
      "https://picsum.photos/seed/1109/800/800"
    ],
    "description": "High-quality mobiles from Xiaomi. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Xiaomi",
    "category": "Mobiles",
    "price": 129873,
    "countInStock": 5,
    "isFeatured": true,
    "rating": 3.5,
    "numReviews": 401
  },
  {
    "name": "HP Electronics 133",
    "image": "https://picsum.photos/seed/1110/800/800",
    "images": [
      "https://picsum.photos/seed/1110/800/800",
      "https://picsum.photos/seed/1111/800/800",
      "https://picsum.photos/seed/1112/800/800",
      "https://picsum.photos/seed/1113/800/800",
      "https://picsum.photos/seed/1114/800/800"
    ],
    "description": "High-quality electronics from HP. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "HP",
    "category": "Electronics",
    "price": 164456,
    "countInStock": 91,
    "isFeatured": true,
    "rating": 3.8,
    "numReviews": 132
  },
  {
    "name": "Puma Fashion 846",
    "image": "https://picsum.photos/seed/1115/800/800",
    "images": [
      "https://picsum.photos/seed/1115/800/800",
      "https://picsum.photos/seed/1116/800/800",
      "https://picsum.photos/seed/1117/800/800",
      "https://picsum.photos/seed/1118/800/800",
      "https://picsum.photos/seed/1119/800/800"
    ],
    "description": "High-quality fashion from Puma. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Puma",
    "category": "Fashion",
    "price": 7721,
    "countInStock": 44,
    "isFeatured": false,
    "rating": 4.2,
    "numReviews": 871
  },
  {
    "name": "IKEA Home & Furniture 619",
    "image": "https://picsum.photos/seed/1120/800/800",
    "images": [
      "https://picsum.photos/seed/1120/800/800",
      "https://picsum.photos/seed/1121/800/800",
      "https://picsum.photos/seed/1122/800/800",
      "https://picsum.photos/seed/1123/800/800",
      "https://picsum.photos/seed/1124/800/800"
    ],
    "description": "High-quality home & furniture from IKEA. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "IKEA",
    "category": "Home & Furniture",
    "price": 29173,
    "countInStock": 35,
    "isFeatured": false,
    "rating": 4.5,
    "numReviews": 222
  },
  {
    "name": "Daikin Appliances 963",
    "image": "https://picsum.photos/seed/1125/800/800",
    "images": [
      "https://picsum.photos/seed/1125/800/800",
      "https://picsum.photos/seed/1126/800/800",
      "https://picsum.photos/seed/1127/800/800",
      "https://picsum.photos/seed/1128/800/800",
      "https://picsum.photos/seed/1129/800/800"
    ],
    "description": "High-quality appliances from Daikin. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Daikin",
    "category": "Appliances",
    "price": 11582,
    "countInStock": 84,
    "isFeatured": false,
    "rating": 3.6,
    "numReviews": 5
  },
  {
    "name": "Organic India Grocery 677",
    "image": "https://picsum.photos/seed/1130/800/800",
    "images": [
      "https://picsum.photos/seed/1130/800/800",
      "https://picsum.photos/seed/1131/800/800",
      "https://picsum.photos/seed/1132/800/800",
      "https://picsum.photos/seed/1133/800/800",
      "https://picsum.photos/seed/1134/800/800"
    ],
    "description": "High-quality grocery from Organic India. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Organic India",
    "category": "Grocery",
    "price": 951,
    "countInStock": 90,
    "isFeatured": false,
    "rating": 4.5,
    "numReviews": 24
  },
  {
    "name": "Clinique Beauty 926",
    "image": "https://picsum.photos/seed/1135/800/800",
    "images": [
      "https://picsum.photos/seed/1135/800/800",
      "https://picsum.photos/seed/1136/800/800",
      "https://picsum.photos/seed/1137/800/800",
      "https://picsum.photos/seed/1138/800/800",
      "https://picsum.photos/seed/1139/800/800"
    ],
    "description": "High-quality beauty from Clinique. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Clinique",
    "category": "Beauty",
    "price": 170,
    "countInStock": 11,
    "isFeatured": false,
    "rating": 4.6,
    "numReviews": 320
  },
  {
    "name": "Fossil Wearables 445",
    "image": "https://picsum.photos/seed/1140/800/800",
    "images": [
      "https://picsum.photos/seed/1140/800/800",
      "https://picsum.photos/seed/1141/800/800",
      "https://picsum.photos/seed/1142/800/800",
      "https://picsum.photos/seed/1143/800/800",
      "https://picsum.photos/seed/1144/800/800"
    ],
    "description": "High-quality wearables from Fossil. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Fossil",
    "category": "Wearables",
    "price": 8710,
    "countInStock": 40,
    "isFeatured": false,
    "rating": 3.7,
    "numReviews": 94
  },
  {
    "name": "Safari Travel 785",
    "image": "https://picsum.photos/seed/1145/800/800",
    "images": [
      "https://picsum.photos/seed/1145/800/800",
      "https://picsum.photos/seed/1146/800/800",
      "https://picsum.photos/seed/1147/800/800",
      "https://picsum.photos/seed/1148/800/800",
      "https://picsum.photos/seed/1149/800/800"
    ],
    "description": "High-quality travel from Safari. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Safari",
    "category": "Travel",
    "price": 9553,
    "countInStock": 70,
    "isFeatured": false,
    "rating": 4.1,
    "numReviews": 122
  },
  {
    "name": "Wilson Sports 698",
    "image": "https://picsum.photos/seed/1150/800/800",
    "images": [
      "https://picsum.photos/seed/1150/800/800",
      "https://picsum.photos/seed/1151/800/800",
      "https://picsum.photos/seed/1152/800/800",
      "https://picsum.photos/seed/1153/800/800",
      "https://picsum.photos/seed/1154/800/800"
    ],
    "description": "High-quality sports from Wilson. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Wilson",
    "category": "Sports",
    "price": 26374,
    "countInStock": 2,
    "isFeatured": false,
    "rating": 4,
    "numReviews": 942
  },
  {
    "name": "Scholastic Books 794",
    "image": "https://picsum.photos/seed/1155/800/800",
    "images": [
      "https://picsum.photos/seed/1155/800/800",
      "https://picsum.photos/seed/1156/800/800",
      "https://picsum.photos/seed/1157/800/800",
      "https://picsum.photos/seed/1158/800/800",
      "https://picsum.photos/seed/1159/800/800"
    ],
    "description": "High-quality books from Scholastic. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Scholastic",
    "category": "Books",
    "price": 1018,
    "countInStock": 10,
    "isFeatured": false,
    "rating": 4.3,
    "numReviews": 652
  },
  {
    "name": "Oppo Mobiles 579",
    "image": "https://picsum.photos/seed/1160/800/800",
    "images": [
      "https://picsum.photos/seed/1160/800/800",
      "https://picsum.photos/seed/1161/800/800",
      "https://picsum.photos/seed/1162/800/800",
      "https://picsum.photos/seed/1163/800/800",
      "https://picsum.photos/seed/1164/800/800"
    ],
    "description": "High-quality mobiles from Oppo. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Oppo",
    "category": "Mobiles",
    "price": 30837,
    "countInStock": 0,
    "isFeatured": false,
    "rating": 4.9,
    "numReviews": 708
  },
  {
    "name": "Sony Electronics 81",
    "image": "https://picsum.photos/seed/1165/800/800",
    "images": [
      "https://picsum.photos/seed/1165/800/800",
      "https://picsum.photos/seed/1166/800/800",
      "https://picsum.photos/seed/1167/800/800",
      "https://picsum.photos/seed/1168/800/800",
      "https://picsum.photos/seed/1169/800/800"
    ],
    "description": "High-quality electronics from Sony. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Sony",
    "category": "Electronics",
    "price": 53999,
    "countInStock": 88,
    "isFeatured": false,
    "rating": 3.5,
    "numReviews": 457
  },
  {
    "name": "Nike Fashion 257",
    "image": "https://picsum.photos/seed/1170/800/800",
    "images": [
      "https://picsum.photos/seed/1170/800/800",
      "https://picsum.photos/seed/1171/800/800",
      "https://picsum.photos/seed/1172/800/800",
      "https://picsum.photos/seed/1173/800/800",
      "https://picsum.photos/seed/1174/800/800"
    ],
    "description": "High-quality fashion from Nike. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Nike",
    "category": "Fashion",
    "price": 2755,
    "countInStock": 11,
    "isFeatured": true,
    "rating": 4.7,
    "numReviews": 14
  },
  {
    "name": "Urban Ladder Home & Furniture 161",
    "image": "https://picsum.photos/seed/1175/800/800",
    "images": [
      "https://picsum.photos/seed/1175/800/800",
      "https://picsum.photos/seed/1176/800/800",
      "https://picsum.photos/seed/1177/800/800",
      "https://picsum.photos/seed/1178/800/800",
      "https://picsum.photos/seed/1179/800/800"
    ],
    "description": "High-quality home & furniture from Urban Ladder. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Urban Ladder",
    "category": "Home & Furniture",
    "price": 16550,
    "countInStock": 99,
    "isFeatured": false,
    "rating": 3.5,
    "numReviews": 689
  },
  {
    "name": "Prestige Appliances 396",
    "image": "https://picsum.photos/seed/1180/800/800",
    "images": [
      "https://picsum.photos/seed/1180/800/800",
      "https://picsum.photos/seed/1181/800/800",
      "https://picsum.photos/seed/1182/800/800",
      "https://picsum.photos/seed/1183/800/800",
      "https://picsum.photos/seed/1184/800/800"
    ],
    "description": "High-quality appliances from Prestige. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Prestige",
    "category": "Appliances",
    "price": 49048,
    "countInStock": 62,
    "isFeatured": false,
    "rating": 3.3,
    "numReviews": 145
  },
  {
    "name": "Organic India Grocery 743",
    "image": "https://picsum.photos/seed/1185/800/800",
    "images": [
      "https://picsum.photos/seed/1185/800/800",
      "https://picsum.photos/seed/1186/800/800",
      "https://picsum.photos/seed/1187/800/800",
      "https://picsum.photos/seed/1188/800/800",
      "https://picsum.photos/seed/1189/800/800"
    ],
    "description": "High-quality grocery from Organic India. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Organic India",
    "category": "Grocery",
    "price": 1585,
    "countInStock": 54,
    "isFeatured": true,
    "rating": 4.9,
    "numReviews": 723
  },
  {
    "name": "Lakme Beauty 370",
    "image": "https://picsum.photos/seed/1190/800/800",
    "images": [
      "https://picsum.photos/seed/1190/800/800",
      "https://picsum.photos/seed/1191/800/800",
      "https://picsum.photos/seed/1192/800/800",
      "https://picsum.photos/seed/1193/800/800",
      "https://picsum.photos/seed/1194/800/800"
    ],
    "description": "High-quality beauty from Lakme. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Lakme",
    "category": "Beauty",
    "price": 2228,
    "countInStock": 70,
    "isFeatured": true,
    "rating": 3,
    "numReviews": 96
  },
  {
    "name": "Apple Wearables 240",
    "image": "https://picsum.photos/seed/1195/800/800",
    "images": [
      "https://picsum.photos/seed/1195/800/800",
      "https://picsum.photos/seed/1196/800/800",
      "https://picsum.photos/seed/1197/800/800",
      "https://picsum.photos/seed/1198/800/800",
      "https://picsum.photos/seed/1199/800/800"
    ],
    "description": "High-quality wearables from Apple. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Apple",
    "category": "Wearables",
    "price": 4840,
    "countInStock": 6,
    "isFeatured": true,
    "rating": 5,
    "numReviews": 538
  },
  {
    "name": "Samsonite Travel 50",
    "image": "https://picsum.photos/seed/1200/800/800",
    "images": [
      "https://picsum.photos/seed/1200/800/800",
      "https://picsum.photos/seed/1201/800/800",
      "https://picsum.photos/seed/1202/800/800",
      "https://picsum.photos/seed/1203/800/800",
      "https://picsum.photos/seed/1204/800/800"
    ],
    "description": "High-quality travel from Samsonite. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Samsonite",
    "category": "Travel",
    "price": 5151,
    "countInStock": 20,
    "isFeatured": false,
    "rating": 4.1,
    "numReviews": 577
  },
  {
    "name": "Cosco Sports 412",
    "image": "https://picsum.photos/seed/1205/800/800",
    "images": [
      "https://picsum.photos/seed/1205/800/800",
      "https://picsum.photos/seed/1206/800/800",
      "https://picsum.photos/seed/1207/800/800",
      "https://picsum.photos/seed/1208/800/800",
      "https://picsum.photos/seed/1209/800/800"
    ],
    "description": "High-quality sports from Cosco. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Cosco",
    "category": "Sports",
    "price": 16724,
    "countInStock": 13,
    "isFeatured": false,
    "rating": 4.8,
    "numReviews": 811
  },
  {
    "name": "Westland Books 158",
    "image": "https://picsum.photos/seed/1210/800/800",
    "images": [
      "https://picsum.photos/seed/1210/800/800",
      "https://picsum.photos/seed/1211/800/800",
      "https://picsum.photos/seed/1212/800/800",
      "https://picsum.photos/seed/1213/800/800",
      "https://picsum.photos/seed/1214/800/800"
    ],
    "description": "High-quality books from Westland. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Westland",
    "category": "Books",
    "price": 182,
    "countInStock": 63,
    "isFeatured": false,
    "rating": 3.5,
    "numReviews": 384
  },
  {
    "name": "Apple Mobiles 609",
    "image": "https://picsum.photos/seed/1215/800/800",
    "images": [
      "https://picsum.photos/seed/1215/800/800",
      "https://picsum.photos/seed/1216/800/800",
      "https://picsum.photos/seed/1217/800/800",
      "https://picsum.photos/seed/1218/800/800",
      "https://picsum.photos/seed/1219/800/800"
    ],
    "description": "High-quality mobiles from Apple. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Apple",
    "category": "Mobiles",
    "price": 112012,
    "countInStock": 88,
    "isFeatured": false,
    "rating": 4.3,
    "numReviews": 617
  },
  {
    "name": "Acer Electronics 595",
    "image": "https://picsum.photos/seed/1220/800/800",
    "images": [
      "https://picsum.photos/seed/1220/800/800",
      "https://picsum.photos/seed/1221/800/800",
      "https://picsum.photos/seed/1222/800/800",
      "https://picsum.photos/seed/1223/800/800",
      "https://picsum.photos/seed/1224/800/800"
    ],
    "description": "High-quality electronics from Acer. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Acer",
    "category": "Electronics",
    "price": 124835,
    "countInStock": 51,
    "isFeatured": false,
    "rating": 4.3,
    "numReviews": 480
  },
  {
    "name": "Levis Fashion 791",
    "image": "https://picsum.photos/seed/1225/800/800",
    "images": [
      "https://picsum.photos/seed/1225/800/800",
      "https://picsum.photos/seed/1226/800/800",
      "https://picsum.photos/seed/1227/800/800",
      "https://picsum.photos/seed/1228/800/800",
      "https://picsum.photos/seed/1229/800/800"
    ],
    "description": "High-quality fashion from Levis. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Levis",
    "category": "Fashion",
    "price": 9771,
    "countInStock": 8,
    "isFeatured": false,
    "rating": 3.7,
    "numReviews": 643
  },
  {
    "name": "Pepperfry Home & Furniture 121",
    "image": "https://picsum.photos/seed/1230/800/800",
    "images": [
      "https://picsum.photos/seed/1230/800/800",
      "https://picsum.photos/seed/1231/800/800",
      "https://picsum.photos/seed/1232/800/800",
      "https://picsum.photos/seed/1233/800/800",
      "https://picsum.photos/seed/1234/800/800"
    ],
    "description": "High-quality home & furniture from Pepperfry. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Pepperfry",
    "category": "Home & Furniture",
    "price": 40354,
    "countInStock": 44,
    "isFeatured": false,
    "rating": 3.2,
    "numReviews": 633
  },
  {
    "name": "Havells Appliances 882",
    "image": "https://picsum.photos/seed/1235/800/800",
    "images": [
      "https://picsum.photos/seed/1235/800/800",
      "https://picsum.photos/seed/1236/800/800",
      "https://picsum.photos/seed/1237/800/800",
      "https://picsum.photos/seed/1238/800/800",
      "https://picsum.photos/seed/1239/800/800"
    ],
    "description": "High-quality appliances from Havells. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Havells",
    "category": "Appliances",
    "price": 43411,
    "countInStock": 81,
    "isFeatured": false,
    "rating": 3.7,
    "numReviews": 893
  },
  {
    "name": "Reliance Grocery 318",
    "image": "https://picsum.photos/seed/1240/800/800",
    "images": [
      "https://picsum.photos/seed/1240/800/800",
      "https://picsum.photos/seed/1241/800/800",
      "https://picsum.photos/seed/1242/800/800",
      "https://picsum.photos/seed/1243/800/800",
      "https://picsum.photos/seed/1244/800/800"
    ],
    "description": "High-quality grocery from Reliance. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Reliance",
    "category": "Grocery",
    "price": 2382,
    "countInStock": 90,
    "isFeatured": true,
    "rating": 3.1,
    "numReviews": 380
  },
  {
    "name": "Neutrogena Beauty 487",
    "image": "https://picsum.photos/seed/1245/800/800",
    "images": [
      "https://picsum.photos/seed/1245/800/800",
      "https://picsum.photos/seed/1246/800/800",
      "https://picsum.photos/seed/1247/800/800",
      "https://picsum.photos/seed/1248/800/800",
      "https://picsum.photos/seed/1249/800/800"
    ],
    "description": "High-quality beauty from Neutrogena. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Neutrogena",
    "category": "Beauty",
    "price": 4026,
    "countInStock": 63,
    "isFeatured": false,
    "rating": 3.8,
    "numReviews": 450
  },
  {
    "name": "Garmin Wearables 381",
    "image": "https://picsum.photos/seed/1250/800/800",
    "images": [
      "https://picsum.photos/seed/1250/800/800",
      "https://picsum.photos/seed/1251/800/800",
      "https://picsum.photos/seed/1252/800/800",
      "https://picsum.photos/seed/1253/800/800",
      "https://picsum.photos/seed/1254/800/800"
    ],
    "description": "High-quality wearables from Garmin. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Garmin",
    "category": "Wearables",
    "price": 17126,
    "countInStock": 85,
    "isFeatured": false,
    "rating": 3.2,
    "numReviews": 28
  },
  {
    "name": "Skybags Travel 723",
    "image": "https://picsum.photos/seed/1255/800/800",
    "images": [
      "https://picsum.photos/seed/1255/800/800",
      "https://picsum.photos/seed/1256/800/800",
      "https://picsum.photos/seed/1257/800/800",
      "https://picsum.photos/seed/1258/800/800",
      "https://picsum.photos/seed/1259/800/800"
    ],
    "description": "High-quality travel from Skybags. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Skybags",
    "category": "Travel",
    "price": 1693,
    "countInStock": 74,
    "isFeatured": true,
    "rating": 3.8,
    "numReviews": 811
  },
  {
    "name": "Nivea Sports 665",
    "image": "https://picsum.photos/seed/1260/800/800",
    "images": [
      "https://picsum.photos/seed/1260/800/800",
      "https://picsum.photos/seed/1261/800/800",
      "https://picsum.photos/seed/1262/800/800",
      "https://picsum.photos/seed/1263/800/800",
      "https://picsum.photos/seed/1264/800/800"
    ],
    "description": "High-quality sports from Nivea. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Nivea",
    "category": "Sports",
    "price": 35733,
    "countInStock": 83,
    "isFeatured": true,
    "rating": 3.6,
    "numReviews": 799
  },
  {
    "name": "Oxford Books 167",
    "image": "https://picsum.photos/seed/1265/800/800",
    "images": [
      "https://picsum.photos/seed/1265/800/800",
      "https://picsum.photos/seed/1266/800/800",
      "https://picsum.photos/seed/1267/800/800",
      "https://picsum.photos/seed/1268/800/800",
      "https://picsum.photos/seed/1269/800/800"
    ],
    "description": "High-quality books from Oxford. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Oxford",
    "category": "Books",
    "price": 1657,
    "countInStock": 22,
    "isFeatured": false,
    "rating": 4.9,
    "numReviews": 841
  },
  {
    "name": "Samsung Mobiles 975",
    "image": "https://picsum.photos/seed/1270/800/800",
    "images": [
      "https://picsum.photos/seed/1270/800/800",
      "https://picsum.photos/seed/1271/800/800",
      "https://picsum.photos/seed/1272/800/800",
      "https://picsum.photos/seed/1273/800/800",
      "https://picsum.photos/seed/1274/800/800"
    ],
    "description": "High-quality mobiles from Samsung. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Samsung",
    "category": "Mobiles",
    "price": 95942,
    "countInStock": 55,
    "isFeatured": false,
    "rating": 4,
    "numReviews": 769
  },
  {
    "name": "Razer Electronics 613",
    "image": "https://picsum.photos/seed/1275/800/800",
    "images": [
      "https://picsum.photos/seed/1275/800/800",
      "https://picsum.photos/seed/1276/800/800",
      "https://picsum.photos/seed/1277/800/800",
      "https://picsum.photos/seed/1278/800/800",
      "https://picsum.photos/seed/1279/800/800"
    ],
    "description": "High-quality electronics from Razer. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Razer",
    "category": "Electronics",
    "price": 100434,
    "countInStock": 98,
    "isFeatured": true,
    "rating": 3,
    "numReviews": 460
  },
  {
    "name": "Raymond Fashion 25",
    "image": "https://picsum.photos/seed/1280/800/800",
    "images": [
      "https://picsum.photos/seed/1280/800/800",
      "https://picsum.photos/seed/1281/800/800",
      "https://picsum.photos/seed/1282/800/800",
      "https://picsum.photos/seed/1283/800/800",
      "https://picsum.photos/seed/1284/800/800"
    ],
    "description": "High-quality fashion from Raymond. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Raymond",
    "category": "Fashion",
    "price": 7469,
    "countInStock": 25,
    "isFeatured": false,
    "rating": 3.7,
    "numReviews": 529
  },
  {
    "name": "Nilkamal Home & Furniture 24",
    "image": "https://picsum.photos/seed/1285/800/800",
    "images": [
      "https://picsum.photos/seed/1285/800/800",
      "https://picsum.photos/seed/1286/800/800",
      "https://picsum.photos/seed/1287/800/800",
      "https://picsum.photos/seed/1288/800/800",
      "https://picsum.photos/seed/1289/800/800"
    ],
    "description": "High-quality home & furniture from Nilkamal. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Nilkamal",
    "category": "Home & Furniture",
    "price": 29118,
    "countInStock": 68,
    "isFeatured": false,
    "rating": 4.7,
    "numReviews": 261
  },
  {
    "name": "Samsung Appliances 515",
    "image": "https://picsum.photos/seed/1290/800/800",
    "images": [
      "https://picsum.photos/seed/1290/800/800",
      "https://picsum.photos/seed/1291/800/800",
      "https://picsum.photos/seed/1292/800/800",
      "https://picsum.photos/seed/1293/800/800",
      "https://picsum.photos/seed/1294/800/800"
    ],
    "description": "High-quality appliances from Samsung. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Samsung",
    "category": "Appliances",
    "price": 48778,
    "countInStock": 50,
    "isFeatured": true,
    "rating": 3.1,
    "numReviews": 433
  },
  {
    "name": "Reliance Grocery 158",
    "image": "https://picsum.photos/seed/1295/800/800",
    "images": [
      "https://picsum.photos/seed/1295/800/800",
      "https://picsum.photos/seed/1296/800/800",
      "https://picsum.photos/seed/1297/800/800",
      "https://picsum.photos/seed/1298/800/800",
      "https://picsum.photos/seed/1299/800/800"
    ],
    "description": "High-quality grocery from Reliance. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Reliance",
    "category": "Grocery",
    "price": 807,
    "countInStock": 23,
    "isFeatured": true,
    "rating": 4,
    "numReviews": 361
  },
  {
    "name": "Neutrogena Beauty 132",
    "image": "https://picsum.photos/seed/1300/800/800",
    "images": [
      "https://picsum.photos/seed/1300/800/800",
      "https://picsum.photos/seed/1301/800/800",
      "https://picsum.photos/seed/1302/800/800",
      "https://picsum.photos/seed/1303/800/800",
      "https://picsum.photos/seed/1304/800/800"
    ],
    "description": "High-quality beauty from Neutrogena. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Neutrogena",
    "category": "Beauty",
    "price": 5065,
    "countInStock": 95,
    "isFeatured": true,
    "rating": 3.7,
    "numReviews": 904
  },
  {
    "name": "Fossil Wearables 772",
    "image": "https://picsum.photos/seed/1305/800/800",
    "images": [
      "https://picsum.photos/seed/1305/800/800",
      "https://picsum.photos/seed/1306/800/800",
      "https://picsum.photos/seed/1307/800/800",
      "https://picsum.photos/seed/1308/800/800",
      "https://picsum.photos/seed/1309/800/800"
    ],
    "description": "High-quality wearables from Fossil. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Fossil",
    "category": "Wearables",
    "price": 11615,
    "countInStock": 41,
    "isFeatured": false,
    "rating": 3.6,
    "numReviews": 427
  },
  {
    "name": "Samsonite Travel 31",
    "image": "https://picsum.photos/seed/1310/800/800",
    "images": [
      "https://picsum.photos/seed/1310/800/800",
      "https://picsum.photos/seed/1311/800/800",
      "https://picsum.photos/seed/1312/800/800",
      "https://picsum.photos/seed/1313/800/800",
      "https://picsum.photos/seed/1314/800/800"
    ],
    "description": "High-quality travel from Samsonite. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Samsonite",
    "category": "Travel",
    "price": 5278,
    "countInStock": 86,
    "isFeatured": true,
    "rating": 3.8,
    "numReviews": 334
  },
  {
    "name": "Speedo Sports 861",
    "image": "https://picsum.photos/seed/1315/800/800",
    "images": [
      "https://picsum.photos/seed/1315/800/800",
      "https://picsum.photos/seed/1316/800/800",
      "https://picsum.photos/seed/1317/800/800",
      "https://picsum.photos/seed/1318/800/800",
      "https://picsum.photos/seed/1319/800/800"
    ],
    "description": "High-quality sports from Speedo. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Speedo",
    "category": "Sports",
    "price": 16538,
    "countInStock": 53,
    "isFeatured": false,
    "rating": 4,
    "numReviews": 148
  },
  {
    "name": "Oxford Books 57",
    "image": "https://picsum.photos/seed/1320/800/800",
    "images": [
      "https://picsum.photos/seed/1320/800/800",
      "https://picsum.photos/seed/1321/800/800",
      "https://picsum.photos/seed/1322/800/800",
      "https://picsum.photos/seed/1323/800/800",
      "https://picsum.photos/seed/1324/800/800"
    ],
    "description": "High-quality books from Oxford. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Oxford",
    "category": "Books",
    "price": 913,
    "countInStock": 54,
    "isFeatured": false,
    "rating": 3.6,
    "numReviews": 296
  },
  {
    "name": "Motorola Mobiles 405",
    "image": "https://picsum.photos/seed/1325/800/800",
    "images": [
      "https://picsum.photos/seed/1325/800/800",
      "https://picsum.photos/seed/1326/800/800",
      "https://picsum.photos/seed/1327/800/800",
      "https://picsum.photos/seed/1328/800/800",
      "https://picsum.photos/seed/1329/800/800"
    ],
    "description": "High-quality mobiles from Motorola. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Motorola",
    "category": "Mobiles",
    "price": 47665,
    "countInStock": 14,
    "isFeatured": false,
    "rating": 3.5,
    "numReviews": 497
  },
  {
    "name": "Microsoft Electronics 410",
    "image": "https://picsum.photos/seed/1330/800/800",
    "images": [
      "https://picsum.photos/seed/1330/800/800",
      "https://picsum.photos/seed/1331/800/800",
      "https://picsum.photos/seed/1332/800/800",
      "https://picsum.photos/seed/1333/800/800",
      "https://picsum.photos/seed/1334/800/800"
    ],
    "description": "High-quality electronics from Microsoft. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Microsoft",
    "category": "Electronics",
    "price": 81820,
    "countInStock": 96,
    "isFeatured": false,
    "rating": 4.7,
    "numReviews": 678
  },
  {
    "name": "Raymond Fashion 829",
    "image": "https://picsum.photos/seed/1335/800/800",
    "images": [
      "https://picsum.photos/seed/1335/800/800",
      "https://picsum.photos/seed/1336/800/800",
      "https://picsum.photos/seed/1337/800/800",
      "https://picsum.photos/seed/1338/800/800",
      "https://picsum.photos/seed/1339/800/800"
    ],
    "description": "High-quality fashion from Raymond. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Raymond",
    "category": "Fashion",
    "price": 4124,
    "countInStock": 48,
    "isFeatured": false,
    "rating": 4.8,
    "numReviews": 905
  },
  {
    "name": "Nilkamal Home & Furniture 999",
    "image": "https://picsum.photos/seed/1340/800/800",
    "images": [
      "https://picsum.photos/seed/1340/800/800",
      "https://picsum.photos/seed/1341/800/800",
      "https://picsum.photos/seed/1342/800/800",
      "https://picsum.photos/seed/1343/800/800",
      "https://picsum.photos/seed/1344/800/800"
    ],
    "description": "High-quality home & furniture from Nilkamal. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Nilkamal",
    "category": "Home & Furniture",
    "price": 27868,
    "countInStock": 7,
    "isFeatured": false,
    "rating": 4.4,
    "numReviews": 83
  },
  {
    "name": "Kent Appliances 470",
    "image": "https://picsum.photos/seed/1345/800/800",
    "images": [
      "https://picsum.photos/seed/1345/800/800",
      "https://picsum.photos/seed/1346/800/800",
      "https://picsum.photos/seed/1347/800/800",
      "https://picsum.photos/seed/1348/800/800",
      "https://picsum.photos/seed/1349/800/800"
    ],
    "description": "High-quality appliances from Kent. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Kent",
    "category": "Appliances",
    "price": 8993,
    "countInStock": 10,
    "isFeatured": false,
    "rating": 4.2,
    "numReviews": 668
  },
  {
    "name": "Organic India Grocery 691",
    "image": "https://picsum.photos/seed/1350/800/800",
    "images": [
      "https://picsum.photos/seed/1350/800/800",
      "https://picsum.photos/seed/1351/800/800",
      "https://picsum.photos/seed/1352/800/800",
      "https://picsum.photos/seed/1353/800/800",
      "https://picsum.photos/seed/1354/800/800"
    ],
    "description": "High-quality grocery from Organic India. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Organic India",
    "category": "Grocery",
    "price": 4473,
    "countInStock": 17,
    "isFeatured": true,
    "rating": 3.4,
    "numReviews": 283
  },
  {
    "name": "Neutrogena Beauty 434",
    "image": "https://picsum.photos/seed/1355/800/800",
    "images": [
      "https://picsum.photos/seed/1355/800/800",
      "https://picsum.photos/seed/1356/800/800",
      "https://picsum.photos/seed/1357/800/800",
      "https://picsum.photos/seed/1358/800/800",
      "https://picsum.photos/seed/1359/800/800"
    ],
    "description": "High-quality beauty from Neutrogena. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Neutrogena",
    "category": "Beauty",
    "price": 3818,
    "countInStock": 99,
    "isFeatured": false,
    "rating": 3.7,
    "numReviews": 925
  },
  {
    "name": "Apple Wearables 382",
    "image": "https://picsum.photos/seed/1360/800/800",
    "images": [
      "https://picsum.photos/seed/1360/800/800",
      "https://picsum.photos/seed/1361/800/800",
      "https://picsum.photos/seed/1362/800/800",
      "https://picsum.photos/seed/1363/800/800",
      "https://picsum.photos/seed/1364/800/800"
    ],
    "description": "High-quality wearables from Apple. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Apple",
    "category": "Wearables",
    "price": 29522,
    "countInStock": 69,
    "isFeatured": false,
    "rating": 4.4,
    "numReviews": 807
  },
  {
    "name": "Skybags Travel 394",
    "image": "https://picsum.photos/seed/1365/800/800",
    "images": [
      "https://picsum.photos/seed/1365/800/800",
      "https://picsum.photos/seed/1366/800/800",
      "https://picsum.photos/seed/1367/800/800",
      "https://picsum.photos/seed/1368/800/800",
      "https://picsum.photos/seed/1369/800/800"
    ],
    "description": "High-quality travel from Skybags. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Skybags",
    "category": "Travel",
    "price": 5620,
    "countInStock": 73,
    "isFeatured": false,
    "rating": 4.2,
    "numReviews": 271
  },
  {
    "name": "Nivea Sports 226",
    "image": "https://picsum.photos/seed/1370/800/800",
    "images": [
      "https://picsum.photos/seed/1370/800/800",
      "https://picsum.photos/seed/1371/800/800",
      "https://picsum.photos/seed/1372/800/800",
      "https://picsum.photos/seed/1373/800/800",
      "https://picsum.photos/seed/1374/800/800"
    ],
    "description": "High-quality sports from Nivea. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Nivea",
    "category": "Sports",
    "price": 25751,
    "countInStock": 62,
    "isFeatured": false,
    "rating": 3.9,
    "numReviews": 68
  },
  {
    "name": "HarperCollins Books 608",
    "image": "https://picsum.photos/seed/1375/800/800",
    "images": [
      "https://picsum.photos/seed/1375/800/800",
      "https://picsum.photos/seed/1376/800/800",
      "https://picsum.photos/seed/1377/800/800",
      "https://picsum.photos/seed/1378/800/800",
      "https://picsum.photos/seed/1379/800/800"
    ],
    "description": "High-quality books from HarperCollins. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "HarperCollins",
    "category": "Books",
    "price": 1619,
    "countInStock": 13,
    "isFeatured": true,
    "rating": 3.8,
    "numReviews": 147
  },
  {
    "name": "Samsung Mobiles 634",
    "image": "https://picsum.photos/seed/1380/800/800",
    "images": [
      "https://picsum.photos/seed/1380/800/800",
      "https://picsum.photos/seed/1381/800/800",
      "https://picsum.photos/seed/1382/800/800",
      "https://picsum.photos/seed/1383/800/800",
      "https://picsum.photos/seed/1384/800/800"
    ],
    "description": "High-quality mobiles from Samsung. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Samsung",
    "category": "Mobiles",
    "price": 56542,
    "countInStock": 69,
    "isFeatured": true,
    "rating": 4.5,
    "numReviews": 494
  },
  {
    "name": "Dell Electronics 92",
    "image": "https://picsum.photos/seed/1385/800/800",
    "images": [
      "https://picsum.photos/seed/1385/800/800",
      "https://picsum.photos/seed/1386/800/800",
      "https://picsum.photos/seed/1387/800/800",
      "https://picsum.photos/seed/1388/800/800",
      "https://picsum.photos/seed/1389/800/800"
    ],
    "description": "High-quality electronics from Dell. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Dell",
    "category": "Electronics",
    "price": 116377,
    "countInStock": 27,
    "isFeatured": false,
    "rating": 4.8,
    "numReviews": 767
  },
  {
    "name": "Nike Fashion 500",
    "image": "https://picsum.photos/seed/1390/800/800",
    "images": [
      "https://picsum.photos/seed/1390/800/800",
      "https://picsum.photos/seed/1391/800/800",
      "https://picsum.photos/seed/1392/800/800",
      "https://picsum.photos/seed/1393/800/800",
      "https://picsum.photos/seed/1394/800/800"
    ],
    "description": "High-quality fashion from Nike. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Nike",
    "category": "Fashion",
    "price": 5880,
    "countInStock": 33,
    "isFeatured": false,
    "rating": 4.5,
    "numReviews": 483
  },
  {
    "name": "Duroflex Home & Furniture 120",
    "image": "https://picsum.photos/seed/1395/800/800",
    "images": [
      "https://picsum.photos/seed/1395/800/800",
      "https://picsum.photos/seed/1396/800/800",
      "https://picsum.photos/seed/1397/800/800",
      "https://picsum.photos/seed/1398/800/800",
      "https://picsum.photos/seed/1399/800/800"
    ],
    "description": "High-quality home & furniture from Duroflex. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Duroflex",
    "category": "Home & Furniture",
    "price": 39570,
    "countInStock": 85,
    "isFeatured": false,
    "rating": 4.1,
    "numReviews": 882
  },
  {
    "name": "Samsung Appliances 97",
    "image": "https://picsum.photos/seed/1400/800/800",
    "images": [
      "https://picsum.photos/seed/1400/800/800",
      "https://picsum.photos/seed/1401/800/800",
      "https://picsum.photos/seed/1402/800/800",
      "https://picsum.photos/seed/1403/800/800",
      "https://picsum.photos/seed/1404/800/800"
    ],
    "description": "High-quality appliances from Samsung. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Samsung",
    "category": "Appliances",
    "price": 60574,
    "countInStock": 92,
    "isFeatured": true,
    "rating": 3.3,
    "numReviews": 995
  },
  {
    "name": "Hindustan Unilever Grocery 19",
    "image": "https://picsum.photos/seed/1405/800/800",
    "images": [
      "https://picsum.photos/seed/1405/800/800",
      "https://picsum.photos/seed/1406/800/800",
      "https://picsum.photos/seed/1407/800/800",
      "https://picsum.photos/seed/1408/800/800",
      "https://picsum.photos/seed/1409/800/800"
    ],
    "description": "High-quality grocery from Hindustan Unilever. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Hindustan Unilever",
    "category": "Grocery",
    "price": 1686,
    "countInStock": 53,
    "isFeatured": false,
    "rating": 4.5,
    "numReviews": 22
  },
  {
    "name": "The Body Shop Beauty 634",
    "image": "https://picsum.photos/seed/1410/800/800",
    "images": [
      "https://picsum.photos/seed/1410/800/800",
      "https://picsum.photos/seed/1411/800/800",
      "https://picsum.photos/seed/1412/800/800",
      "https://picsum.photos/seed/1413/800/800",
      "https://picsum.photos/seed/1414/800/800"
    ],
    "description": "High-quality beauty from The Body Shop. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "The Body Shop",
    "category": "Beauty",
    "price": 2495,
    "countInStock": 88,
    "isFeatured": true,
    "rating": 4.8,
    "numReviews": 532
  },
  {
    "name": "Fossil Wearables 836",
    "image": "https://picsum.photos/seed/1415/800/800",
    "images": [
      "https://picsum.photos/seed/1415/800/800",
      "https://picsum.photos/seed/1416/800/800",
      "https://picsum.photos/seed/1417/800/800",
      "https://picsum.photos/seed/1418/800/800",
      "https://picsum.photos/seed/1419/800/800"
    ],
    "description": "High-quality wearables from Fossil. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Fossil",
    "category": "Wearables",
    "price": 5816,
    "countInStock": 14,
    "isFeatured": true,
    "rating": 3.1,
    "numReviews": 235
  },
  {
    "name": "Wildcraft Travel 907",
    "image": "https://picsum.photos/seed/1420/800/800",
    "images": [
      "https://picsum.photos/seed/1420/800/800",
      "https://picsum.photos/seed/1421/800/800",
      "https://picsum.photos/seed/1422/800/800",
      "https://picsum.photos/seed/1423/800/800",
      "https://picsum.photos/seed/1424/800/800"
    ],
    "description": "High-quality travel from Wildcraft. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Wildcraft",
    "category": "Travel",
    "price": 18212,
    "countInStock": 15,
    "isFeatured": true,
    "rating": 3.4,
    "numReviews": 497
  },
  {
    "name": "Spalding Sports 82",
    "image": "https://picsum.photos/seed/1425/800/800",
    "images": [
      "https://picsum.photos/seed/1425/800/800",
      "https://picsum.photos/seed/1426/800/800",
      "https://picsum.photos/seed/1427/800/800",
      "https://picsum.photos/seed/1428/800/800",
      "https://picsum.photos/seed/1429/800/800"
    ],
    "description": "High-quality sports from Spalding. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Spalding",
    "category": "Sports",
    "price": 535,
    "countInStock": 44,
    "isFeatured": false,
    "rating": 3.2,
    "numReviews": 102
  },
  {
    "name": "Westland Books 13",
    "image": "https://picsum.photos/seed/1430/800/800",
    "images": [
      "https://picsum.photos/seed/1430/800/800",
      "https://picsum.photos/seed/1431/800/800",
      "https://picsum.photos/seed/1432/800/800",
      "https://picsum.photos/seed/1433/800/800",
      "https://picsum.photos/seed/1434/800/800"
    ],
    "description": "High-quality books from Westland. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Westland",
    "category": "Books",
    "price": 1528,
    "countInStock": 34,
    "isFeatured": true,
    "rating": 3.6,
    "numReviews": 901
  },
  {
    "name": "Realme Mobiles 846",
    "image": "https://picsum.photos/seed/1435/800/800",
    "images": [
      "https://picsum.photos/seed/1435/800/800",
      "https://picsum.photos/seed/1436/800/800",
      "https://picsum.photos/seed/1437/800/800",
      "https://picsum.photos/seed/1438/800/800",
      "https://picsum.photos/seed/1439/800/800"
    ],
    "description": "High-quality mobiles from Realme. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Realme",
    "category": "Mobiles",
    "price": 83183,
    "countInStock": 35,
    "isFeatured": false,
    "rating": 3.7,
    "numReviews": 506
  },
  {
    "name": "Microsoft Electronics 364",
    "image": "https://picsum.photos/seed/1440/800/800",
    "images": [
      "https://picsum.photos/seed/1440/800/800",
      "https://picsum.photos/seed/1441/800/800",
      "https://picsum.photos/seed/1442/800/800",
      "https://picsum.photos/seed/1443/800/800",
      "https://picsum.photos/seed/1444/800/800"
    ],
    "description": "High-quality electronics from Microsoft. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Microsoft",
    "category": "Electronics",
    "price": 160958,
    "countInStock": 96,
    "isFeatured": false,
    "rating": 3.3,
    "numReviews": 980
  },
  {
    "name": "Zara Fashion 575",
    "image": "https://picsum.photos/seed/1445/800/800",
    "images": [
      "https://picsum.photos/seed/1445/800/800",
      "https://picsum.photos/seed/1446/800/800",
      "https://picsum.photos/seed/1447/800/800",
      "https://picsum.photos/seed/1448/800/800",
      "https://picsum.photos/seed/1449/800/800"
    ],
    "description": "High-quality fashion from Zara. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Zara",
    "category": "Fashion",
    "price": 6630,
    "countInStock": 74,
    "isFeatured": false,
    "rating": 3.4,
    "numReviews": 369
  },
  {
    "name": "Godrej Interio Home & Furniture 102",
    "image": "https://picsum.photos/seed/1450/800/800",
    "images": [
      "https://picsum.photos/seed/1450/800/800",
      "https://picsum.photos/seed/1451/800/800",
      "https://picsum.photos/seed/1452/800/800",
      "https://picsum.photos/seed/1453/800/800",
      "https://picsum.photos/seed/1454/800/800"
    ],
    "description": "High-quality home & furniture from Godrej Interio. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Godrej Interio",
    "category": "Home & Furniture",
    "price": 7898,
    "countInStock": 77,
    "isFeatured": false,
    "rating": 3.3,
    "numReviews": 243
  },
  {
    "name": "Haier Appliances 453",
    "image": "https://picsum.photos/seed/1455/800/800",
    "images": [
      "https://picsum.photos/seed/1455/800/800",
      "https://picsum.photos/seed/1456/800/800",
      "https://picsum.photos/seed/1457/800/800",
      "https://picsum.photos/seed/1458/800/800",
      "https://picsum.photos/seed/1459/800/800"
    ],
    "description": "High-quality appliances from Haier. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Haier",
    "category": "Appliances",
    "price": 32614,
    "countInStock": 51,
    "isFeatured": false,
    "rating": 3.7,
    "numReviews": 415
  },
  {
    "name": "Dabur Grocery 875",
    "image": "https://picsum.photos/seed/1460/800/800",
    "images": [
      "https://picsum.photos/seed/1460/800/800",
      "https://picsum.photos/seed/1461/800/800",
      "https://picsum.photos/seed/1462/800/800",
      "https://picsum.photos/seed/1463/800/800",
      "https://picsum.photos/seed/1464/800/800"
    ],
    "description": "High-quality grocery from Dabur. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Dabur",
    "category": "Grocery",
    "price": 246,
    "countInStock": 19,
    "isFeatured": false,
    "rating": 4.9,
    "numReviews": 191
  },
  {
    "name": "Estee Lauder Beauty 643",
    "image": "https://picsum.photos/seed/1465/800/800",
    "images": [
      "https://picsum.photos/seed/1465/800/800",
      "https://picsum.photos/seed/1466/800/800",
      "https://picsum.photos/seed/1467/800/800",
      "https://picsum.photos/seed/1468/800/800",
      "https://picsum.photos/seed/1469/800/800"
    ],
    "description": "High-quality beauty from Estee Lauder. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Estee Lauder",
    "category": "Beauty",
    "price": 3164,
    "countInStock": 84,
    "isFeatured": false,
    "rating": 3.4,
    "numReviews": 233
  },
  {
    "name": "Garmin Wearables 616",
    "image": "https://picsum.photos/seed/1470/800/800",
    "images": [
      "https://picsum.photos/seed/1470/800/800",
      "https://picsum.photos/seed/1471/800/800",
      "https://picsum.photos/seed/1472/800/800",
      "https://picsum.photos/seed/1473/800/800",
      "https://picsum.photos/seed/1474/800/800"
    ],
    "description": "High-quality wearables from Garmin. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Garmin",
    "category": "Wearables",
    "price": 40328,
    "countInStock": 27,
    "isFeatured": false,
    "rating": 4.3,
    "numReviews": 758
  },
  {
    "name": "American Tourister Travel 893",
    "image": "https://picsum.photos/seed/1475/800/800",
    "images": [
      "https://picsum.photos/seed/1475/800/800",
      "https://picsum.photos/seed/1476/800/800",
      "https://picsum.photos/seed/1477/800/800",
      "https://picsum.photos/seed/1478/800/800",
      "https://picsum.photos/seed/1479/800/800"
    ],
    "description": "High-quality travel from American Tourister. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "American Tourister",
    "category": "Travel",
    "price": 19945,
    "countInStock": 11,
    "isFeatured": false,
    "rating": 3.1,
    "numReviews": 687
  },
  {
    "name": "Nivea Sports 227",
    "image": "https://picsum.photos/seed/1480/800/800",
    "images": [
      "https://picsum.photos/seed/1480/800/800",
      "https://picsum.photos/seed/1481/800/800",
      "https://picsum.photos/seed/1482/800/800",
      "https://picsum.photos/seed/1483/800/800",
      "https://picsum.photos/seed/1484/800/800"
    ],
    "description": "High-quality sports from Nivea. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Nivea",
    "category": "Sports",
    "price": 33897,
    "countInStock": 56,
    "isFeatured": false,
    "rating": 4.9,
    "numReviews": 951
  },
  {
    "name": "Penguin Books 307",
    "image": "https://picsum.photos/seed/1485/800/800",
    "images": [
      "https://picsum.photos/seed/1485/800/800",
      "https://picsum.photos/seed/1486/800/800",
      "https://picsum.photos/seed/1487/800/800",
      "https://picsum.photos/seed/1488/800/800",
      "https://picsum.photos/seed/1489/800/800"
    ],
    "description": "High-quality books from Penguin. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Penguin",
    "category": "Books",
    "price": 823,
    "countInStock": 24,
    "isFeatured": true,
    "rating": 3.5,
    "numReviews": 603
  },
  {
    "name": "Realme Mobiles 746",
    "image": "https://picsum.photos/seed/1490/800/800",
    "images": [
      "https://picsum.photos/seed/1490/800/800",
      "https://picsum.photos/seed/1491/800/800",
      "https://picsum.photos/seed/1492/800/800",
      "https://picsum.photos/seed/1493/800/800",
      "https://picsum.photos/seed/1494/800/800"
    ],
    "description": "High-quality mobiles from Realme. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Realme",
    "category": "Mobiles",
    "price": 93265,
    "countInStock": 83,
    "isFeatured": false,
    "rating": 3.3,
    "numReviews": 293
  },
  {
    "name": "Razer Electronics 232",
    "image": "https://picsum.photos/seed/1495/800/800",
    "images": [
      "https://picsum.photos/seed/1495/800/800",
      "https://picsum.photos/seed/1496/800/800",
      "https://picsum.photos/seed/1497/800/800",
      "https://picsum.photos/seed/1498/800/800",
      "https://picsum.photos/seed/1499/800/800"
    ],
    "description": "High-quality electronics from Razer. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Razer",
    "category": "Electronics",
    "price": 25957,
    "countInStock": 16,
    "isFeatured": true,
    "rating": 3.3,
    "numReviews": 455
  },
  {
    "name": "Raymond Fashion 518",
    "image": "https://picsum.photos/seed/1500/800/800",
    "images": [
      "https://picsum.photos/seed/1500/800/800",
      "https://picsum.photos/seed/1501/800/800",
      "https://picsum.photos/seed/1502/800/800",
      "https://picsum.photos/seed/1503/800/800",
      "https://picsum.photos/seed/1504/800/800"
    ],
    "description": "High-quality fashion from Raymond. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Raymond",
    "category": "Fashion",
    "price": 2648,
    "countInStock": 98,
    "isFeatured": true,
    "rating": 3.8,
    "numReviews": 739
  },
  {
    "name": "Godrej Interio Home & Furniture 942",
    "image": "https://picsum.photos/seed/1505/800/800",
    "images": [
      "https://picsum.photos/seed/1505/800/800",
      "https://picsum.photos/seed/1506/800/800",
      "https://picsum.photos/seed/1507/800/800",
      "https://picsum.photos/seed/1508/800/800",
      "https://picsum.photos/seed/1509/800/800"
    ],
    "description": "High-quality home & furniture from Godrej Interio. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Godrej Interio",
    "category": "Home & Furniture",
    "price": 15077,
    "countInStock": 72,
    "isFeatured": false,
    "rating": 4.9,
    "numReviews": 103
  },
  {
    "name": "Bajaj Appliances 198",
    "image": "https://picsum.photos/seed/1510/800/800",
    "images": [
      "https://picsum.photos/seed/1510/800/800",
      "https://picsum.photos/seed/1511/800/800",
      "https://picsum.photos/seed/1512/800/800",
      "https://picsum.photos/seed/1513/800/800",
      "https://picsum.photos/seed/1514/800/800"
    ],
    "description": "High-quality appliances from Bajaj. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Bajaj",
    "category": "Appliances",
    "price": 23282,
    "countInStock": 69,
    "isFeatured": false,
    "rating": 3.8,
    "numReviews": 724
  },
  {
    "name": "Dabur Grocery 74",
    "image": "https://picsum.photos/seed/1515/800/800",
    "images": [
      "https://picsum.photos/seed/1515/800/800",
      "https://picsum.photos/seed/1516/800/800",
      "https://picsum.photos/seed/1517/800/800",
      "https://picsum.photos/seed/1518/800/800",
      "https://picsum.photos/seed/1519/800/800"
    ],
    "description": "High-quality grocery from Dabur. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Dabur",
    "category": "Grocery",
    "price": 2766,
    "countInStock": 91,
    "isFeatured": false,
    "rating": 3.2,
    "numReviews": 205
  },
  {
    "name": "Clinique Beauty 872",
    "image": "https://picsum.photos/seed/1520/800/800",
    "images": [
      "https://picsum.photos/seed/1520/800/800",
      "https://picsum.photos/seed/1521/800/800",
      "https://picsum.photos/seed/1522/800/800",
      "https://picsum.photos/seed/1523/800/800",
      "https://picsum.photos/seed/1524/800/800"
    ],
    "description": "High-quality beauty from Clinique. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Clinique",
    "category": "Beauty",
    "price": 181,
    "countInStock": 27,
    "isFeatured": false,
    "rating": 3.4,
    "numReviews": 792
  },
  {
    "name": "Fitbit Wearables 457",
    "image": "https://picsum.photos/seed/1525/800/800",
    "images": [
      "https://picsum.photos/seed/1525/800/800",
      "https://picsum.photos/seed/1526/800/800",
      "https://picsum.photos/seed/1527/800/800",
      "https://picsum.photos/seed/1528/800/800",
      "https://picsum.photos/seed/1529/800/800"
    ],
    "description": "High-quality wearables from Fitbit. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Fitbit",
    "category": "Wearables",
    "price": 33967,
    "countInStock": 68,
    "isFeatured": false,
    "rating": 3.8,
    "numReviews": 314
  },
  {
    "name": "Mocobara Travel 59",
    "image": "https://picsum.photos/seed/1530/800/800",
    "images": [
      "https://picsum.photos/seed/1530/800/800",
      "https://picsum.photos/seed/1531/800/800",
      "https://picsum.photos/seed/1532/800/800",
      "https://picsum.photos/seed/1533/800/800",
      "https://picsum.photos/seed/1534/800/800"
    ],
    "description": "High-quality travel from Mocobara. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Mocobara",
    "category": "Travel",
    "price": 7098,
    "countInStock": 90,
    "isFeatured": false,
    "rating": 3.8,
    "numReviews": 150
  },
  {
    "name": "Nivea Sports 379",
    "image": "https://picsum.photos/seed/1535/800/800",
    "images": [
      "https://picsum.photos/seed/1535/800/800",
      "https://picsum.photos/seed/1536/800/800",
      "https://picsum.photos/seed/1537/800/800",
      "https://picsum.photos/seed/1538/800/800",
      "https://picsum.photos/seed/1539/800/800"
    ],
    "description": "High-quality sports from Nivea. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Nivea",
    "category": "Sports",
    "price": 2819,
    "countInStock": 77,
    "isFeatured": true,
    "rating": 4.4,
    "numReviews": 800
  },
  {
    "name": "HarperCollins Books 737",
    "image": "https://picsum.photos/seed/1540/800/800",
    "images": [
      "https://picsum.photos/seed/1540/800/800",
      "https://picsum.photos/seed/1541/800/800",
      "https://picsum.photos/seed/1542/800/800",
      "https://picsum.photos/seed/1543/800/800",
      "https://picsum.photos/seed/1544/800/800"
    ],
    "description": "High-quality books from HarperCollins. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "HarperCollins",
    "category": "Books",
    "price": 602,
    "countInStock": 69,
    "isFeatured": false,
    "rating": 3.6,
    "numReviews": 460
  },
  {
    "name": "Google Mobiles 616",
    "image": "https://picsum.photos/seed/1545/800/800",
    "images": [
      "https://picsum.photos/seed/1545/800/800",
      "https://picsum.photos/seed/1546/800/800",
      "https://picsum.photos/seed/1547/800/800",
      "https://picsum.photos/seed/1548/800/800",
      "https://picsum.photos/seed/1549/800/800"
    ],
    "description": "High-quality mobiles from Google. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Google",
    "category": "Mobiles",
    "price": 119686,
    "countInStock": 81,
    "isFeatured": true,
    "rating": 3.9,
    "numReviews": 973
  },
  {
    "name": "Sony Electronics 595",
    "image": "https://picsum.photos/seed/1550/800/800",
    "images": [
      "https://picsum.photos/seed/1550/800/800",
      "https://picsum.photos/seed/1551/800/800",
      "https://picsum.photos/seed/1552/800/800",
      "https://picsum.photos/seed/1553/800/800",
      "https://picsum.photos/seed/1554/800/800"
    ],
    "description": "High-quality electronics from Sony. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Sony",
    "category": "Electronics",
    "price": 159223,
    "countInStock": 47,
    "isFeatured": false,
    "rating": 3.9,
    "numReviews": 826
  },
  {
    "name": "Puma Fashion 460",
    "image": "https://picsum.photos/seed/1555/800/800",
    "images": [
      "https://picsum.photos/seed/1555/800/800",
      "https://picsum.photos/seed/1556/800/800",
      "https://picsum.photos/seed/1557/800/800",
      "https://picsum.photos/seed/1558/800/800",
      "https://picsum.photos/seed/1559/800/800"
    ],
    "description": "High-quality fashion from Puma. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Puma",
    "category": "Fashion",
    "price": 1774,
    "countInStock": 24,
    "isFeatured": true,
    "rating": 4.8,
    "numReviews": 289
  }
];

const importData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();

    const adminUser = await User.create({
      name: "Kristina Evans",
      email: "kris.evans@gmail.com",
      password: "password123",
      isAdmin: true,
      avatar: "https://i.pravatar.cc/150?u=kris.evans@gmail.com",
      role: "Sales Manager"
    });

    const users = [
      {
        name: "Michelle Black",
        email: "michelle@example.com",
        password: "password123",
        isAdmin: false,
        avatar: "https://i.pravatar.cc/150?u=michelle@example.com",
        role: "Premium Buyer"
      },
      {
        name: "Janice Chandler",
        email: "janice@example.com",
        password: "password123",
        isAdmin: false,
        avatar: "https://i.pravatar.cc/150?u=janice@example.com",
        role: "Retailer"
      },
      {
        name: "Mildred Hall",
        email: "mildred@example.com",
        password: "password123",
        isAdmin: false,
        avatar: "https://i.pravatar.cc/150?u=mildred@example.com",
        role: "Manager"
      }
    ];

    await User.insertMany(users);

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser._id };
    });

    await Product.insertMany(sampleProducts);

    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

importData();