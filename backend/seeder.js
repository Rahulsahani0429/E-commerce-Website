import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import Product from "./models/Product.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const products = [
  {
    "name": "MSI Electronics 379",
    "image": "https://picsum.photos/seed/10/800/800",
    "images": [
      "https://picsum.photos/seed/10/800/800",
      "https://picsum.photos/seed/11/800/800",
      "https://picsum.photos/seed/12/800/800",
      "https://picsum.photos/seed/13/800/800",
      "https://picsum.photos/seed/14/800/800"
    ],
    "description": "High-quality electronics from MSI. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "MSI",
    "category": "Electronics",
    "price": 42014,
    "countInStock": 19,
    "isFeatured": true,
    "rating": 4.5,
    "numReviews": 649
  },
  {
    "name": "Adidas Fashion 932",
    "image": "https://picsum.photos/seed/15/800/800",
    "images": [
      "https://picsum.photos/seed/15/800/800",
      "https://picsum.photos/seed/16/800/800",
      "https://picsum.photos/seed/17/800/800",
      "https://picsum.photos/seed/18/800/800",
      "https://picsum.photos/seed/19/800/800"
    ],
    "description": "High-quality fashion from Adidas. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Adidas",
    "category": "Fashion",
    "price": 2232,
    "countInStock": 37,
    "isFeatured": true,
    "rating": 3.4,
    "numReviews": 615
  },
  {
    "name": "Sleepwell Home & Furniture 495",
    "image": "https://picsum.photos/seed/20/800/800",
    "images": [
      "https://picsum.photos/seed/20/800/800",
      "https://picsum.photos/seed/21/800/800",
      "https://picsum.photos/seed/22/800/800",
      "https://picsum.photos/seed/23/800/800",
      "https://picsum.photos/seed/24/800/800"
    ],
    "description": "High-quality home & furniture from Sleepwell. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Sleepwell",
    "category": "Home & Furniture",
    "price": 40036,
    "countInStock": 57,
    "isFeatured": false,
    "rating": 3.8,
    "numReviews": 971
  },
  {
    "name": "Prestige Appliances 52",
    "image": "https://picsum.photos/seed/25/800/800",
    "images": [
      "https://picsum.photos/seed/25/800/800",
      "https://picsum.photos/seed/26/800/800",
      "https://picsum.photos/seed/27/800/800",
      "https://picsum.photos/seed/28/800/800",
      "https://picsum.photos/seed/29/800/800"
    ],
    "description": "High-quality appliances from Prestige. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Prestige",
    "category": "Appliances",
    "price": 20634,
    "countInStock": 84,
    "isFeatured": false,
    "rating": 3.2,
    "numReviews": 589
  },
  {
    "name": "Organic India Grocery 427",
    "image": "https://picsum.photos/seed/30/800/800",
    "images": [
      "https://picsum.photos/seed/30/800/800",
      "https://picsum.photos/seed/31/800/800",
      "https://picsum.photos/seed/32/800/800",
      "https://picsum.photos/seed/33/800/800",
      "https://picsum.photos/seed/34/800/800"
    ],
    "description": "High-quality grocery from Organic India. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Organic India",
    "category": "Grocery",
    "price": 3189,
    "countInStock": 7,
    "isFeatured": false,
    "rating": 3.4,
    "numReviews": 620
  },
  {
    "name": "MAC Beauty 575",
    "image": "https://picsum.photos/seed/35/800/800",
    "images": [
      "https://picsum.photos/seed/35/800/800",
      "https://picsum.photos/seed/36/800/800",
      "https://picsum.photos/seed/37/800/800",
      "https://picsum.photos/seed/38/800/800",
      "https://picsum.photos/seed/39/800/800"
    ],
    "description": "High-quality beauty from MAC. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "MAC",
    "category": "Beauty",
    "price": 1205,
    "countInStock": 29,
    "isFeatured": false,
    "rating": 4.5,
    "numReviews": 533
  },
  {
    "name": "Noise Wearables 960",
    "image": "https://picsum.photos/seed/40/800/800",
    "images": [
      "https://picsum.photos/seed/40/800/800",
      "https://picsum.photos/seed/41/800/800",
      "https://picsum.photos/seed/42/800/800",
      "https://picsum.photos/seed/43/800/800",
      "https://picsum.photos/seed/44/800/800"
    ],
    "description": "High-quality wearables from Noise. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Noise",
    "category": "Wearables",
    "price": 17699,
    "countInStock": 99,
    "isFeatured": false,
    "rating": 4.4,
    "numReviews": 40
  },
  {
    "name": "Safari Travel 17",
    "image": "https://picsum.photos/seed/45/800/800",
    "images": [
      "https://picsum.photos/seed/45/800/800",
      "https://picsum.photos/seed/46/800/800",
      "https://picsum.photos/seed/47/800/800",
      "https://picsum.photos/seed/48/800/800",
      "https://picsum.photos/seed/49/800/800"
    ],
    "description": "High-quality travel from Safari. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Safari",
    "category": "Travel",
    "price": 14294,
    "countInStock": 35,
    "isFeatured": false,
    "rating": 4.5,
    "numReviews": 373
  },
  {
    "name": "Cosco Sports 540",
    "image": "https://picsum.photos/seed/50/800/800",
    "images": [
      "https://picsum.photos/seed/50/800/800",
      "https://picsum.photos/seed/51/800/800",
      "https://picsum.photos/seed/52/800/800",
      "https://picsum.photos/seed/53/800/800",
      "https://picsum.photos/seed/54/800/800"
    ],
    "description": "High-quality sports from Cosco. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Cosco",
    "category": "Sports",
    "price": 36327,
    "countInStock": 21,
    "isFeatured": false,
    "rating": 3.3,
    "numReviews": 969
  },
  {
    "name": "Scholastic Books 972",
    "image": "https://picsum.photos/seed/55/800/800",
    "images": [
      "https://picsum.photos/seed/55/800/800",
      "https://picsum.photos/seed/56/800/800",
      "https://picsum.photos/seed/57/800/800",
      "https://picsum.photos/seed/58/800/800",
      "https://picsum.photos/seed/59/800/800"
    ],
    "description": "High-quality books from Scholastic. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Scholastic",
    "category": "Books",
    "price": 656,
    "countInStock": 91,
    "isFeatured": false,
    "rating": 3.4,
    "numReviews": 320
  },
  {
    "name": "Xiaomi Mobiles 67",
    "image": "https://picsum.photos/seed/60/800/800",
    "images": [
      "https://picsum.photos/seed/60/800/800",
      "https://picsum.photos/seed/61/800/800",
      "https://picsum.photos/seed/62/800/800",
      "https://picsum.photos/seed/63/800/800",
      "https://picsum.photos/seed/64/800/800"
    ],
    "description": "High-quality mobiles from Xiaomi. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Xiaomi",
    "category": "Mobiles",
    "price": 45084,
    "countInStock": 93,
    "isFeatured": false,
    "rating": 3.4,
    "numReviews": 136
  },
  {
    "name": "HP Electronics 623",
    "image": "https://picsum.photos/seed/65/800/800",
    "images": [
      "https://picsum.photos/seed/65/800/800",
      "https://picsum.photos/seed/66/800/800",
      "https://picsum.photos/seed/67/800/800",
      "https://picsum.photos/seed/68/800/800",
      "https://picsum.photos/seed/69/800/800"
    ],
    "description": "High-quality electronics from HP. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "HP",
    "category": "Electronics",
    "price": 149285,
    "countInStock": 7,
    "isFeatured": false,
    "rating": 3.3,
    "numReviews": 54
  },
  {
    "name": "Levis Fashion 931",
    "image": "https://picsum.photos/seed/70/800/800",
    "images": [
      "https://picsum.photos/seed/70/800/800",
      "https://picsum.photos/seed/71/800/800",
      "https://picsum.photos/seed/72/800/800",
      "https://picsum.photos/seed/73/800/800",
      "https://picsum.photos/seed/74/800/800"
    ],
    "description": "High-quality fashion from Levis. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Levis",
    "category": "Fashion",
    "price": 5063,
    "countInStock": 9,
    "isFeatured": true,
    "rating": 4.1,
    "numReviews": 448
  },
  {
    "name": "Home Centre Home & Furniture 539",
    "image": "https://picsum.photos/seed/75/800/800",
    "images": [
      "https://picsum.photos/seed/75/800/800",
      "https://picsum.photos/seed/76/800/800",
      "https://picsum.photos/seed/77/800/800",
      "https://picsum.photos/seed/78/800/800",
      "https://picsum.photos/seed/79/800/800"
    ],
    "description": "High-quality home & furniture from Home Centre. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Home Centre",
    "category": "Home & Furniture",
    "price": 9271,
    "countInStock": 22,
    "isFeatured": false,
    "rating": 3.8,
    "numReviews": 654
  },
  {
    "name": "Bajaj Appliances 871",
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
    "price": 26589,
    "countInStock": 18,
    "isFeatured": false,
    "rating": 3,
    "numReviews": 963
  },
  {
    "name": "Happilo Grocery 438",
    "image": "https://picsum.photos/seed/85/800/800",
    "images": [
      "https://picsum.photos/seed/85/800/800",
      "https://picsum.photos/seed/86/800/800",
      "https://picsum.photos/seed/87/800/800",
      "https://picsum.photos/seed/88/800/800",
      "https://picsum.photos/seed/89/800/800"
    ],
    "description": "High-quality grocery from Happilo. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Happilo",
    "category": "Grocery",
    "price": 4316,
    "countInStock": 54,
    "isFeatured": false,
    "rating": 3.5,
    "numReviews": 993
  },
  {
    "name": "Neutrogena Beauty 138",
    "image": "https://picsum.photos/seed/90/800/800",
    "images": [
      "https://picsum.photos/seed/90/800/800",
      "https://picsum.photos/seed/91/800/800",
      "https://picsum.photos/seed/92/800/800",
      "https://picsum.photos/seed/93/800/800",
      "https://picsum.photos/seed/94/800/800"
    ],
    "description": "High-quality beauty from Neutrogena. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Neutrogena",
    "category": "Beauty",
    "price": 2197,
    "countInStock": 35,
    "isFeatured": false,
    "rating": 3.3,
    "numReviews": 866
  },
  {
    "name": "Apple Wearables 158",
    "image": "https://picsum.photos/seed/95/800/800",
    "images": [
      "https://picsum.photos/seed/95/800/800",
      "https://picsum.photos/seed/96/800/800",
      "https://picsum.photos/seed/97/800/800",
      "https://picsum.photos/seed/98/800/800",
      "https://picsum.photos/seed/99/800/800"
    ],
    "description": "High-quality wearables from Apple. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Apple",
    "category": "Wearables",
    "price": 20465,
    "countInStock": 34,
    "isFeatured": false,
    "rating": 3.4,
    "numReviews": 995
  },
  {
    "name": "American Tourister Travel 819",
    "image": "https://picsum.photos/seed/100/800/800",
    "images": [
      "https://picsum.photos/seed/100/800/800",
      "https://picsum.photos/seed/101/800/800",
      "https://picsum.photos/seed/102/800/800",
      "https://picsum.photos/seed/103/800/800",
      "https://picsum.photos/seed/104/800/800"
    ],
    "description": "High-quality travel from American Tourister. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "American Tourister",
    "category": "Travel",
    "price": 1266,
    "countInStock": 70,
    "isFeatured": true,
    "rating": 3.9,
    "numReviews": 506
  },
  {
    "name": "Speedo Sports 244",
    "image": "https://picsum.photos/seed/105/800/800",
    "images": [
      "https://picsum.photos/seed/105/800/800",
      "https://picsum.photos/seed/106/800/800",
      "https://picsum.photos/seed/107/800/800",
      "https://picsum.photos/seed/108/800/800",
      "https://picsum.photos/seed/109/800/800"
    ],
    "description": "High-quality sports from Speedo. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Speedo",
    "category": "Sports",
    "price": 15324,
    "countInStock": 60,
    "isFeatured": false,
    "rating": 3.2,
    "numReviews": 141
  },
  {
    "name": "Scholastic Books 946",
    "image": "https://picsum.photos/seed/110/800/800",
    "images": [
      "https://picsum.photos/seed/110/800/800",
      "https://picsum.photos/seed/111/800/800",
      "https://picsum.photos/seed/112/800/800",
      "https://picsum.photos/seed/113/800/800",
      "https://picsum.photos/seed/114/800/800"
    ],
    "description": "High-quality books from Scholastic. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Scholastic",
    "category": "Books",
    "price": 427,
    "countInStock": 9,
    "isFeatured": false,
    "rating": 3.6,
    "numReviews": 743
  },
  {
    "name": "OnePlus Mobiles 530",
    "image": "https://picsum.photos/seed/115/800/800",
    "images": [
      "https://picsum.photos/seed/115/800/800",
      "https://picsum.photos/seed/116/800/800",
      "https://picsum.photos/seed/117/800/800",
      "https://picsum.photos/seed/118/800/800",
      "https://picsum.photos/seed/119/800/800"
    ],
    "description": "High-quality mobiles from OnePlus. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "OnePlus",
    "category": "Mobiles",
    "price": 49871,
    "countInStock": 17,
    "isFeatured": false,
    "rating": 4.7,
    "numReviews": 457
  },
  {
    "name": "Acer Electronics 70",
    "image": "https://picsum.photos/seed/120/800/800",
    "images": [
      "https://picsum.photos/seed/120/800/800",
      "https://picsum.photos/seed/121/800/800",
      "https://picsum.photos/seed/122/800/800",
      "https://picsum.photos/seed/123/800/800",
      "https://picsum.photos/seed/124/800/800"
    ],
    "description": "High-quality electronics from Acer. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Acer",
    "category": "Electronics",
    "price": 110759,
    "countInStock": 58,
    "isFeatured": false,
    "rating": 3.3,
    "numReviews": 59
  },
  {
    "name": "Zara Fashion 61",
    "image": "https://picsum.photos/seed/125/800/800",
    "images": [
      "https://picsum.photos/seed/125/800/800",
      "https://picsum.photos/seed/126/800/800",
      "https://picsum.photos/seed/127/800/800",
      "https://picsum.photos/seed/128/800/800",
      "https://picsum.photos/seed/129/800/800"
    ],
    "description": "High-quality fashion from Zara. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Zara",
    "category": "Fashion",
    "price": 5846,
    "countInStock": 36,
    "isFeatured": false,
    "rating": 3.3,
    "numReviews": 344
  },
  {
    "name": "Home Centre Home & Furniture 390",
    "image": "https://picsum.photos/seed/130/800/800",
    "images": [
      "https://picsum.photos/seed/130/800/800",
      "https://picsum.photos/seed/131/800/800",
      "https://picsum.photos/seed/132/800/800",
      "https://picsum.photos/seed/133/800/800",
      "https://picsum.photos/seed/134/800/800"
    ],
    "description": "High-quality home & furniture from Home Centre. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Home Centre",
    "category": "Home & Furniture",
    "price": 16231,
    "countInStock": 62,
    "isFeatured": false,
    "rating": 4.9,
    "numReviews": 58
  },
  {
    "name": "Philips Appliances 19",
    "image": "https://picsum.photos/seed/135/800/800",
    "images": [
      "https://picsum.photos/seed/135/800/800",
      "https://picsum.photos/seed/136/800/800",
      "https://picsum.photos/seed/137/800/800",
      "https://picsum.photos/seed/138/800/800",
      "https://picsum.photos/seed/139/800/800"
    ],
    "description": "High-quality appliances from Philips. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Philips",
    "category": "Appliances",
    "price": 8206,
    "countInStock": 63,
    "isFeatured": true,
    "rating": 4.5,
    "numReviews": 599
  },
  {
    "name": "Amul Grocery 198",
    "image": "https://picsum.photos/seed/140/800/800",
    "images": [
      "https://picsum.photos/seed/140/800/800",
      "https://picsum.photos/seed/141/800/800",
      "https://picsum.photos/seed/142/800/800",
      "https://picsum.photos/seed/143/800/800",
      "https://picsum.photos/seed/144/800/800"
    ],
    "description": "High-quality grocery from Amul. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Amul",
    "category": "Grocery",
    "price": 4290,
    "countInStock": 79,
    "isFeatured": false,
    "rating": 3.4,
    "numReviews": 545
  },
  {
    "name": "Neutrogena Beauty 503",
    "image": "https://picsum.photos/seed/145/800/800",
    "images": [
      "https://picsum.photos/seed/145/800/800",
      "https://picsum.photos/seed/146/800/800",
      "https://picsum.photos/seed/147/800/800",
      "https://picsum.photos/seed/148/800/800",
      "https://picsum.photos/seed/149/800/800"
    ],
    "description": "High-quality beauty from Neutrogena. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Neutrogena",
    "category": "Beauty",
    "price": 3936,
    "countInStock": 5,
    "isFeatured": true,
    "rating": 4,
    "numReviews": 929
  },
  {
    "name": "boAt Wearables 905",
    "image": "https://picsum.photos/seed/150/800/800",
    "images": [
      "https://picsum.photos/seed/150/800/800",
      "https://picsum.photos/seed/151/800/800",
      "https://picsum.photos/seed/152/800/800",
      "https://picsum.photos/seed/153/800/800",
      "https://picsum.photos/seed/154/800/800"
    ],
    "description": "High-quality wearables from boAt. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "boAt",
    "category": "Wearables",
    "price": 37544,
    "countInStock": 22,
    "isFeatured": false,
    "rating": 4.4,
    "numReviews": 329
  },
  {
    "name": "Samsonite Travel 326",
    "image": "https://picsum.photos/seed/155/800/800",
    "images": [
      "https://picsum.photos/seed/155/800/800",
      "https://picsum.photos/seed/156/800/800",
      "https://picsum.photos/seed/157/800/800",
      "https://picsum.photos/seed/158/800/800",
      "https://picsum.photos/seed/159/800/800"
    ],
    "description": "High-quality travel from Samsonite. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Samsonite",
    "category": "Travel",
    "price": 1399,
    "countInStock": 34,
    "isFeatured": true,
    "rating": 3.7,
    "numReviews": 903
  },
  {
    "name": "Yonex Sports 306",
    "image": "https://picsum.photos/seed/160/800/800",
    "images": [
      "https://picsum.photos/seed/160/800/800",
      "https://picsum.photos/seed/161/800/800",
      "https://picsum.photos/seed/162/800/800",
      "https://picsum.photos/seed/163/800/800",
      "https://picsum.photos/seed/164/800/800"
    ],
    "description": "High-quality sports from Yonex. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Yonex",
    "category": "Sports",
    "price": 36313,
    "countInStock": 67,
    "isFeatured": false,
    "rating": 3.8,
    "numReviews": 625
  },
  {
    "name": "Rupa Books 848",
    "image": "https://picsum.photos/seed/165/800/800",
    "images": [
      "https://picsum.photos/seed/165/800/800",
      "https://picsum.photos/seed/166/800/800",
      "https://picsum.photos/seed/167/800/800",
      "https://picsum.photos/seed/168/800/800",
      "https://picsum.photos/seed/169/800/800"
    ],
    "description": "High-quality books from Rupa. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Rupa",
    "category": "Books",
    "price": 1342,
    "countInStock": 73,
    "isFeatured": true,
    "rating": 3.7,
    "numReviews": 68
  },
  {
    "name": "Xiaomi Mobiles 669",
    "image": "https://picsum.photos/seed/170/800/800",
    "images": [
      "https://picsum.photos/seed/170/800/800",
      "https://picsum.photos/seed/171/800/800",
      "https://picsum.photos/seed/172/800/800",
      "https://picsum.photos/seed/173/800/800",
      "https://picsum.photos/seed/174/800/800"
    ],
    "description": "High-quality mobiles from Xiaomi. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Xiaomi",
    "category": "Mobiles",
    "price": 78623,
    "countInStock": 55,
    "isFeatured": false,
    "rating": 4.8,
    "numReviews": 88
  },
  {
    "name": "Acer Electronics 436",
    "image": "https://picsum.photos/seed/175/800/800",
    "images": [
      "https://picsum.photos/seed/175/800/800",
      "https://picsum.photos/seed/176/800/800",
      "https://picsum.photos/seed/177/800/800",
      "https://picsum.photos/seed/178/800/800",
      "https://picsum.photos/seed/179/800/800"
    ],
    "description": "High-quality electronics from Acer. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Acer",
    "category": "Electronics",
    "price": 112823,
    "countInStock": 82,
    "isFeatured": false,
    "rating": 3.8,
    "numReviews": 201
  },
  {
    "name": "Nike Fashion 329",
    "image": "https://picsum.photos/seed/180/800/800",
    "images": [
      "https://picsum.photos/seed/180/800/800",
      "https://picsum.photos/seed/181/800/800",
      "https://picsum.photos/seed/182/800/800",
      "https://picsum.photos/seed/183/800/800",
      "https://picsum.photos/seed/184/800/800"
    ],
    "description": "High-quality fashion from Nike. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Nike",
    "category": "Fashion",
    "price": 783,
    "countInStock": 11,
    "isFeatured": false,
    "rating": 4.4,
    "numReviews": 403
  },
  {
    "name": "Duroflex Home & Furniture 343",
    "image": "https://picsum.photos/seed/185/800/800",
    "images": [
      "https://picsum.photos/seed/185/800/800",
      "https://picsum.photos/seed/186/800/800",
      "https://picsum.photos/seed/187/800/800",
      "https://picsum.photos/seed/188/800/800",
      "https://picsum.photos/seed/189/800/800"
    ],
    "description": "High-quality home & furniture from Duroflex. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Duroflex",
    "category": "Home & Furniture",
    "price": 40221,
    "countInStock": 85,
    "isFeatured": false,
    "rating": 3.4,
    "numReviews": 471
  },
  {
    "name": "Samsung Appliances 611",
    "image": "https://picsum.photos/seed/190/800/800",
    "images": [
      "https://picsum.photos/seed/190/800/800",
      "https://picsum.photos/seed/191/800/800",
      "https://picsum.photos/seed/192/800/800",
      "https://picsum.photos/seed/193/800/800",
      "https://picsum.photos/seed/194/800/800"
    ],
    "description": "High-quality appliances from Samsung. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Samsung",
    "category": "Appliances",
    "price": 61397,
    "countInStock": 41,
    "isFeatured": false,
    "rating": 3.1,
    "numReviews": 432
  },
  {
    "name": "Organic India Grocery 851",
    "image": "https://picsum.photos/seed/195/800/800",
    "images": [
      "https://picsum.photos/seed/195/800/800",
      "https://picsum.photos/seed/196/800/800",
      "https://picsum.photos/seed/197/800/800",
      "https://picsum.photos/seed/198/800/800",
      "https://picsum.photos/seed/199/800/800"
    ],
    "description": "High-quality grocery from Organic India. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Organic India",
    "category": "Grocery",
    "price": 1032,
    "countInStock": 37,
    "isFeatured": true,
    "rating": 3.1,
    "numReviews": 805
  },
  {
    "name": "Lakme Beauty 823",
    "image": "https://picsum.photos/seed/200/800/800",
    "images": [
      "https://picsum.photos/seed/200/800/800",
      "https://picsum.photos/seed/201/800/800",
      "https://picsum.photos/seed/202/800/800",
      "https://picsum.photos/seed/203/800/800",
      "https://picsum.photos/seed/204/800/800"
    ],
    "description": "High-quality beauty from Lakme. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Lakme",
    "category": "Beauty",
    "price": 1902,
    "countInStock": 67,
    "isFeatured": false,
    "rating": 4.6,
    "numReviews": 248
  },
  {
    "name": "Garmin Wearables 249",
    "image": "https://picsum.photos/seed/205/800/800",
    "images": [
      "https://picsum.photos/seed/205/800/800",
      "https://picsum.photos/seed/206/800/800",
      "https://picsum.photos/seed/207/800/800",
      "https://picsum.photos/seed/208/800/800",
      "https://picsum.photos/seed/209/800/800"
    ],
    "description": "High-quality wearables from Garmin. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Garmin",
    "category": "Wearables",
    "price": 17991,
    "countInStock": 20,
    "isFeatured": false,
    "rating": 3.1,
    "numReviews": 610
  },
  {
    "name": "American Tourister Travel 159",
    "image": "https://picsum.photos/seed/210/800/800",
    "images": [
      "https://picsum.photos/seed/210/800/800",
      "https://picsum.photos/seed/211/800/800",
      "https://picsum.photos/seed/212/800/800",
      "https://picsum.photos/seed/213/800/800",
      "https://picsum.photos/seed/214/800/800"
    ],
    "description": "High-quality travel from American Tourister. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "American Tourister",
    "category": "Travel",
    "price": 7850,
    "countInStock": 1,
    "isFeatured": false,
    "rating": 3.8,
    "numReviews": 487
  },
  {
    "name": "Yonex Sports 438",
    "image": "https://picsum.photos/seed/215/800/800",
    "images": [
      "https://picsum.photos/seed/215/800/800",
      "https://picsum.photos/seed/216/800/800",
      "https://picsum.photos/seed/217/800/800",
      "https://picsum.photos/seed/218/800/800",
      "https://picsum.photos/seed/219/800/800"
    ],
    "description": "High-quality sports from Yonex. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Yonex",
    "category": "Sports",
    "price": 7132,
    "countInStock": 60,
    "isFeatured": true,
    "rating": 3.7,
    "numReviews": 986
  },
  {
    "name": "Pearson Books 792",
    "image": "https://picsum.photos/seed/220/800/800",
    "images": [
      "https://picsum.photos/seed/220/800/800",
      "https://picsum.photos/seed/221/800/800",
      "https://picsum.photos/seed/222/800/800",
      "https://picsum.photos/seed/223/800/800",
      "https://picsum.photos/seed/224/800/800"
    ],
    "description": "High-quality books from Pearson. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Pearson",
    "category": "Books",
    "price": 1446,
    "countInStock": 73,
    "isFeatured": false,
    "rating": 4.4,
    "numReviews": 220
  },
  {
    "name": "Google Mobiles 555",
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
    "price": 70318,
    "countInStock": 38,
    "isFeatured": false,
    "rating": 4.2,
    "numReviews": 510
  },
  {
    "name": "Sony Electronics 803",
    "image": "https://picsum.photos/seed/230/800/800",
    "images": [
      "https://picsum.photos/seed/230/800/800",
      "https://picsum.photos/seed/231/800/800",
      "https://picsum.photos/seed/232/800/800",
      "https://picsum.photos/seed/233/800/800",
      "https://picsum.photos/seed/234/800/800"
    ],
    "description": "High-quality electronics from Sony. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Sony",
    "category": "Electronics",
    "price": 70895,
    "countInStock": 35,
    "isFeatured": true,
    "rating": 3.5,
    "numReviews": 125
  },
  {
    "name": "Puma Fashion 183",
    "image": "https://picsum.photos/seed/235/800/800",
    "images": [
      "https://picsum.photos/seed/235/800/800",
      "https://picsum.photos/seed/236/800/800",
      "https://picsum.photos/seed/237/800/800",
      "https://picsum.photos/seed/238/800/800",
      "https://picsum.photos/seed/239/800/800"
    ],
    "description": "High-quality fashion from Puma. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Puma",
    "category": "Fashion",
    "price": 2223,
    "countInStock": 86,
    "isFeatured": false,
    "rating": 3.7,
    "numReviews": 977
  },
  {
    "name": "IKEA Home & Furniture 418",
    "image": "https://picsum.photos/seed/240/800/800",
    "images": [
      "https://picsum.photos/seed/240/800/800",
      "https://picsum.photos/seed/241/800/800",
      "https://picsum.photos/seed/242/800/800",
      "https://picsum.photos/seed/243/800/800",
      "https://picsum.photos/seed/244/800/800"
    ],
    "description": "High-quality home & furniture from IKEA. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "IKEA",
    "category": "Home & Furniture",
    "price": 46247,
    "countInStock": 33,
    "isFeatured": false,
    "rating": 3.8,
    "numReviews": 847
  },
  {
    "name": "Haier Appliances 393",
    "image": "https://picsum.photos/seed/245/800/800",
    "images": [
      "https://picsum.photos/seed/245/800/800",
      "https://picsum.photos/seed/246/800/800",
      "https://picsum.photos/seed/247/800/800",
      "https://picsum.photos/seed/248/800/800",
      "https://picsum.photos/seed/249/800/800"
    ],
    "description": "High-quality appliances from Haier. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Haier",
    "category": "Appliances",
    "price": 55382,
    "countInStock": 30,
    "isFeatured": false,
    "rating": 3.1,
    "numReviews": 415
  },
  {
    "name": "Nestle Grocery 282",
    "image": "https://picsum.photos/seed/250/800/800",
    "images": [
      "https://picsum.photos/seed/250/800/800",
      "https://picsum.photos/seed/251/800/800",
      "https://picsum.photos/seed/252/800/800",
      "https://picsum.photos/seed/253/800/800",
      "https://picsum.photos/seed/254/800/800"
    ],
    "description": "High-quality grocery from Nestle. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Nestle",
    "category": "Grocery",
    "price": 1816,
    "countInStock": 67,
    "isFeatured": true,
    "rating": 3.8,
    "numReviews": 632
  },
  {
    "name": "Clinique Beauty 702",
    "image": "https://picsum.photos/seed/255/800/800",
    "images": [
      "https://picsum.photos/seed/255/800/800",
      "https://picsum.photos/seed/256/800/800",
      "https://picsum.photos/seed/257/800/800",
      "https://picsum.photos/seed/258/800/800",
      "https://picsum.photos/seed/259/800/800"
    ],
    "description": "High-quality beauty from Clinique. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Clinique",
    "category": "Beauty",
    "price": 4033,
    "countInStock": 14,
    "isFeatured": false,
    "rating": 4.5,
    "numReviews": 29
  },
  {
    "name": "Noise Wearables 559",
    "image": "https://picsum.photos/seed/260/800/800",
    "images": [
      "https://picsum.photos/seed/260/800/800",
      "https://picsum.photos/seed/261/800/800",
      "https://picsum.photos/seed/262/800/800",
      "https://picsum.photos/seed/263/800/800",
      "https://picsum.photos/seed/264/800/800"
    ],
    "description": "High-quality wearables from Noise. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Noise",
    "category": "Wearables",
    "price": 27926,
    "countInStock": 81,
    "isFeatured": false,
    "rating": 4.6,
    "numReviews": 344
  },
  {
    "name": "Mocobara Travel 206",
    "image": "https://picsum.photos/seed/265/800/800",
    "images": [
      "https://picsum.photos/seed/265/800/800",
      "https://picsum.photos/seed/266/800/800",
      "https://picsum.photos/seed/267/800/800",
      "https://picsum.photos/seed/268/800/800",
      "https://picsum.photos/seed/269/800/800"
    ],
    "description": "High-quality travel from Mocobara. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Mocobara",
    "category": "Travel",
    "price": 3437,
    "countInStock": 21,
    "isFeatured": false,
    "rating": 4.9,
    "numReviews": 701
  },
  {
    "name": "Decathlon Sports 96",
    "image": "https://picsum.photos/seed/270/800/800",
    "images": [
      "https://picsum.photos/seed/270/800/800",
      "https://picsum.photos/seed/271/800/800",
      "https://picsum.photos/seed/272/800/800",
      "https://picsum.photos/seed/273/800/800",
      "https://picsum.photos/seed/274/800/800"
    ],
    "description": "High-quality sports from Decathlon. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Decathlon",
    "category": "Sports",
    "price": 4383,
    "countInStock": 8,
    "isFeatured": false,
    "rating": 4.9,
    "numReviews": 604
  },
  {
    "name": "Pearson Books 289",
    "image": "https://picsum.photos/seed/275/800/800",
    "images": [
      "https://picsum.photos/seed/275/800/800",
      "https://picsum.photos/seed/276/800/800",
      "https://picsum.photos/seed/277/800/800",
      "https://picsum.photos/seed/278/800/800",
      "https://picsum.photos/seed/279/800/800"
    ],
    "description": "High-quality books from Pearson. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Pearson",
    "category": "Books",
    "price": 1880,
    "countInStock": 36,
    "isFeatured": false,
    "rating": 4.5,
    "numReviews": 374
  },
  {
    "name": "Realme Mobiles 598",
    "image": "https://picsum.photos/seed/280/800/800",
    "images": [
      "https://picsum.photos/seed/280/800/800",
      "https://picsum.photos/seed/281/800/800",
      "https://picsum.photos/seed/282/800/800",
      "https://picsum.photos/seed/283/800/800",
      "https://picsum.photos/seed/284/800/800"
    ],
    "description": "High-quality mobiles from Realme. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Realme",
    "category": "Mobiles",
    "price": 99958,
    "countInStock": 46,
    "isFeatured": false,
    "rating": 4.3,
    "numReviews": 458
  },
  {
    "name": "Microsoft Electronics 483",
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
    "price": 151304,
    "countInStock": 50,
    "isFeatured": false,
    "rating": 3.5,
    "numReviews": 635
  },
  {
    "name": "Biba Fashion 709",
    "image": "https://picsum.photos/seed/290/800/800",
    "images": [
      "https://picsum.photos/seed/290/800/800",
      "https://picsum.photos/seed/291/800/800",
      "https://picsum.photos/seed/292/800/800",
      "https://picsum.photos/seed/293/800/800",
      "https://picsum.photos/seed/294/800/800"
    ],
    "description": "High-quality fashion from Biba. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Biba",
    "category": "Fashion",
    "price": 6858,
    "countInStock": 17,
    "isFeatured": false,
    "rating": 4.4,
    "numReviews": 255
  },
  {
    "name": "Duroflex Home & Furniture 798",
    "image": "https://picsum.photos/seed/295/800/800",
    "images": [
      "https://picsum.photos/seed/295/800/800",
      "https://picsum.photos/seed/296/800/800",
      "https://picsum.photos/seed/297/800/800",
      "https://picsum.photos/seed/298/800/800",
      "https://picsum.photos/seed/299/800/800"
    ],
    "description": "High-quality home & furniture from Duroflex. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Duroflex",
    "category": "Home & Furniture",
    "price": 32394,
    "countInStock": 66,
    "isFeatured": false,
    "rating": 3,
    "numReviews": 339
  },
  {
    "name": "Samsung Appliances 865",
    "image": "https://picsum.photos/seed/300/800/800",
    "images": [
      "https://picsum.photos/seed/300/800/800",
      "https://picsum.photos/seed/301/800/800",
      "https://picsum.photos/seed/302/800/800",
      "https://picsum.photos/seed/303/800/800",
      "https://picsum.photos/seed/304/800/800"
    ],
    "description": "High-quality appliances from Samsung. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Samsung",
    "category": "Appliances",
    "price": 45789,
    "countInStock": 11,
    "isFeatured": false,
    "rating": 3.1,
    "numReviews": 310
  },
  {
    "name": "Dabur Grocery 722",
    "image": "https://picsum.photos/seed/305/800/800",
    "images": [
      "https://picsum.photos/seed/305/800/800",
      "https://picsum.photos/seed/306/800/800",
      "https://picsum.photos/seed/307/800/800",
      "https://picsum.photos/seed/308/800/800",
      "https://picsum.photos/seed/309/800/800"
    ],
    "description": "High-quality grocery from Dabur. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Dabur",
    "category": "Grocery",
    "price": 715,
    "countInStock": 96,
    "isFeatured": false,
    "rating": 4.7,
    "numReviews": 478
  },
  {
    "name": "Lakme Beauty 316",
    "image": "https://picsum.photos/seed/310/800/800",
    "images": [
      "https://picsum.photos/seed/310/800/800",
      "https://picsum.photos/seed/311/800/800",
      "https://picsum.photos/seed/312/800/800",
      "https://picsum.photos/seed/313/800/800",
      "https://picsum.photos/seed/314/800/800"
    ],
    "description": "High-quality beauty from Lakme. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Lakme",
    "category": "Beauty",
    "price": 335,
    "countInStock": 65,
    "isFeatured": false,
    "rating": 4.2,
    "numReviews": 857
  },
  {
    "name": "Fossil Wearables 546",
    "image": "https://picsum.photos/seed/315/800/800",
    "images": [
      "https://picsum.photos/seed/315/800/800",
      "https://picsum.photos/seed/316/800/800",
      "https://picsum.photos/seed/317/800/800",
      "https://picsum.photos/seed/318/800/800",
      "https://picsum.photos/seed/319/800/800"
    ],
    "description": "High-quality wearables from Fossil. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Fossil",
    "category": "Wearables",
    "price": 15556,
    "countInStock": 94,
    "isFeatured": true,
    "rating": 3.5,
    "numReviews": 445
  },
  {
    "name": "VIP Travel 707",
    "image": "https://picsum.photos/seed/320/800/800",
    "images": [
      "https://picsum.photos/seed/320/800/800",
      "https://picsum.photos/seed/321/800/800",
      "https://picsum.photos/seed/322/800/800",
      "https://picsum.photos/seed/323/800/800",
      "https://picsum.photos/seed/324/800/800"
    ],
    "description": "High-quality travel from VIP. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "VIP",
    "category": "Travel",
    "price": 3619,
    "countInStock": 61,
    "isFeatured": false,
    "rating": 3.3,
    "numReviews": 847
  },
  {
    "name": "Speedo Sports 496",
    "image": "https://picsum.photos/seed/325/800/800",
    "images": [
      "https://picsum.photos/seed/325/800/800",
      "https://picsum.photos/seed/326/800/800",
      "https://picsum.photos/seed/327/800/800",
      "https://picsum.photos/seed/328/800/800",
      "https://picsum.photos/seed/329/800/800"
    ],
    "description": "High-quality sports from Speedo. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Speedo",
    "category": "Sports",
    "price": 4446,
    "countInStock": 71,
    "isFeatured": true,
    "rating": 3.5,
    "numReviews": 910
  },
  {
    "name": "Penguin Books 834",
    "image": "https://picsum.photos/seed/330/800/800",
    "images": [
      "https://picsum.photos/seed/330/800/800",
      "https://picsum.photos/seed/331/800/800",
      "https://picsum.photos/seed/332/800/800",
      "https://picsum.photos/seed/333/800/800",
      "https://picsum.photos/seed/334/800/800"
    ],
    "description": "High-quality books from Penguin. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Penguin",
    "category": "Books",
    "price": 1887,
    "countInStock": 92,
    "isFeatured": false,
    "rating": 3.1,
    "numReviews": 563
  },
  {
    "name": "Realme Mobiles 750",
    "image": "https://picsum.photos/seed/335/800/800",
    "images": [
      "https://picsum.photos/seed/335/800/800",
      "https://picsum.photos/seed/336/800/800",
      "https://picsum.photos/seed/337/800/800",
      "https://picsum.photos/seed/338/800/800",
      "https://picsum.photos/seed/339/800/800"
    ],
    "description": "High-quality mobiles from Realme. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Realme",
    "category": "Mobiles",
    "price": 103238,
    "countInStock": 78,
    "isFeatured": false,
    "rating": 3.6,
    "numReviews": 98
  },
  {
    "name": "Acer Electronics 651",
    "image": "https://picsum.photos/seed/340/800/800",
    "images": [
      "https://picsum.photos/seed/340/800/800",
      "https://picsum.photos/seed/341/800/800",
      "https://picsum.photos/seed/342/800/800",
      "https://picsum.photos/seed/343/800/800",
      "https://picsum.photos/seed/344/800/800"
    ],
    "description": "High-quality electronics from Acer. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Acer",
    "category": "Electronics",
    "price": 150178,
    "countInStock": 85,
    "isFeatured": false,
    "rating": 4.4,
    "numReviews": 428
  },
  {
    "name": "Biba Fashion 7",
    "image": "https://picsum.photos/seed/345/800/800",
    "images": [
      "https://picsum.photos/seed/345/800/800",
      "https://picsum.photos/seed/346/800/800",
      "https://picsum.photos/seed/347/800/800",
      "https://picsum.photos/seed/348/800/800",
      "https://picsum.photos/seed/349/800/800"
    ],
    "description": "High-quality fashion from Biba. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Biba",
    "category": "Fashion",
    "price": 8096,
    "countInStock": 65,
    "isFeatured": true,
    "rating": 4.6,
    "numReviews": 411
  },
  {
    "name": "Godrej Interio Home & Furniture 784",
    "image": "https://picsum.photos/seed/350/800/800",
    "images": [
      "https://picsum.photos/seed/350/800/800",
      "https://picsum.photos/seed/351/800/800",
      "https://picsum.photos/seed/352/800/800",
      "https://picsum.photos/seed/353/800/800",
      "https://picsum.photos/seed/354/800/800"
    ],
    "description": "High-quality home & furniture from Godrej Interio. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Godrej Interio",
    "category": "Home & Furniture",
    "price": 22312,
    "countInStock": 96,
    "isFeatured": false,
    "rating": 3.5,
    "numReviews": 415
  },
  {
    "name": "Prestige Appliances 652",
    "image": "https://picsum.photos/seed/355/800/800",
    "images": [
      "https://picsum.photos/seed/355/800/800",
      "https://picsum.photos/seed/356/800/800",
      "https://picsum.photos/seed/357/800/800",
      "https://picsum.photos/seed/358/800/800",
      "https://picsum.photos/seed/359/800/800"
    ],
    "description": "High-quality appliances from Prestige. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Prestige",
    "category": "Appliances",
    "price": 42287,
    "countInStock": 71,
    "isFeatured": false,
    "rating": 3.8,
    "numReviews": 209
  },
  {
    "name": "Reliance Grocery 679",
    "image": "https://picsum.photos/seed/360/800/800",
    "images": [
      "https://picsum.photos/seed/360/800/800",
      "https://picsum.photos/seed/361/800/800",
      "https://picsum.photos/seed/362/800/800",
      "https://picsum.photos/seed/363/800/800",
      "https://picsum.photos/seed/364/800/800"
    ],
    "description": "High-quality grocery from Reliance. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Reliance",
    "category": "Grocery",
    "price": 2669,
    "countInStock": 84,
    "isFeatured": false,
    "rating": 4.4,
    "numReviews": 302
  },
  {
    "name": "Lakme Beauty 205",
    "image": "https://picsum.photos/seed/365/800/800",
    "images": [
      "https://picsum.photos/seed/365/800/800",
      "https://picsum.photos/seed/366/800/800",
      "https://picsum.photos/seed/367/800/800",
      "https://picsum.photos/seed/368/800/800",
      "https://picsum.photos/seed/369/800/800"
    ],
    "description": "High-quality beauty from Lakme. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Lakme",
    "category": "Beauty",
    "price": 1447,
    "countInStock": 34,
    "isFeatured": false,
    "rating": 3.3,
    "numReviews": 777
  },
  {
    "name": "Apple Wearables 935",
    "image": "https://picsum.photos/seed/370/800/800",
    "images": [
      "https://picsum.photos/seed/370/800/800",
      "https://picsum.photos/seed/371/800/800",
      "https://picsum.photos/seed/372/800/800",
      "https://picsum.photos/seed/373/800/800",
      "https://picsum.photos/seed/374/800/800"
    ],
    "description": "High-quality wearables from Apple. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Apple",
    "category": "Wearables",
    "price": 41468,
    "countInStock": 47,
    "isFeatured": false,
    "rating": 4.1,
    "numReviews": 913
  },
  {
    "name": "Samsonite Travel 23",
    "image": "https://picsum.photos/seed/375/800/800",
    "images": [
      "https://picsum.photos/seed/375/800/800",
      "https://picsum.photos/seed/376/800/800",
      "https://picsum.photos/seed/377/800/800",
      "https://picsum.photos/seed/378/800/800",
      "https://picsum.photos/seed/379/800/800"
    ],
    "description": "High-quality travel from Samsonite. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Samsonite",
    "category": "Travel",
    "price": 2902,
    "countInStock": 19,
    "isFeatured": true,
    "rating": 3.5,
    "numReviews": 243
  },
  {
    "name": "Cosco Sports 997",
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
    "price": 25712,
    "countInStock": 11,
    "isFeatured": false,
    "rating": 4,
    "numReviews": 552
  },
  {
    "name": "Oxford Books 16",
    "image": "https://picsum.photos/seed/385/800/800",
    "images": [
      "https://picsum.photos/seed/385/800/800",
      "https://picsum.photos/seed/386/800/800",
      "https://picsum.photos/seed/387/800/800",
      "https://picsum.photos/seed/388/800/800",
      "https://picsum.photos/seed/389/800/800"
    ],
    "description": "High-quality books from Oxford. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Oxford",
    "category": "Books",
    "price": 1043,
    "countInStock": 84,
    "isFeatured": false,
    "rating": 3,
    "numReviews": 694
  },
  {
    "name": "Vivo Mobiles 276",
    "image": "https://picsum.photos/seed/390/800/800",
    "images": [
      "https://picsum.photos/seed/390/800/800",
      "https://picsum.photos/seed/391/800/800",
      "https://picsum.photos/seed/392/800/800",
      "https://picsum.photos/seed/393/800/800",
      "https://picsum.photos/seed/394/800/800"
    ],
    "description": "High-quality mobiles from Vivo. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Vivo",
    "category": "Mobiles",
    "price": 94667,
    "countInStock": 13,
    "isFeatured": false,
    "rating": 3.9,
    "numReviews": 179
  },
  {
    "name": "Acer Electronics 289",
    "image": "https://picsum.photos/seed/395/800/800",
    "images": [
      "https://picsum.photos/seed/395/800/800",
      "https://picsum.photos/seed/396/800/800",
      "https://picsum.photos/seed/397/800/800",
      "https://picsum.photos/seed/398/800/800",
      "https://picsum.photos/seed/399/800/800"
    ],
    "description": "High-quality electronics from Acer. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Acer",
    "category": "Electronics",
    "price": 162440,
    "countInStock": 4,
    "isFeatured": false,
    "rating": 4.7,
    "numReviews": 301
  },
  {
    "name": "Adidas Fashion 92",
    "image": "https://picsum.photos/seed/400/800/800",
    "images": [
      "https://picsum.photos/seed/400/800/800",
      "https://picsum.photos/seed/401/800/800",
      "https://picsum.photos/seed/402/800/800",
      "https://picsum.photos/seed/403/800/800",
      "https://picsum.photos/seed/404/800/800"
    ],
    "description": "High-quality fashion from Adidas. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Adidas",
    "category": "Fashion",
    "price": 7450,
    "countInStock": 29,
    "isFeatured": false,
    "rating": 4.8,
    "numReviews": 679
  },
  {
    "name": "Godrej Interio Home & Furniture 860",
    "image": "https://picsum.photos/seed/405/800/800",
    "images": [
      "https://picsum.photos/seed/405/800/800",
      "https://picsum.photos/seed/406/800/800",
      "https://picsum.photos/seed/407/800/800",
      "https://picsum.photos/seed/408/800/800",
      "https://picsum.photos/seed/409/800/800"
    ],
    "description": "High-quality home & furniture from Godrej Interio. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Godrej Interio",
    "category": "Home & Furniture",
    "price": 13195,
    "countInStock": 23,
    "isFeatured": false,
    "rating": 4.2,
    "numReviews": 956
  },
  {
    "name": "Samsung Appliances 962",
    "image": "https://picsum.photos/seed/410/800/800",
    "images": [
      "https://picsum.photos/seed/410/800/800",
      "https://picsum.photos/seed/411/800/800",
      "https://picsum.photos/seed/412/800/800",
      "https://picsum.photos/seed/413/800/800",
      "https://picsum.photos/seed/414/800/800"
    ],
    "description": "High-quality appliances from Samsung. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Samsung",
    "category": "Appliances",
    "price": 14393,
    "countInStock": 39,
    "isFeatured": true,
    "rating": 3.8,
    "numReviews": 322
  },
  {
    "name": "Amul Grocery 145",
    "image": "https://picsum.photos/seed/415/800/800",
    "images": [
      "https://picsum.photos/seed/415/800/800",
      "https://picsum.photos/seed/416/800/800",
      "https://picsum.photos/seed/417/800/800",
      "https://picsum.photos/seed/418/800/800",
      "https://picsum.photos/seed/419/800/800"
    ],
    "description": "High-quality grocery from Amul. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Amul",
    "category": "Grocery",
    "price": 1156,
    "countInStock": 36,
    "isFeatured": false,
    "rating": 3.7,
    "numReviews": 772
  },
  {
    "name": "Clinique Beauty 275",
    "image": "https://picsum.photos/seed/420/800/800",
    "images": [
      "https://picsum.photos/seed/420/800/800",
      "https://picsum.photos/seed/421/800/800",
      "https://picsum.photos/seed/422/800/800",
      "https://picsum.photos/seed/423/800/800",
      "https://picsum.photos/seed/424/800/800"
    ],
    "description": "High-quality beauty from Clinique. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Clinique",
    "category": "Beauty",
    "price": 514,
    "countInStock": 52,
    "isFeatured": true,
    "rating": 4.4,
    "numReviews": 912
  },
  {
    "name": "Noise Wearables 77",
    "image": "https://picsum.photos/seed/425/800/800",
    "images": [
      "https://picsum.photos/seed/425/800/800",
      "https://picsum.photos/seed/426/800/800",
      "https://picsum.photos/seed/427/800/800",
      "https://picsum.photos/seed/428/800/800",
      "https://picsum.photos/seed/429/800/800"
    ],
    "description": "High-quality wearables from Noise. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Noise",
    "category": "Wearables",
    "price": 19116,
    "countInStock": 67,
    "isFeatured": false,
    "rating": 4.3,
    "numReviews": 128
  },
  {
    "name": "American Tourister Travel 173",
    "image": "https://picsum.photos/seed/430/800/800",
    "images": [
      "https://picsum.photos/seed/430/800/800",
      "https://picsum.photos/seed/431/800/800",
      "https://picsum.photos/seed/432/800/800",
      "https://picsum.photos/seed/433/800/800",
      "https://picsum.photos/seed/434/800/800"
    ],
    "description": "High-quality travel from American Tourister. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "American Tourister",
    "category": "Travel",
    "price": 7415,
    "countInStock": 75,
    "isFeatured": true,
    "rating": 3.5,
    "numReviews": 339
  },
  {
    "name": "Spalding Sports 840",
    "image": "https://picsum.photos/seed/435/800/800",
    "images": [
      "https://picsum.photos/seed/435/800/800",
      "https://picsum.photos/seed/436/800/800",
      "https://picsum.photos/seed/437/800/800",
      "https://picsum.photos/seed/438/800/800",
      "https://picsum.photos/seed/439/800/800"
    ],
    "description": "High-quality sports from Spalding. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Spalding",
    "category": "Sports",
    "price": 14495,
    "countInStock": 70,
    "isFeatured": true,
    "rating": 5,
    "numReviews": 860
  },
  {
    "name": "Penguin Books 79",
    "image": "https://picsum.photos/seed/440/800/800",
    "images": [
      "https://picsum.photos/seed/440/800/800",
      "https://picsum.photos/seed/441/800/800",
      "https://picsum.photos/seed/442/800/800",
      "https://picsum.photos/seed/443/800/800",
      "https://picsum.photos/seed/444/800/800"
    ],
    "description": "High-quality books from Penguin. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Penguin",
    "category": "Books",
    "price": 1632,
    "countInStock": 13,
    "isFeatured": true,
    "rating": 3.6,
    "numReviews": 82
  },
  {
    "name": "Apple Mobiles 79",
    "image": "https://picsum.photos/seed/445/800/800",
    "images": [
      "https://picsum.photos/seed/445/800/800",
      "https://picsum.photos/seed/446/800/800",
      "https://picsum.photos/seed/447/800/800",
      "https://picsum.photos/seed/448/800/800",
      "https://picsum.photos/seed/449/800/800"
    ],
    "description": "High-quality mobiles from Apple. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Apple",
    "category": "Mobiles",
    "price": 34473,
    "countInStock": 88,
    "isFeatured": false,
    "rating": 3.3,
    "numReviews": 753
  },
  {
    "name": "Acer Electronics 547",
    "image": "https://picsum.photos/seed/450/800/800",
    "images": [
      "https://picsum.photos/seed/450/800/800",
      "https://picsum.photos/seed/451/800/800",
      "https://picsum.photos/seed/452/800/800",
      "https://picsum.photos/seed/453/800/800",
      "https://picsum.photos/seed/454/800/800"
    ],
    "description": "High-quality electronics from Acer. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Acer",
    "category": "Electronics",
    "price": 137431,
    "countInStock": 26,
    "isFeatured": false,
    "rating": 3.2,
    "numReviews": 693
  },
  {
    "name": "Allen Solly Fashion 822",
    "image": "https://picsum.photos/seed/455/800/800",
    "images": [
      "https://picsum.photos/seed/455/800/800",
      "https://picsum.photos/seed/456/800/800",
      "https://picsum.photos/seed/457/800/800",
      "https://picsum.photos/seed/458/800/800",
      "https://picsum.photos/seed/459/800/800"
    ],
    "description": "High-quality fashion from Allen Solly. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Allen Solly",
    "category": "Fashion",
    "price": 3018,
    "countInStock": 28,
    "isFeatured": true,
    "rating": 3.5,
    "numReviews": 402
  },
  {
    "name": "Urban Ladder Home & Furniture 320",
    "image": "https://picsum.photos/seed/460/800/800",
    "images": [
      "https://picsum.photos/seed/460/800/800",
      "https://picsum.photos/seed/461/800/800",
      "https://picsum.photos/seed/462/800/800",
      "https://picsum.photos/seed/463/800/800",
      "https://picsum.photos/seed/464/800/800"
    ],
    "description": "High-quality home & furniture from Urban Ladder. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Urban Ladder",
    "category": "Home & Furniture",
    "price": 29273,
    "countInStock": 33,
    "isFeatured": false,
    "rating": 3.2,
    "numReviews": 81
  },
  {
    "name": "Havells Appliances 80",
    "image": "https://picsum.photos/seed/465/800/800",
    "images": [
      "https://picsum.photos/seed/465/800/800",
      "https://picsum.photos/seed/466/800/800",
      "https://picsum.photos/seed/467/800/800",
      "https://picsum.photos/seed/468/800/800",
      "https://picsum.photos/seed/469/800/800"
    ],
    "description": "High-quality appliances from Havells. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Havells",
    "category": "Appliances",
    "price": 36879,
    "countInStock": 32,
    "isFeatured": false,
    "rating": 4.1,
    "numReviews": 888
  },
  {
    "name": "Organic India Grocery 859",
    "image": "https://picsum.photos/seed/470/800/800",
    "images": [
      "https://picsum.photos/seed/470/800/800",
      "https://picsum.photos/seed/471/800/800",
      "https://picsum.photos/seed/472/800/800",
      "https://picsum.photos/seed/473/800/800",
      "https://picsum.photos/seed/474/800/800"
    ],
    "description": "High-quality grocery from Organic India. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Organic India",
    "category": "Grocery",
    "price": 4721,
    "countInStock": 36,
    "isFeatured": true,
    "rating": 3.6,
    "numReviews": 801
  },
  {
    "name": "Neutrogena Beauty 420",
    "image": "https://picsum.photos/seed/475/800/800",
    "images": [
      "https://picsum.photos/seed/475/800/800",
      "https://picsum.photos/seed/476/800/800",
      "https://picsum.photos/seed/477/800/800",
      "https://picsum.photos/seed/478/800/800",
      "https://picsum.photos/seed/479/800/800"
    ],
    "description": "High-quality beauty from Neutrogena. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Neutrogena",
    "category": "Beauty",
    "price": 3795,
    "countInStock": 56,
    "isFeatured": false,
    "rating": 4.9,
    "numReviews": 178
  },
  {
    "name": "Samsung Wearables 833",
    "image": "https://picsum.photos/seed/480/800/800",
    "images": [
      "https://picsum.photos/seed/480/800/800",
      "https://picsum.photos/seed/481/800/800",
      "https://picsum.photos/seed/482/800/800",
      "https://picsum.photos/seed/483/800/800",
      "https://picsum.photos/seed/484/800/800"
    ],
    "description": "High-quality wearables from Samsung. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Samsung",
    "category": "Wearables",
    "price": 15921,
    "countInStock": 22,
    "isFeatured": true,
    "rating": 4.4,
    "numReviews": 206
  },
  {
    "name": "Wildcraft Travel 500",
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
    "price": 20590,
    "countInStock": 13,
    "isFeatured": false,
    "rating": 4.3,
    "numReviews": 285
  },
  {
    "name": "Cosco Sports 240",
    "image": "https://picsum.photos/seed/490/800/800",
    "images": [
      "https://picsum.photos/seed/490/800/800",
      "https://picsum.photos/seed/491/800/800",
      "https://picsum.photos/seed/492/800/800",
      "https://picsum.photos/seed/493/800/800",
      "https://picsum.photos/seed/494/800/800"
    ],
    "description": "High-quality sports from Cosco. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Cosco",
    "category": "Sports",
    "price": 12867,
    "countInStock": 40,
    "isFeatured": false,
    "rating": 4.3,
    "numReviews": 310
  },
  {
    "name": "Rupa Books 595",
    "image": "https://picsum.photos/seed/495/800/800",
    "images": [
      "https://picsum.photos/seed/495/800/800",
      "https://picsum.photos/seed/496/800/800",
      "https://picsum.photos/seed/497/800/800",
      "https://picsum.photos/seed/498/800/800",
      "https://picsum.photos/seed/499/800/800"
    ],
    "description": "High-quality books from Rupa. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Rupa",
    "category": "Books",
    "price": 883,
    "countInStock": 68,
    "isFeatured": false,
    "rating": 4.5,
    "numReviews": 295
  },
  {
    "name": "Xiaomi Mobiles 956",
    "image": "https://picsum.photos/seed/500/800/800",
    "images": [
      "https://picsum.photos/seed/500/800/800",
      "https://picsum.photos/seed/501/800/800",
      "https://picsum.photos/seed/502/800/800",
      "https://picsum.photos/seed/503/800/800",
      "https://picsum.photos/seed/504/800/800"
    ],
    "description": "High-quality mobiles from Xiaomi. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Xiaomi",
    "category": "Mobiles",
    "price": 85921,
    "countInStock": 93,
    "isFeatured": false,
    "rating": 3.4,
    "numReviews": 516
  },
  {
    "name": "LG Electronics 211",
    "image": "https://picsum.photos/seed/505/800/800",
    "images": [
      "https://picsum.photos/seed/505/800/800",
      "https://picsum.photos/seed/506/800/800",
      "https://picsum.photos/seed/507/800/800",
      "https://picsum.photos/seed/508/800/800",
      "https://picsum.photos/seed/509/800/800"
    ],
    "description": "High-quality electronics from LG. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "LG",
    "category": "Electronics",
    "price": 137261,
    "countInStock": 49,
    "isFeatured": false,
    "rating": 4.8,
    "numReviews": 594
  },
  {
    "name": "H&M Fashion 49",
    "image": "https://picsum.photos/seed/510/800/800",
    "images": [
      "https://picsum.photos/seed/510/800/800",
      "https://picsum.photos/seed/511/800/800",
      "https://picsum.photos/seed/512/800/800",
      "https://picsum.photos/seed/513/800/800",
      "https://picsum.photos/seed/514/800/800"
    ],
    "description": "High-quality fashion from H&M. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "H&M",
    "category": "Fashion",
    "price": 2135,
    "countInStock": 29,
    "isFeatured": true,
    "rating": 5,
    "numReviews": 281
  },
  {
    "name": "Duroflex Home & Furniture 548",
    "image": "https://picsum.photos/seed/515/800/800",
    "images": [
      "https://picsum.photos/seed/515/800/800",
      "https://picsum.photos/seed/516/800/800",
      "https://picsum.photos/seed/517/800/800",
      "https://picsum.photos/seed/518/800/800",
      "https://picsum.photos/seed/519/800/800"
    ],
    "description": "High-quality home & furniture from Duroflex. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Duroflex",
    "category": "Home & Furniture",
    "price": 44095,
    "countInStock": 64,
    "isFeatured": false,
    "rating": 3.4,
    "numReviews": 176
  },
  {
    "name": "Daikin Appliances 878",
    "image": "https://picsum.photos/seed/520/800/800",
    "images": [
      "https://picsum.photos/seed/520/800/800",
      "https://picsum.photos/seed/521/800/800",
      "https://picsum.photos/seed/522/800/800",
      "https://picsum.photos/seed/523/800/800",
      "https://picsum.photos/seed/524/800/800"
    ],
    "description": "High-quality appliances from Daikin. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Daikin",
    "category": "Appliances",
    "price": 25762,
    "countInStock": 41,
    "isFeatured": false,
    "rating": 3.3,
    "numReviews": 211
  },
  {
    "name": "Amul Grocery 3",
    "image": "https://picsum.photos/seed/525/800/800",
    "images": [
      "https://picsum.photos/seed/525/800/800",
      "https://picsum.photos/seed/526/800/800",
      "https://picsum.photos/seed/527/800/800",
      "https://picsum.photos/seed/528/800/800",
      "https://picsum.photos/seed/529/800/800"
    ],
    "description": "High-quality grocery from Amul. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Amul",
    "category": "Grocery",
    "price": 4497,
    "countInStock": 21,
    "isFeatured": false,
    "rating": 3.5,
    "numReviews": 346
  },
  {
    "name": "Maybelline Beauty 970",
    "image": "https://picsum.photos/seed/530/800/800",
    "images": [
      "https://picsum.photos/seed/530/800/800",
      "https://picsum.photos/seed/531/800/800",
      "https://picsum.photos/seed/532/800/800",
      "https://picsum.photos/seed/533/800/800",
      "https://picsum.photos/seed/534/800/800"
    ],
    "description": "High-quality beauty from Maybelline. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Maybelline",
    "category": "Beauty",
    "price": 629,
    "countInStock": 43,
    "isFeatured": false,
    "rating": 4,
    "numReviews": 158
  },
  {
    "name": "Samsung Wearables 337",
    "image": "https://picsum.photos/seed/535/800/800",
    "images": [
      "https://picsum.photos/seed/535/800/800",
      "https://picsum.photos/seed/536/800/800",
      "https://picsum.photos/seed/537/800/800",
      "https://picsum.photos/seed/538/800/800",
      "https://picsum.photos/seed/539/800/800"
    ],
    "description": "High-quality wearables from Samsung. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Samsung",
    "category": "Wearables",
    "price": 20544,
    "countInStock": 33,
    "isFeatured": false,
    "rating": 4.8,
    "numReviews": 289
  },
  {
    "name": "VIP Travel 728",
    "image": "https://picsum.photos/seed/540/800/800",
    "images": [
      "https://picsum.photos/seed/540/800/800",
      "https://picsum.photos/seed/541/800/800",
      "https://picsum.photos/seed/542/800/800",
      "https://picsum.photos/seed/543/800/800",
      "https://picsum.photos/seed/544/800/800"
    ],
    "description": "High-quality travel from VIP. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "VIP",
    "category": "Travel",
    "price": 2635,
    "countInStock": 81,
    "isFeatured": false,
    "rating": 3.4,
    "numReviews": 355
  },
  {
    "name": "Powermax Sports 820",
    "image": "https://picsum.photos/seed/545/800/800",
    "images": [
      "https://picsum.photos/seed/545/800/800",
      "https://picsum.photos/seed/546/800/800",
      "https://picsum.photos/seed/547/800/800",
      "https://picsum.photos/seed/548/800/800",
      "https://picsum.photos/seed/549/800/800"
    ],
    "description": "High-quality sports from Powermax. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Powermax",
    "category": "Sports",
    "price": 40113,
    "countInStock": 55,
    "isFeatured": false,
    "rating": 4.1,
    "numReviews": 414
  },
  {
    "name": "Oxford Books 319",
    "image": "https://picsum.photos/seed/550/800/800",
    "images": [
      "https://picsum.photos/seed/550/800/800",
      "https://picsum.photos/seed/551/800/800",
      "https://picsum.photos/seed/552/800/800",
      "https://picsum.photos/seed/553/800/800",
      "https://picsum.photos/seed/554/800/800"
    ],
    "description": "High-quality books from Oxford. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Oxford",
    "category": "Books",
    "price": 497,
    "countInStock": 17,
    "isFeatured": false,
    "rating": 4.8,
    "numReviews": 498
  },
  {
    "name": "Xiaomi Mobiles 54",
    "image": "https://picsum.photos/seed/555/800/800",
    "images": [
      "https://picsum.photos/seed/555/800/800",
      "https://picsum.photos/seed/556/800/800",
      "https://picsum.photos/seed/557/800/800",
      "https://picsum.photos/seed/558/800/800",
      "https://picsum.photos/seed/559/800/800"
    ],
    "description": "High-quality mobiles from Xiaomi. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Xiaomi",
    "category": "Mobiles",
    "price": 84786,
    "countInStock": 44,
    "isFeatured": false,
    "rating": 3.2,
    "numReviews": 709
  },
  {
    "name": "Acer Electronics 612",
    "image": "https://picsum.photos/seed/560/800/800",
    "images": [
      "https://picsum.photos/seed/560/800/800",
      "https://picsum.photos/seed/561/800/800",
      "https://picsum.photos/seed/562/800/800",
      "https://picsum.photos/seed/563/800/800",
      "https://picsum.photos/seed/564/800/800"
    ],
    "description": "High-quality electronics from Acer. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Acer",
    "category": "Electronics",
    "price": 127873,
    "countInStock": 94,
    "isFeatured": false,
    "rating": 3.3,
    "numReviews": 748
  },
  {
    "name": "Levis Fashion 726",
    "image": "https://picsum.photos/seed/565/800/800",
    "images": [
      "https://picsum.photos/seed/565/800/800",
      "https://picsum.photos/seed/566/800/800",
      "https://picsum.photos/seed/567/800/800",
      "https://picsum.photos/seed/568/800/800",
      "https://picsum.photos/seed/569/800/800"
    ],
    "description": "High-quality fashion from Levis. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Levis",
    "category": "Fashion",
    "price": 2483,
    "countInStock": 28,
    "isFeatured": true,
    "rating": 3.7,
    "numReviews": 577
  },
  {
    "name": "Duroflex Home & Furniture 294",
    "image": "https://picsum.photos/seed/570/800/800",
    "images": [
      "https://picsum.photos/seed/570/800/800",
      "https://picsum.photos/seed/571/800/800",
      "https://picsum.photos/seed/572/800/800",
      "https://picsum.photos/seed/573/800/800",
      "https://picsum.photos/seed/574/800/800"
    ],
    "description": "High-quality home & furniture from Duroflex. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Duroflex",
    "category": "Home & Furniture",
    "price": 45307,
    "countInStock": 70,
    "isFeatured": true,
    "rating": 3.1,
    "numReviews": 416
  },
  {
    "name": "Prestige Appliances 245",
    "image": "https://picsum.photos/seed/575/800/800",
    "images": [
      "https://picsum.photos/seed/575/800/800",
      "https://picsum.photos/seed/576/800/800",
      "https://picsum.photos/seed/577/800/800",
      "https://picsum.photos/seed/578/800/800",
      "https://picsum.photos/seed/579/800/800"
    ],
    "description": "High-quality appliances from Prestige. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Prestige",
    "category": "Appliances",
    "price": 22031,
    "countInStock": 34,
    "isFeatured": false,
    "rating": 3.5,
    "numReviews": 867
  },
  {
    "name": "Dabur Grocery 671",
    "image": "https://picsum.photos/seed/580/800/800",
    "images": [
      "https://picsum.photos/seed/580/800/800",
      "https://picsum.photos/seed/581/800/800",
      "https://picsum.photos/seed/582/800/800",
      "https://picsum.photos/seed/583/800/800",
      "https://picsum.photos/seed/584/800/800"
    ],
    "description": "High-quality grocery from Dabur. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Dabur",
    "category": "Grocery",
    "price": 3138,
    "countInStock": 79,
    "isFeatured": true,
    "rating": 4,
    "numReviews": 127
  },
  {
    "name": "Lakme Beauty 282",
    "image": "https://picsum.photos/seed/585/800/800",
    "images": [
      "https://picsum.photos/seed/585/800/800",
      "https://picsum.photos/seed/586/800/800",
      "https://picsum.photos/seed/587/800/800",
      "https://picsum.photos/seed/588/800/800",
      "https://picsum.photos/seed/589/800/800"
    ],
    "description": "High-quality beauty from Lakme. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Lakme",
    "category": "Beauty",
    "price": 419,
    "countInStock": 86,
    "isFeatured": false,
    "rating": 3.7,
    "numReviews": 73
  },
  {
    "name": "Fitbit Wearables 839",
    "image": "https://picsum.photos/seed/590/800/800",
    "images": [
      "https://picsum.photos/seed/590/800/800",
      "https://picsum.photos/seed/591/800/800",
      "https://picsum.photos/seed/592/800/800",
      "https://picsum.photos/seed/593/800/800",
      "https://picsum.photos/seed/594/800/800"
    ],
    "description": "High-quality wearables from Fitbit. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Fitbit",
    "category": "Wearables",
    "price": 21699,
    "countInStock": 64,
    "isFeatured": true,
    "rating": 3.7,
    "numReviews": 882
  },
  {
    "name": "VIP Travel 188",
    "image": "https://picsum.photos/seed/595/800/800",
    "images": [
      "https://picsum.photos/seed/595/800/800",
      "https://picsum.photos/seed/596/800/800",
      "https://picsum.photos/seed/597/800/800",
      "https://picsum.photos/seed/598/800/800",
      "https://picsum.photos/seed/599/800/800"
    ],
    "description": "High-quality travel from VIP. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "VIP",
    "category": "Travel",
    "price": 2995,
    "countInStock": 92,
    "isFeatured": false,
    "rating": 4,
    "numReviews": 305
  },
  {
    "name": "Decathlon Sports 928",
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
    "price": 3587,
    "countInStock": 54,
    "isFeatured": false,
    "rating": 3.2,
    "numReviews": 26
  },
  {
    "name": "Scholastic Books 990",
    "image": "https://picsum.photos/seed/605/800/800",
    "images": [
      "https://picsum.photos/seed/605/800/800",
      "https://picsum.photos/seed/606/800/800",
      "https://picsum.photos/seed/607/800/800",
      "https://picsum.photos/seed/608/800/800",
      "https://picsum.photos/seed/609/800/800"
    ],
    "description": "High-quality books from Scholastic. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Scholastic",
    "category": "Books",
    "price": 439,
    "countInStock": 30,
    "isFeatured": false,
    "rating": 4.5,
    "numReviews": 166
  },
  {
    "name": "Samsung Mobiles 708",
    "image": "https://picsum.photos/seed/610/800/800",
    "images": [
      "https://picsum.photos/seed/610/800/800",
      "https://picsum.photos/seed/611/800/800",
      "https://picsum.photos/seed/612/800/800",
      "https://picsum.photos/seed/613/800/800",
      "https://picsum.photos/seed/614/800/800"
    ],
    "description": "High-quality mobiles from Samsung. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Samsung",
    "category": "Mobiles",
    "price": 82543,
    "countInStock": 50,
    "isFeatured": false,
    "rating": 4.2,
    "numReviews": 865
  },
  {
    "name": "HP Electronics 854",
    "image": "https://picsum.photos/seed/615/800/800",
    "images": [
      "https://picsum.photos/seed/615/800/800",
      "https://picsum.photos/seed/616/800/800",
      "https://picsum.photos/seed/617/800/800",
      "https://picsum.photos/seed/618/800/800",
      "https://picsum.photos/seed/619/800/800"
    ],
    "description": "High-quality electronics from HP. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "HP",
    "category": "Electronics",
    "price": 108492,
    "countInStock": 1,
    "isFeatured": false,
    "rating": 3.5,
    "numReviews": 542
  },
  {
    "name": "Puma Fashion 950",
    "image": "https://picsum.photos/seed/620/800/800",
    "images": [
      "https://picsum.photos/seed/620/800/800",
      "https://picsum.photos/seed/621/800/800",
      "https://picsum.photos/seed/622/800/800",
      "https://picsum.photos/seed/623/800/800",
      "https://picsum.photos/seed/624/800/800"
    ],
    "description": "High-quality fashion from Puma. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Puma",
    "category": "Fashion",
    "price": 9201,
    "countInStock": 50,
    "isFeatured": false,
    "rating": 5,
    "numReviews": 38
  },
  {
    "name": "Sleepwell Home & Furniture 734",
    "image": "https://picsum.photos/seed/625/800/800",
    "images": [
      "https://picsum.photos/seed/625/800/800",
      "https://picsum.photos/seed/626/800/800",
      "https://picsum.photos/seed/627/800/800",
      "https://picsum.photos/seed/628/800/800",
      "https://picsum.photos/seed/629/800/800"
    ],
    "description": "High-quality home & furniture from Sleepwell. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Sleepwell",
    "category": "Home & Furniture",
    "price": 28740,
    "countInStock": 4,
    "isFeatured": false,
    "rating": 3.8,
    "numReviews": 731
  },
  {
    "name": "Bajaj Appliances 64",
    "image": "https://picsum.photos/seed/630/800/800",
    "images": [
      "https://picsum.photos/seed/630/800/800",
      "https://picsum.photos/seed/631/800/800",
      "https://picsum.photos/seed/632/800/800",
      "https://picsum.photos/seed/633/800/800",
      "https://picsum.photos/seed/634/800/800"
    ],
    "description": "High-quality appliances from Bajaj. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Bajaj",
    "category": "Appliances",
    "price": 15109,
    "countInStock": 68,
    "isFeatured": true,
    "rating": 4.7,
    "numReviews": 728
  },
  {
    "name": "Nestle Grocery 360",
    "image": "https://picsum.photos/seed/635/800/800",
    "images": [
      "https://picsum.photos/seed/635/800/800",
      "https://picsum.photos/seed/636/800/800",
      "https://picsum.photos/seed/637/800/800",
      "https://picsum.photos/seed/638/800/800",
      "https://picsum.photos/seed/639/800/800"
    ],
    "description": "High-quality grocery from Nestle. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Nestle",
    "category": "Grocery",
    "price": 4359,
    "countInStock": 57,
    "isFeatured": false,
    "rating": 3.1,
    "numReviews": 230
  },
  {
    "name": "Estee Lauder Beauty 908",
    "image": "https://picsum.photos/seed/640/800/800",
    "images": [
      "https://picsum.photos/seed/640/800/800",
      "https://picsum.photos/seed/641/800/800",
      "https://picsum.photos/seed/642/800/800",
      "https://picsum.photos/seed/643/800/800",
      "https://picsum.photos/seed/644/800/800"
    ],
    "description": "High-quality beauty from Estee Lauder. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Estee Lauder",
    "category": "Beauty",
    "price": 4205,
    "countInStock": 95,
    "isFeatured": false,
    "rating": 3.7,
    "numReviews": 276
  },
  {
    "name": "boAt Wearables 8",
    "image": "https://picsum.photos/seed/645/800/800",
    "images": [
      "https://picsum.photos/seed/645/800/800",
      "https://picsum.photos/seed/646/800/800",
      "https://picsum.photos/seed/647/800/800",
      "https://picsum.photos/seed/648/800/800",
      "https://picsum.photos/seed/649/800/800"
    ],
    "description": "High-quality wearables from boAt. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "boAt",
    "category": "Wearables",
    "price": 29555,
    "countInStock": 81,
    "isFeatured": true,
    "rating": 3.6,
    "numReviews": 723
  },
  {
    "name": "Mocobara Travel 233",
    "image": "https://picsum.photos/seed/650/800/800",
    "images": [
      "https://picsum.photos/seed/650/800/800",
      "https://picsum.photos/seed/651/800/800",
      "https://picsum.photos/seed/652/800/800",
      "https://picsum.photos/seed/653/800/800",
      "https://picsum.photos/seed/654/800/800"
    ],
    "description": "High-quality travel from Mocobara. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Mocobara",
    "category": "Travel",
    "price": 3764,
    "countInStock": 38,
    "isFeatured": false,
    "rating": 3.1,
    "numReviews": 191
  },
  {
    "name": "Decathlon Sports 870",
    "image": "https://picsum.photos/seed/655/800/800",
    "images": [
      "https://picsum.photos/seed/655/800/800",
      "https://picsum.photos/seed/656/800/800",
      "https://picsum.photos/seed/657/800/800",
      "https://picsum.photos/seed/658/800/800",
      "https://picsum.photos/seed/659/800/800"
    ],
    "description": "High-quality sports from Decathlon. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Decathlon",
    "category": "Sports",
    "price": 37953,
    "countInStock": 76,
    "isFeatured": false,
    "rating": 4.4,
    "numReviews": 828
  },
  {
    "name": "Oxford Books 277",
    "image": "https://picsum.photos/seed/660/800/800",
    "images": [
      "https://picsum.photos/seed/660/800/800",
      "https://picsum.photos/seed/661/800/800",
      "https://picsum.photos/seed/662/800/800",
      "https://picsum.photos/seed/663/800/800",
      "https://picsum.photos/seed/664/800/800"
    ],
    "description": "High-quality books from Oxford. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Oxford",
    "category": "Books",
    "price": 2012,
    "countInStock": 66,
    "isFeatured": false,
    "rating": 4.9,
    "numReviews": 181
  },
  {
    "name": "Samsung Mobiles 606",
    "image": "https://picsum.photos/seed/665/800/800",
    "images": [
      "https://picsum.photos/seed/665/800/800",
      "https://picsum.photos/seed/666/800/800",
      "https://picsum.photos/seed/667/800/800",
      "https://picsum.photos/seed/668/800/800",
      "https://picsum.photos/seed/669/800/800"
    ],
    "description": "High-quality mobiles from Samsung. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Samsung",
    "category": "Mobiles",
    "price": 119116,
    "countInStock": 78,
    "isFeatured": true,
    "rating": 4.3,
    "numReviews": 67
  },
  {
    "name": "Acer Electronics 955",
    "image": "https://picsum.photos/seed/670/800/800",
    "images": [
      "https://picsum.photos/seed/670/800/800",
      "https://picsum.photos/seed/671/800/800",
      "https://picsum.photos/seed/672/800/800",
      "https://picsum.photos/seed/673/800/800",
      "https://picsum.photos/seed/674/800/800"
    ],
    "description": "High-quality electronics from Acer. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Acer",
    "category": "Electronics",
    "price": 24791,
    "countInStock": 93,
    "isFeatured": true,
    "rating": 3.8,
    "numReviews": 673
  },
  {
    "name": "H&M Fashion 651",
    "image": "https://picsum.photos/seed/675/800/800",
    "images": [
      "https://picsum.photos/seed/675/800/800",
      "https://picsum.photos/seed/676/800/800",
      "https://picsum.photos/seed/677/800/800",
      "https://picsum.photos/seed/678/800/800",
      "https://picsum.photos/seed/679/800/800"
    ],
    "description": "High-quality fashion from H&M. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "H&M",
    "category": "Fashion",
    "price": 9260,
    "countInStock": 73,
    "isFeatured": false,
    "rating": 3.4,
    "numReviews": 879
  },
  {
    "name": "Home Centre Home & Furniture 916",
    "image": "https://picsum.photos/seed/680/800/800",
    "images": [
      "https://picsum.photos/seed/680/800/800",
      "https://picsum.photos/seed/681/800/800",
      "https://picsum.photos/seed/682/800/800",
      "https://picsum.photos/seed/683/800/800",
      "https://picsum.photos/seed/684/800/800"
    ],
    "description": "High-quality home & furniture from Home Centre. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Home Centre",
    "category": "Home & Furniture",
    "price": 41676,
    "countInStock": 75,
    "isFeatured": true,
    "rating": 3.4,
    "numReviews": 80
  },
  {
    "name": "LG Appliances 265",
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
    "price": 39716,
    "countInStock": 70,
    "isFeatured": false,
    "rating": 4,
    "numReviews": 777
  },
  {
    "name": "Dabur Grocery 603",
    "image": "https://picsum.photos/seed/690/800/800",
    "images": [
      "https://picsum.photos/seed/690/800/800",
      "https://picsum.photos/seed/691/800/800",
      "https://picsum.photos/seed/692/800/800",
      "https://picsum.photos/seed/693/800/800",
      "https://picsum.photos/seed/694/800/800"
    ],
    "description": "High-quality grocery from Dabur. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Dabur",
    "category": "Grocery",
    "price": 2545,
    "countInStock": 81,
    "isFeatured": true,
    "rating": 3.9,
    "numReviews": 709
  },
  {
    "name": "Maybelline Beauty 294",
    "image": "https://picsum.photos/seed/695/800/800",
    "images": [
      "https://picsum.photos/seed/695/800/800",
      "https://picsum.photos/seed/696/800/800",
      "https://picsum.photos/seed/697/800/800",
      "https://picsum.photos/seed/698/800/800",
      "https://picsum.photos/seed/699/800/800"
    ],
    "description": "High-quality beauty from Maybelline. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Maybelline",
    "category": "Beauty",
    "price": 4425,
    "countInStock": 30,
    "isFeatured": false,
    "rating": 3.4,
    "numReviews": 220
  },
  {
    "name": "Fitbit Wearables 651",
    "image": "https://picsum.photos/seed/700/800/800",
    "images": [
      "https://picsum.photos/seed/700/800/800",
      "https://picsum.photos/seed/701/800/800",
      "https://picsum.photos/seed/702/800/800",
      "https://picsum.photos/seed/703/800/800",
      "https://picsum.photos/seed/704/800/800"
    ],
    "description": "High-quality wearables from Fitbit. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Fitbit",
    "category": "Wearables",
    "price": 13393,
    "countInStock": 82,
    "isFeatured": true,
    "rating": 3.4,
    "numReviews": 634
  },
  {
    "name": "American Tourister Travel 286",
    "image": "https://picsum.photos/seed/705/800/800",
    "images": [
      "https://picsum.photos/seed/705/800/800",
      "https://picsum.photos/seed/706/800/800",
      "https://picsum.photos/seed/707/800/800",
      "https://picsum.photos/seed/708/800/800",
      "https://picsum.photos/seed/709/800/800"
    ],
    "description": "High-quality travel from American Tourister. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "American Tourister",
    "category": "Travel",
    "price": 4441,
    "countInStock": 70,
    "isFeatured": false,
    "rating": 3.7,
    "numReviews": 158
  },
  {
    "name": "Wilson Sports 925",
    "image": "https://picsum.photos/seed/710/800/800",
    "images": [
      "https://picsum.photos/seed/710/800/800",
      "https://picsum.photos/seed/711/800/800",
      "https://picsum.photos/seed/712/800/800",
      "https://picsum.photos/seed/713/800/800",
      "https://picsum.photos/seed/714/800/800"
    ],
    "description": "High-quality sports from Wilson. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Wilson",
    "category": "Sports",
    "price": 10474,
    "countInStock": 54,
    "isFeatured": false,
    "rating": 4.2,
    "numReviews": 608
  },
  {
    "name": "Penguin Books 103",
    "image": "https://picsum.photos/seed/715/800/800",
    "images": [
      "https://picsum.photos/seed/715/800/800",
      "https://picsum.photos/seed/716/800/800",
      "https://picsum.photos/seed/717/800/800",
      "https://picsum.photos/seed/718/800/800",
      "https://picsum.photos/seed/719/800/800"
    ],
    "description": "High-quality books from Penguin. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Penguin",
    "category": "Books",
    "price": 2031,
    "countInStock": 38,
    "isFeatured": false,
    "rating": 3.6,
    "numReviews": 501
  },
  {
    "name": "Realme Mobiles 691",
    "image": "https://picsum.photos/seed/720/800/800",
    "images": [
      "https://picsum.photos/seed/720/800/800",
      "https://picsum.photos/seed/721/800/800",
      "https://picsum.photos/seed/722/800/800",
      "https://picsum.photos/seed/723/800/800",
      "https://picsum.photos/seed/724/800/800"
    ],
    "description": "High-quality mobiles from Realme. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Realme",
    "category": "Mobiles",
    "price": 37354,
    "countInStock": 68,
    "isFeatured": true,
    "rating": 4.7,
    "numReviews": 224
  },
  {
    "name": "Sony Electronics 433",
    "image": "https://picsum.photos/seed/725/800/800",
    "images": [
      "https://picsum.photos/seed/725/800/800",
      "https://picsum.photos/seed/726/800/800",
      "https://picsum.photos/seed/727/800/800",
      "https://picsum.photos/seed/728/800/800",
      "https://picsum.photos/seed/729/800/800"
    ],
    "description": "High-quality electronics from Sony. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Sony",
    "category": "Electronics",
    "price": 20630,
    "countInStock": 65,
    "isFeatured": false,
    "rating": 4,
    "numReviews": 240
  },
  {
    "name": "Allen Solly Fashion 995",
    "image": "https://picsum.photos/seed/730/800/800",
    "images": [
      "https://picsum.photos/seed/730/800/800",
      "https://picsum.photos/seed/731/800/800",
      "https://picsum.photos/seed/732/800/800",
      "https://picsum.photos/seed/733/800/800",
      "https://picsum.photos/seed/734/800/800"
    ],
    "description": "High-quality fashion from Allen Solly. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Allen Solly",
    "category": "Fashion",
    "price": 3284,
    "countInStock": 45,
    "isFeatured": false,
    "rating": 4.1,
    "numReviews": 697
  },
  {
    "name": "Home Centre Home & Furniture 734",
    "image": "https://picsum.photos/seed/735/800/800",
    "images": [
      "https://picsum.photos/seed/735/800/800",
      "https://picsum.photos/seed/736/800/800",
      "https://picsum.photos/seed/737/800/800",
      "https://picsum.photos/seed/738/800/800",
      "https://picsum.photos/seed/739/800/800"
    ],
    "description": "High-quality home & furniture from Home Centre. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Home Centre",
    "category": "Home & Furniture",
    "price": 13666,
    "countInStock": 96,
    "isFeatured": false,
    "rating": 4.5,
    "numReviews": 457
  },
  {
    "name": "Havells Appliances 728",
    "image": "https://picsum.photos/seed/740/800/800",
    "images": [
      "https://picsum.photos/seed/740/800/800",
      "https://picsum.photos/seed/741/800/800",
      "https://picsum.photos/seed/742/800/800",
      "https://picsum.photos/seed/743/800/800",
      "https://picsum.photos/seed/744/800/800"
    ],
    "description": "High-quality appliances from Havells. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Havells",
    "category": "Appliances",
    "price": 29617,
    "countInStock": 66,
    "isFeatured": false,
    "rating": 3.9,
    "numReviews": 913
  },
  {
    "name": "Amul Grocery 83",
    "image": "https://picsum.photos/seed/745/800/800",
    "images": [
      "https://picsum.photos/seed/745/800/800",
      "https://picsum.photos/seed/746/800/800",
      "https://picsum.photos/seed/747/800/800",
      "https://picsum.photos/seed/748/800/800",
      "https://picsum.photos/seed/749/800/800"
    ],
    "description": "High-quality grocery from Amul. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Amul",
    "category": "Grocery",
    "price": 1207,
    "countInStock": 70,
    "isFeatured": false,
    "rating": 4.9,
    "numReviews": 721
  },
  {
    "name": "Mamaearth Beauty 669",
    "image": "https://picsum.photos/seed/750/800/800",
    "images": [
      "https://picsum.photos/seed/750/800/800",
      "https://picsum.photos/seed/751/800/800",
      "https://picsum.photos/seed/752/800/800",
      "https://picsum.photos/seed/753/800/800",
      "https://picsum.photos/seed/754/800/800"
    ],
    "description": "High-quality beauty from Mamaearth. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Mamaearth",
    "category": "Beauty",
    "price": 2237,
    "countInStock": 9,
    "isFeatured": false,
    "rating": 3.7,
    "numReviews": 316
  },
  {
    "name": "boAt Wearables 472",
    "image": "https://picsum.photos/seed/755/800/800",
    "images": [
      "https://picsum.photos/seed/755/800/800",
      "https://picsum.photos/seed/756/800/800",
      "https://picsum.photos/seed/757/800/800",
      "https://picsum.photos/seed/758/800/800",
      "https://picsum.photos/seed/759/800/800"
    ],
    "description": "High-quality wearables from boAt. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "boAt",
    "category": "Wearables",
    "price": 6093,
    "countInStock": 48,
    "isFeatured": false,
    "rating": 3.2,
    "numReviews": 750
  },
  {
    "name": "Samsonite Travel 418",
    "image": "https://picsum.photos/seed/760/800/800",
    "images": [
      "https://picsum.photos/seed/760/800/800",
      "https://picsum.photos/seed/761/800/800",
      "https://picsum.photos/seed/762/800/800",
      "https://picsum.photos/seed/763/800/800",
      "https://picsum.photos/seed/764/800/800"
    ],
    "description": "High-quality travel from Samsonite. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Samsonite",
    "category": "Travel",
    "price": 18242,
    "countInStock": 39,
    "isFeatured": false,
    "rating": 4.3,
    "numReviews": 856
  },
  {
    "name": "Decathlon Sports 749",
    "image": "https://picsum.photos/seed/765/800/800",
    "images": [
      "https://picsum.photos/seed/765/800/800",
      "https://picsum.photos/seed/766/800/800",
      "https://picsum.photos/seed/767/800/800",
      "https://picsum.photos/seed/768/800/800",
      "https://picsum.photos/seed/769/800/800"
    ],
    "description": "High-quality sports from Decathlon. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Decathlon",
    "category": "Sports",
    "price": 5198,
    "countInStock": 23,
    "isFeatured": false,
    "rating": 3.2,
    "numReviews": 988
  },
  {
    "name": "Rupa Books 595",
    "image": "https://picsum.photos/seed/770/800/800",
    "images": [
      "https://picsum.photos/seed/770/800/800",
      "https://picsum.photos/seed/771/800/800",
      "https://picsum.photos/seed/772/800/800",
      "https://picsum.photos/seed/773/800/800",
      "https://picsum.photos/seed/774/800/800"
    ],
    "description": "High-quality books from Rupa. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Rupa",
    "category": "Books",
    "price": 1108,
    "countInStock": 47,
    "isFeatured": true,
    "rating": 4.4,
    "numReviews": 688
  },
  {
    "name": "Motorola Mobiles 927",
    "image": "https://picsum.photos/seed/775/800/800",
    "images": [
      "https://picsum.photos/seed/775/800/800",
      "https://picsum.photos/seed/776/800/800",
      "https://picsum.photos/seed/777/800/800",
      "https://picsum.photos/seed/778/800/800",
      "https://picsum.photos/seed/779/800/800"
    ],
    "description": "High-quality mobiles from Motorola. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Motorola",
    "category": "Mobiles",
    "price": 103572,
    "countInStock": 21,
    "isFeatured": false,
    "rating": 4.3,
    "numReviews": 601
  },
  {
    "name": "HP Electronics 801",
    "image": "https://picsum.photos/seed/780/800/800",
    "images": [
      "https://picsum.photos/seed/780/800/800",
      "https://picsum.photos/seed/781/800/800",
      "https://picsum.photos/seed/782/800/800",
      "https://picsum.photos/seed/783/800/800",
      "https://picsum.photos/seed/784/800/800"
    ],
    "description": "High-quality electronics from HP. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "HP",
    "category": "Electronics",
    "price": 30746,
    "countInStock": 82,
    "isFeatured": false,
    "rating": 4,
    "numReviews": 375
  },
  {
    "name": "Zara Fashion 843",
    "image": "https://picsum.photos/seed/785/800/800",
    "images": [
      "https://picsum.photos/seed/785/800/800",
      "https://picsum.photos/seed/786/800/800",
      "https://picsum.photos/seed/787/800/800",
      "https://picsum.photos/seed/788/800/800",
      "https://picsum.photos/seed/789/800/800"
    ],
    "description": "High-quality fashion from Zara. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Zara",
    "category": "Fashion",
    "price": 5695,
    "countInStock": 66,
    "isFeatured": true,
    "rating": 4.4,
    "numReviews": 335
  },
  {
    "name": "Urban Ladder Home & Furniture 911",
    "image": "https://picsum.photos/seed/790/800/800",
    "images": [
      "https://picsum.photos/seed/790/800/800",
      "https://picsum.photos/seed/791/800/800",
      "https://picsum.photos/seed/792/800/800",
      "https://picsum.photos/seed/793/800/800",
      "https://picsum.photos/seed/794/800/800"
    ],
    "description": "High-quality home & furniture from Urban Ladder. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Urban Ladder",
    "category": "Home & Furniture",
    "price": 3742,
    "countInStock": 28,
    "isFeatured": false,
    "rating": 4.6,
    "numReviews": 718
  },
  {
    "name": "LG Appliances 821",
    "image": "https://picsum.photos/seed/795/800/800",
    "images": [
      "https://picsum.photos/seed/795/800/800",
      "https://picsum.photos/seed/796/800/800",
      "https://picsum.photos/seed/797/800/800",
      "https://picsum.photos/seed/798/800/800",
      "https://picsum.photos/seed/799/800/800"
    ],
    "description": "High-quality appliances from LG. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "LG",
    "category": "Appliances",
    "price": 48646,
    "countInStock": 46,
    "isFeatured": false,
    "rating": 3.7,
    "numReviews": 406
  },
  {
    "name": "Organic India Grocery 96",
    "image": "https://picsum.photos/seed/800/800/800",
    "images": [
      "https://picsum.photos/seed/800/800/800",
      "https://picsum.photos/seed/801/800/800",
      "https://picsum.photos/seed/802/800/800",
      "https://picsum.photos/seed/803/800/800",
      "https://picsum.photos/seed/804/800/800"
    ],
    "description": "High-quality grocery from Organic India. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Organic India",
    "category": "Grocery",
    "price": 4231,
    "countInStock": 9,
    "isFeatured": true,
    "rating": 3.3,
    "numReviews": 337
  },
  {
    "name": "L Oreoal Beauty 276",
    "image": "https://picsum.photos/seed/805/800/800",
    "images": [
      "https://picsum.photos/seed/805/800/800",
      "https://picsum.photos/seed/806/800/800",
      "https://picsum.photos/seed/807/800/800",
      "https://picsum.photos/seed/808/800/800",
      "https://picsum.photos/seed/809/800/800"
    ],
    "description": "High-quality beauty from L Oreoal. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "L Oreoal",
    "category": "Beauty",
    "price": 2972,
    "countInStock": 85,
    "isFeatured": false,
    "rating": 3.3,
    "numReviews": 508
  },
  {
    "name": "Apple Wearables 49",
    "image": "https://picsum.photos/seed/810/800/800",
    "images": [
      "https://picsum.photos/seed/810/800/800",
      "https://picsum.photos/seed/811/800/800",
      "https://picsum.photos/seed/812/800/800",
      "https://picsum.photos/seed/813/800/800",
      "https://picsum.photos/seed/814/800/800"
    ],
    "description": "High-quality wearables from Apple. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Apple",
    "category": "Wearables",
    "price": 25220,
    "countInStock": 54,
    "isFeatured": false,
    "rating": 5,
    "numReviews": 406
  },
  {
    "name": "American Tourister Travel 949",
    "image": "https://picsum.photos/seed/815/800/800",
    "images": [
      "https://picsum.photos/seed/815/800/800",
      "https://picsum.photos/seed/816/800/800",
      "https://picsum.photos/seed/817/800/800",
      "https://picsum.photos/seed/818/800/800",
      "https://picsum.photos/seed/819/800/800"
    ],
    "description": "High-quality travel from American Tourister. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "American Tourister",
    "category": "Travel",
    "price": 8338,
    "countInStock": 37,
    "isFeatured": false,
    "rating": 3.9,
    "numReviews": 123
  },
  {
    "name": "Wilson Sports 619",
    "image": "https://picsum.photos/seed/820/800/800",
    "images": [
      "https://picsum.photos/seed/820/800/800",
      "https://picsum.photos/seed/821/800/800",
      "https://picsum.photos/seed/822/800/800",
      "https://picsum.photos/seed/823/800/800",
      "https://picsum.photos/seed/824/800/800"
    ],
    "description": "High-quality sports from Wilson. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Wilson",
    "category": "Sports",
    "price": 27029,
    "countInStock": 66,
    "isFeatured": false,
    "rating": 4.1,
    "numReviews": 964
  },
  {
    "name": "Oxford Books 932",
    "image": "https://picsum.photos/seed/825/800/800",
    "images": [
      "https://picsum.photos/seed/825/800/800",
      "https://picsum.photos/seed/826/800/800",
      "https://picsum.photos/seed/827/800/800",
      "https://picsum.photos/seed/828/800/800",
      "https://picsum.photos/seed/829/800/800"
    ],
    "description": "High-quality books from Oxford. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Oxford",
    "category": "Books",
    "price": 1468,
    "countInStock": 25,
    "isFeatured": false,
    "rating": 4.8,
    "numReviews": 645
  },
  {
    "name": "Vivo Mobiles 656",
    "image": "https://picsum.photos/seed/830/800/800",
    "images": [
      "https://picsum.photos/seed/830/800/800",
      "https://picsum.photos/seed/831/800/800",
      "https://picsum.photos/seed/832/800/800",
      "https://picsum.photos/seed/833/800/800",
      "https://picsum.photos/seed/834/800/800"
    ],
    "description": "High-quality mobiles from Vivo. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Vivo",
    "category": "Mobiles",
    "price": 95415,
    "countInStock": 61,
    "isFeatured": true,
    "rating": 4.7,
    "numReviews": 121
  },
  {
    "name": "Microsoft Electronics 817",
    "image": "https://picsum.photos/seed/835/800/800",
    "images": [
      "https://picsum.photos/seed/835/800/800",
      "https://picsum.photos/seed/836/800/800",
      "https://picsum.photos/seed/837/800/800",
      "https://picsum.photos/seed/838/800/800",
      "https://picsum.photos/seed/839/800/800"
    ],
    "description": "High-quality electronics from Microsoft. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Microsoft",
    "category": "Electronics",
    "price": 81480,
    "countInStock": 69,
    "isFeatured": false,
    "rating": 3.6,
    "numReviews": 634
  },
  {
    "name": "Puma Fashion 478",
    "image": "https://picsum.photos/seed/840/800/800",
    "images": [
      "https://picsum.photos/seed/840/800/800",
      "https://picsum.photos/seed/841/800/800",
      "https://picsum.photos/seed/842/800/800",
      "https://picsum.photos/seed/843/800/800",
      "https://picsum.photos/seed/844/800/800"
    ],
    "description": "High-quality fashion from Puma. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Puma",
    "category": "Fashion",
    "price": 10138,
    "countInStock": 38,
    "isFeatured": false,
    "rating": 3.3,
    "numReviews": 207
  },
  {
    "name": "Pepperfry Home & Furniture 202",
    "image": "https://picsum.photos/seed/845/800/800",
    "images": [
      "https://picsum.photos/seed/845/800/800",
      "https://picsum.photos/seed/846/800/800",
      "https://picsum.photos/seed/847/800/800",
      "https://picsum.photos/seed/848/800/800",
      "https://picsum.photos/seed/849/800/800"
    ],
    "description": "High-quality home & furniture from Pepperfry. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Pepperfry",
    "category": "Home & Furniture",
    "price": 44894,
    "countInStock": 85,
    "isFeatured": false,
    "rating": 3,
    "numReviews": 211
  },
  {
    "name": "Kent Appliances 317",
    "image": "https://picsum.photos/seed/850/800/800",
    "images": [
      "https://picsum.photos/seed/850/800/800",
      "https://picsum.photos/seed/851/800/800",
      "https://picsum.photos/seed/852/800/800",
      "https://picsum.photos/seed/853/800/800",
      "https://picsum.photos/seed/854/800/800"
    ],
    "description": "High-quality appliances from Kent. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Kent",
    "category": "Appliances",
    "price": 27495,
    "countInStock": 38,
    "isFeatured": false,
    "rating": 3.1,
    "numReviews": 449
  },
  {
    "name": "Tata Grocery 927",
    "image": "https://picsum.photos/seed/855/800/800",
    "images": [
      "https://picsum.photos/seed/855/800/800",
      "https://picsum.photos/seed/856/800/800",
      "https://picsum.photos/seed/857/800/800",
      "https://picsum.photos/seed/858/800/800",
      "https://picsum.photos/seed/859/800/800"
    ],
    "description": "High-quality grocery from Tata. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Tata",
    "category": "Grocery",
    "price": 1870,
    "countInStock": 89,
    "isFeatured": true,
    "rating": 3.4,
    "numReviews": 747
  },
  {
    "name": "Mamaearth Beauty 783",
    "image": "https://picsum.photos/seed/860/800/800",
    "images": [
      "https://picsum.photos/seed/860/800/800",
      "https://picsum.photos/seed/861/800/800",
      "https://picsum.photos/seed/862/800/800",
      "https://picsum.photos/seed/863/800/800",
      "https://picsum.photos/seed/864/800/800"
    ],
    "description": "High-quality beauty from Mamaearth. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Mamaearth",
    "category": "Beauty",
    "price": 540,
    "countInStock": 16,
    "isFeatured": false,
    "rating": 4.3,
    "numReviews": 335
  },
  {
    "name": "Samsung Wearables 87",
    "image": "https://picsum.photos/seed/865/800/800",
    "images": [
      "https://picsum.photos/seed/865/800/800",
      "https://picsum.photos/seed/866/800/800",
      "https://picsum.photos/seed/867/800/800",
      "https://picsum.photos/seed/868/800/800",
      "https://picsum.photos/seed/869/800/800"
    ],
    "description": "High-quality wearables from Samsung. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Samsung",
    "category": "Wearables",
    "price": 25130,
    "countInStock": 76,
    "isFeatured": true,
    "rating": 3.3,
    "numReviews": 796
  },
  {
    "name": "Skybags Travel 365",
    "image": "https://picsum.photos/seed/870/800/800",
    "images": [
      "https://picsum.photos/seed/870/800/800",
      "https://picsum.photos/seed/871/800/800",
      "https://picsum.photos/seed/872/800/800",
      "https://picsum.photos/seed/873/800/800",
      "https://picsum.photos/seed/874/800/800"
    ],
    "description": "High-quality travel from Skybags. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Skybags",
    "category": "Travel",
    "price": 12049,
    "countInStock": 92,
    "isFeatured": false,
    "rating": 3.7,
    "numReviews": 152
  },
  {
    "name": "Speedo Sports 524",
    "image": "https://picsum.photos/seed/875/800/800",
    "images": [
      "https://picsum.photos/seed/875/800/800",
      "https://picsum.photos/seed/876/800/800",
      "https://picsum.photos/seed/877/800/800",
      "https://picsum.photos/seed/878/800/800",
      "https://picsum.photos/seed/879/800/800"
    ],
    "description": "High-quality sports from Speedo. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Speedo",
    "category": "Sports",
    "price": 16764,
    "countInStock": 38,
    "isFeatured": false,
    "rating": 4.9,
    "numReviews": 560
  },
  {
    "name": "Pearson Books 251",
    "image": "https://picsum.photos/seed/880/800/800",
    "images": [
      "https://picsum.photos/seed/880/800/800",
      "https://picsum.photos/seed/881/800/800",
      "https://picsum.photos/seed/882/800/800",
      "https://picsum.photos/seed/883/800/800",
      "https://picsum.photos/seed/884/800/800"
    ],
    "description": "High-quality books from Pearson. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Pearson",
    "category": "Books",
    "price": 424,
    "countInStock": 57,
    "isFeatured": false,
    "rating": 3,
    "numReviews": 227
  },
  {
    "name": "Realme Mobiles 727",
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
    "price": 65314,
    "countInStock": 32,
    "isFeatured": false,
    "rating": 3.5,
    "numReviews": 677
  },
  {
    "name": "HP Electronics 779",
    "image": "https://picsum.photos/seed/890/800/800",
    "images": [
      "https://picsum.photos/seed/890/800/800",
      "https://picsum.photos/seed/891/800/800",
      "https://picsum.photos/seed/892/800/800",
      "https://picsum.photos/seed/893/800/800",
      "https://picsum.photos/seed/894/800/800"
    ],
    "description": "High-quality electronics from HP. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "HP",
    "category": "Electronics",
    "price": 104177,
    "countInStock": 67,
    "isFeatured": false,
    "rating": 3.7,
    "numReviews": 577
  },
  {
    "name": "Adidas Fashion 336",
    "image": "https://picsum.photos/seed/895/800/800",
    "images": [
      "https://picsum.photos/seed/895/800/800",
      "https://picsum.photos/seed/896/800/800",
      "https://picsum.photos/seed/897/800/800",
      "https://picsum.photos/seed/898/800/800",
      "https://picsum.photos/seed/899/800/800"
    ],
    "description": "High-quality fashion from Adidas. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Adidas",
    "category": "Fashion",
    "price": 2177,
    "countInStock": 6,
    "isFeatured": false,
    "rating": 3.9,
    "numReviews": 428
  },
  {
    "name": "IKEA Home & Furniture 401",
    "image": "https://picsum.photos/seed/900/800/800",
    "images": [
      "https://picsum.photos/seed/900/800/800",
      "https://picsum.photos/seed/901/800/800",
      "https://picsum.photos/seed/902/800/800",
      "https://picsum.photos/seed/903/800/800",
      "https://picsum.photos/seed/904/800/800"
    ],
    "description": "High-quality home & furniture from IKEA. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "IKEA",
    "category": "Home & Furniture",
    "price": 5301,
    "countInStock": 32,
    "isFeatured": false,
    "rating": 3.6,
    "numReviews": 261
  },
  {
    "name": "Havells Appliances 441",
    "image": "https://picsum.photos/seed/905/800/800",
    "images": [
      "https://picsum.photos/seed/905/800/800",
      "https://picsum.photos/seed/906/800/800",
      "https://picsum.photos/seed/907/800/800",
      "https://picsum.photos/seed/908/800/800",
      "https://picsum.photos/seed/909/800/800"
    ],
    "description": "High-quality appliances from Havells. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Havells",
    "category": "Appliances",
    "price": 31794,
    "countInStock": 22,
    "isFeatured": false,
    "rating": 3.2,
    "numReviews": 454
  },
  {
    "name": "Organic India Grocery 771",
    "image": "https://picsum.photos/seed/910/800/800",
    "images": [
      "https://picsum.photos/seed/910/800/800",
      "https://picsum.photos/seed/911/800/800",
      "https://picsum.photos/seed/912/800/800",
      "https://picsum.photos/seed/913/800/800",
      "https://picsum.photos/seed/914/800/800"
    ],
    "description": "High-quality grocery from Organic India. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Organic India",
    "category": "Grocery",
    "price": 2395,
    "countInStock": 73,
    "isFeatured": false,
    "rating": 4.2,
    "numReviews": 255
  },
  {
    "name": "Clinique Beauty 699",
    "image": "https://picsum.photos/seed/915/800/800",
    "images": [
      "https://picsum.photos/seed/915/800/800",
      "https://picsum.photos/seed/916/800/800",
      "https://picsum.photos/seed/917/800/800",
      "https://picsum.photos/seed/918/800/800",
      "https://picsum.photos/seed/919/800/800"
    ],
    "description": "High-quality beauty from Clinique. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Clinique",
    "category": "Beauty",
    "price": 3584,
    "countInStock": 20,
    "isFeatured": false,
    "rating": 4.3,
    "numReviews": 538
  },
  {
    "name": "Amazfit Wearables 322",
    "image": "https://picsum.photos/seed/920/800/800",
    "images": [
      "https://picsum.photos/seed/920/800/800",
      "https://picsum.photos/seed/921/800/800",
      "https://picsum.photos/seed/922/800/800",
      "https://picsum.photos/seed/923/800/800",
      "https://picsum.photos/seed/924/800/800"
    ],
    "description": "High-quality wearables from Amazfit. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Amazfit",
    "category": "Wearables",
    "price": 18632,
    "countInStock": 63,
    "isFeatured": false,
    "rating": 4.2,
    "numReviews": 216
  },
  {
    "name": "Mocobara Travel 232",
    "image": "https://picsum.photos/seed/925/800/800",
    "images": [
      "https://picsum.photos/seed/925/800/800",
      "https://picsum.photos/seed/926/800/800",
      "https://picsum.photos/seed/927/800/800",
      "https://picsum.photos/seed/928/800/800",
      "https://picsum.photos/seed/929/800/800"
    ],
    "description": "High-quality travel from Mocobara. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Mocobara",
    "category": "Travel",
    "price": 6821,
    "countInStock": 94,
    "isFeatured": false,
    "rating": 3.8,
    "numReviews": 205
  },
  {
    "name": "Powermax Sports 960",
    "image": "https://picsum.photos/seed/930/800/800",
    "images": [
      "https://picsum.photos/seed/930/800/800",
      "https://picsum.photos/seed/931/800/800",
      "https://picsum.photos/seed/932/800/800",
      "https://picsum.photos/seed/933/800/800",
      "https://picsum.photos/seed/934/800/800"
    ],
    "description": "High-quality sports from Powermax. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Powermax",
    "category": "Sports",
    "price": 29550,
    "countInStock": 95,
    "isFeatured": false,
    "rating": 4,
    "numReviews": 7
  },
  {
    "name": "Westland Books 796",
    "image": "https://picsum.photos/seed/935/800/800",
    "images": [
      "https://picsum.photos/seed/935/800/800",
      "https://picsum.photos/seed/936/800/800",
      "https://picsum.photos/seed/937/800/800",
      "https://picsum.photos/seed/938/800/800",
      "https://picsum.photos/seed/939/800/800"
    ],
    "description": "High-quality books from Westland. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Westland",
    "category": "Books",
    "price": 382,
    "countInStock": 9,
    "isFeatured": false,
    "rating": 4,
    "numReviews": 162
  },
  {
    "name": "Motorola Mobiles 843",
    "image": "https://picsum.photos/seed/940/800/800",
    "images": [
      "https://picsum.photos/seed/940/800/800",
      "https://picsum.photos/seed/941/800/800",
      "https://picsum.photos/seed/942/800/800",
      "https://picsum.photos/seed/943/800/800",
      "https://picsum.photos/seed/944/800/800"
    ],
    "description": "High-quality mobiles from Motorola. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Motorola",
    "category": "Mobiles",
    "price": 62507,
    "countInStock": 78,
    "isFeatured": false,
    "rating": 4.3,
    "numReviews": 761
  },
  {
    "name": "MSI Electronics 313",
    "image": "https://picsum.photos/seed/945/800/800",
    "images": [
      "https://picsum.photos/seed/945/800/800",
      "https://picsum.photos/seed/946/800/800",
      "https://picsum.photos/seed/947/800/800",
      "https://picsum.photos/seed/948/800/800",
      "https://picsum.photos/seed/949/800/800"
    ],
    "description": "High-quality electronics from MSI. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "MSI",
    "category": "Electronics",
    "price": 166048,
    "countInStock": 91,
    "isFeatured": false,
    "rating": 4.7,
    "numReviews": 588
  },
  {
    "name": "Allen Solly Fashion 896",
    "image": "https://picsum.photos/seed/950/800/800",
    "images": [
      "https://picsum.photos/seed/950/800/800",
      "https://picsum.photos/seed/951/800/800",
      "https://picsum.photos/seed/952/800/800",
      "https://picsum.photos/seed/953/800/800",
      "https://picsum.photos/seed/954/800/800"
    ],
    "description": "High-quality fashion from Allen Solly. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Allen Solly",
    "category": "Fashion",
    "price": 4889,
    "countInStock": 24,
    "isFeatured": false,
    "rating": 3.5,
    "numReviews": 286
  },
  {
    "name": "IKEA Home & Furniture 753",
    "image": "https://picsum.photos/seed/955/800/800",
    "images": [
      "https://picsum.photos/seed/955/800/800",
      "https://picsum.photos/seed/956/800/800",
      "https://picsum.photos/seed/957/800/800",
      "https://picsum.photos/seed/958/800/800",
      "https://picsum.photos/seed/959/800/800"
    ],
    "description": "High-quality home & furniture from IKEA. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "IKEA",
    "category": "Home & Furniture",
    "price": 38063,
    "countInStock": 36,
    "isFeatured": false,
    "rating": 4.3,
    "numReviews": 452
  },
  {
    "name": "Kent Appliances 225",
    "image": "https://picsum.photos/seed/960/800/800",
    "images": [
      "https://picsum.photos/seed/960/800/800",
      "https://picsum.photos/seed/961/800/800",
      "https://picsum.photos/seed/962/800/800",
      "https://picsum.photos/seed/963/800/800",
      "https://picsum.photos/seed/964/800/800"
    ],
    "description": "High-quality appliances from Kent. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Kent",
    "category": "Appliances",
    "price": 40822,
    "countInStock": 72,
    "isFeatured": false,
    "rating": 3.4,
    "numReviews": 82
  },
  {
    "name": "Nestle Grocery 970",
    "image": "https://picsum.photos/seed/965/800/800",
    "images": [
      "https://picsum.photos/seed/965/800/800",
      "https://picsum.photos/seed/966/800/800",
      "https://picsum.photos/seed/967/800/800",
      "https://picsum.photos/seed/968/800/800",
      "https://picsum.photos/seed/969/800/800"
    ],
    "description": "High-quality grocery from Nestle. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Nestle",
    "category": "Grocery",
    "price": 3835,
    "countInStock": 71,
    "isFeatured": true,
    "rating": 4.9,
    "numReviews": 922
  },
  {
    "name": "MAC Beauty 646",
    "image": "https://picsum.photos/seed/970/800/800",
    "images": [
      "https://picsum.photos/seed/970/800/800",
      "https://picsum.photos/seed/971/800/800",
      "https://picsum.photos/seed/972/800/800",
      "https://picsum.photos/seed/973/800/800",
      "https://picsum.photos/seed/974/800/800"
    ],
    "description": "High-quality beauty from MAC. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "MAC",
    "category": "Beauty",
    "price": 1419,
    "countInStock": 87,
    "isFeatured": true,
    "rating": 3.4,
    "numReviews": 701
  },
  {
    "name": "Fitbit Wearables 777",
    "image": "https://picsum.photos/seed/975/800/800",
    "images": [
      "https://picsum.photos/seed/975/800/800",
      "https://picsum.photos/seed/976/800/800",
      "https://picsum.photos/seed/977/800/800",
      "https://picsum.photos/seed/978/800/800",
      "https://picsum.photos/seed/979/800/800"
    ],
    "description": "High-quality wearables from Fitbit. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Fitbit",
    "category": "Wearables",
    "price": 32214,
    "countInStock": 27,
    "isFeatured": false,
    "rating": 3.6,
    "numReviews": 870
  },
  {
    "name": "Mocobara Travel 662",
    "image": "https://picsum.photos/seed/980/800/800",
    "images": [
      "https://picsum.photos/seed/980/800/800",
      "https://picsum.photos/seed/981/800/800",
      "https://picsum.photos/seed/982/800/800",
      "https://picsum.photos/seed/983/800/800",
      "https://picsum.photos/seed/984/800/800"
    ],
    "description": "High-quality travel from Mocobara. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Mocobara",
    "category": "Travel",
    "price": 9041,
    "countInStock": 42,
    "isFeatured": false,
    "rating": 3.1,
    "numReviews": 155
  },
  {
    "name": "Spalding Sports 57",
    "image": "https://picsum.photos/seed/985/800/800",
    "images": [
      "https://picsum.photos/seed/985/800/800",
      "https://picsum.photos/seed/986/800/800",
      "https://picsum.photos/seed/987/800/800",
      "https://picsum.photos/seed/988/800/800",
      "https://picsum.photos/seed/989/800/800"
    ],
    "description": "High-quality sports from Spalding. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Spalding",
    "category": "Sports",
    "price": 33341,
    "countInStock": 23,
    "isFeatured": false,
    "rating": 4.8,
    "numReviews": 247
  },
  {
    "name": "Oxford Books 554",
    "image": "https://picsum.photos/seed/990/800/800",
    "images": [
      "https://picsum.photos/seed/990/800/800",
      "https://picsum.photos/seed/991/800/800",
      "https://picsum.photos/seed/992/800/800",
      "https://picsum.photos/seed/993/800/800",
      "https://picsum.photos/seed/994/800/800"
    ],
    "description": "High-quality books from Oxford. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Oxford",
    "category": "Books",
    "price": 1929,
    "countInStock": 91,
    "isFeatured": false,
    "rating": 3.5,
    "numReviews": 516
  },
  {
    "name": "Google Mobiles 229",
    "image": "https://picsum.photos/seed/995/800/800",
    "images": [
      "https://picsum.photos/seed/995/800/800",
      "https://picsum.photos/seed/996/800/800",
      "https://picsum.photos/seed/997/800/800",
      "https://picsum.photos/seed/998/800/800",
      "https://picsum.photos/seed/999/800/800"
    ],
    "description": "High-quality mobiles from Google. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Google",
    "category": "Mobiles",
    "price": 60079,
    "countInStock": 30,
    "isFeatured": false,
    "rating": 4.4,
    "numReviews": 856
  },
  {
    "name": "Acer Electronics 265",
    "image": "https://picsum.photos/seed/1000/800/800",
    "images": [
      "https://picsum.photos/seed/1000/800/800",
      "https://picsum.photos/seed/1001/800/800",
      "https://picsum.photos/seed/1002/800/800",
      "https://picsum.photos/seed/1003/800/800",
      "https://picsum.photos/seed/1004/800/800"
    ],
    "description": "High-quality electronics from Acer. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Acer",
    "category": "Electronics",
    "price": 33544,
    "countInStock": 67,
    "isFeatured": true,
    "rating": 4.9,
    "numReviews": 107
  },
  {
    "name": "Nike Fashion 148",
    "image": "https://picsum.photos/seed/1005/800/800",
    "images": [
      "https://picsum.photos/seed/1005/800/800",
      "https://picsum.photos/seed/1006/800/800",
      "https://picsum.photos/seed/1007/800/800",
      "https://picsum.photos/seed/1008/800/800",
      "https://picsum.photos/seed/1009/800/800"
    ],
    "description": "High-quality fashion from Nike. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Nike",
    "category": "Fashion",
    "price": 9450,
    "countInStock": 10,
    "isFeatured": true,
    "rating": 3.9,
    "numReviews": 789
  },
  {
    "name": "Pepperfry Home & Furniture 613",
    "image": "https://picsum.photos/seed/1010/800/800",
    "images": [
      "https://picsum.photos/seed/1010/800/800",
      "https://picsum.photos/seed/1011/800/800",
      "https://picsum.photos/seed/1012/800/800",
      "https://picsum.photos/seed/1013/800/800",
      "https://picsum.photos/seed/1014/800/800"
    ],
    "description": "High-quality home & furniture from Pepperfry. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Pepperfry",
    "category": "Home & Furniture",
    "price": 24042,
    "countInStock": 11,
    "isFeatured": true,
    "rating": 3.6,
    "numReviews": 105
  },
  {
    "name": "Daikin Appliances 278",
    "image": "https://picsum.photos/seed/1015/800/800",
    "images": [
      "https://picsum.photos/seed/1015/800/800",
      "https://picsum.photos/seed/1016/800/800",
      "https://picsum.photos/seed/1017/800/800",
      "https://picsum.photos/seed/1018/800/800",
      "https://picsum.photos/seed/1019/800/800"
    ],
    "description": "High-quality appliances from Daikin. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Daikin",
    "category": "Appliances",
    "price": 30650,
    "countInStock": 89,
    "isFeatured": false,
    "rating": 3.7,
    "numReviews": 898
  },
  {
    "name": "Hindustan Unilever Grocery 695",
    "image": "https://picsum.photos/seed/1020/800/800",
    "images": [
      "https://picsum.photos/seed/1020/800/800",
      "https://picsum.photos/seed/1021/800/800",
      "https://picsum.photos/seed/1022/800/800",
      "https://picsum.photos/seed/1023/800/800",
      "https://picsum.photos/seed/1024/800/800"
    ],
    "description": "High-quality grocery from Hindustan Unilever. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Hindustan Unilever",
    "category": "Grocery",
    "price": 700,
    "countInStock": 94,
    "isFeatured": false,
    "rating": 3.4,
    "numReviews": 838
  },
  {
    "name": "MAC Beauty 876",
    "image": "https://picsum.photos/seed/1025/800/800",
    "images": [
      "https://picsum.photos/seed/1025/800/800",
      "https://picsum.photos/seed/1026/800/800",
      "https://picsum.photos/seed/1027/800/800",
      "https://picsum.photos/seed/1028/800/800",
      "https://picsum.photos/seed/1029/800/800"
    ],
    "description": "High-quality beauty from MAC. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "MAC",
    "category": "Beauty",
    "price": 3794,
    "countInStock": 54,
    "isFeatured": false,
    "rating": 4.6,
    "numReviews": 172
  },
  {
    "name": "Samsung Wearables 982",
    "image": "https://picsum.photos/seed/1030/800/800",
    "images": [
      "https://picsum.photos/seed/1030/800/800",
      "https://picsum.photos/seed/1031/800/800",
      "https://picsum.photos/seed/1032/800/800",
      "https://picsum.photos/seed/1033/800/800",
      "https://picsum.photos/seed/1034/800/800"
    ],
    "description": "High-quality wearables from Samsung. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Samsung",
    "category": "Wearables",
    "price": 28098,
    "countInStock": 51,
    "isFeatured": false,
    "rating": 4.8,
    "numReviews": 297
  },
  {
    "name": "Wildcraft Travel 488",
    "image": "https://picsum.photos/seed/1035/800/800",
    "images": [
      "https://picsum.photos/seed/1035/800/800",
      "https://picsum.photos/seed/1036/800/800",
      "https://picsum.photos/seed/1037/800/800",
      "https://picsum.photos/seed/1038/800/800",
      "https://picsum.photos/seed/1039/800/800"
    ],
    "description": "High-quality travel from Wildcraft. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Wildcraft",
    "category": "Travel",
    "price": 8651,
    "countInStock": 71,
    "isFeatured": false,
    "rating": 3.6,
    "numReviews": 834
  },
  {
    "name": "Speedo Sports 927",
    "image": "https://picsum.photos/seed/1040/800/800",
    "images": [
      "https://picsum.photos/seed/1040/800/800",
      "https://picsum.photos/seed/1041/800/800",
      "https://picsum.photos/seed/1042/800/800",
      "https://picsum.photos/seed/1043/800/800",
      "https://picsum.photos/seed/1044/800/800"
    ],
    "description": "High-quality sports from Speedo. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Speedo",
    "category": "Sports",
    "price": 7251,
    "countInStock": 40,
    "isFeatured": false,
    "rating": 4.5,
    "numReviews": 99
  },
  {
    "name": "Oxford Books 657",
    "image": "https://picsum.photos/seed/1045/800/800",
    "images": [
      "https://picsum.photos/seed/1045/800/800",
      "https://picsum.photos/seed/1046/800/800",
      "https://picsum.photos/seed/1047/800/800",
      "https://picsum.photos/seed/1048/800/800",
      "https://picsum.photos/seed/1049/800/800"
    ],
    "description": "High-quality books from Oxford. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Oxford",
    "category": "Books",
    "price": 280,
    "countInStock": 75,
    "isFeatured": false,
    "rating": 3.9,
    "numReviews": 327
  },
  {
    "name": "OnePlus Mobiles 53",
    "image": "https://picsum.photos/seed/1050/800/800",
    "images": [
      "https://picsum.photos/seed/1050/800/800",
      "https://picsum.photos/seed/1051/800/800",
      "https://picsum.photos/seed/1052/800/800",
      "https://picsum.photos/seed/1053/800/800",
      "https://picsum.photos/seed/1054/800/800"
    ],
    "description": "High-quality mobiles from OnePlus. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "OnePlus",
    "category": "Mobiles",
    "price": 97778,
    "countInStock": 41,
    "isFeatured": false,
    "rating": 3.7,
    "numReviews": 946
  },
  {
    "name": "Lenovo Electronics 210",
    "image": "https://picsum.photos/seed/1055/800/800",
    "images": [
      "https://picsum.photos/seed/1055/800/800",
      "https://picsum.photos/seed/1056/800/800",
      "https://picsum.photos/seed/1057/800/800",
      "https://picsum.photos/seed/1058/800/800",
      "https://picsum.photos/seed/1059/800/800"
    ],
    "description": "High-quality electronics from Lenovo. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Lenovo",
    "category": "Electronics",
    "price": 97625,
    "countInStock": 77,
    "isFeatured": true,
    "rating": 3.4,
    "numReviews": 195
  },
  {
    "name": "Nike Fashion 831",
    "image": "https://picsum.photos/seed/1060/800/800",
    "images": [
      "https://picsum.photos/seed/1060/800/800",
      "https://picsum.photos/seed/1061/800/800",
      "https://picsum.photos/seed/1062/800/800",
      "https://picsum.photos/seed/1063/800/800",
      "https://picsum.photos/seed/1064/800/800"
    ],
    "description": "High-quality fashion from Nike. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Nike",
    "category": "Fashion",
    "price": 8826,
    "countInStock": 52,
    "isFeatured": false,
    "rating": 4.7,
    "numReviews": 45
  },
  {
    "name": "Sleepwell Home & Furniture 716",
    "image": "https://picsum.photos/seed/1065/800/800",
    "images": [
      "https://picsum.photos/seed/1065/800/800",
      "https://picsum.photos/seed/1066/800/800",
      "https://picsum.photos/seed/1067/800/800",
      "https://picsum.photos/seed/1068/800/800",
      "https://picsum.photos/seed/1069/800/800"
    ],
    "description": "High-quality home & furniture from Sleepwell. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Sleepwell",
    "category": "Home & Furniture",
    "price": 7882,
    "countInStock": 68,
    "isFeatured": false,
    "rating": 3.2,
    "numReviews": 61
  },
  {
    "name": "Prestige Appliances 818",
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
    "price": 51181,
    "countInStock": 7,
    "isFeatured": true,
    "rating": 5,
    "numReviews": 568
  },
  {
    "name": "Nestle Grocery 505",
    "image": "https://picsum.photos/seed/1075/800/800",
    "images": [
      "https://picsum.photos/seed/1075/800/800",
      "https://picsum.photos/seed/1076/800/800",
      "https://picsum.photos/seed/1077/800/800",
      "https://picsum.photos/seed/1078/800/800",
      "https://picsum.photos/seed/1079/800/800"
    ],
    "description": "High-quality grocery from Nestle. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Nestle",
    "category": "Grocery",
    "price": 4984,
    "countInStock": 85,
    "isFeatured": true,
    "rating": 4.7,
    "numReviews": 553
  },
  {
    "name": "Maybelline Beauty 614",
    "image": "https://picsum.photos/seed/1080/800/800",
    "images": [
      "https://picsum.photos/seed/1080/800/800",
      "https://picsum.photos/seed/1081/800/800",
      "https://picsum.photos/seed/1082/800/800",
      "https://picsum.photos/seed/1083/800/800",
      "https://picsum.photos/seed/1084/800/800"
    ],
    "description": "High-quality beauty from Maybelline. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Maybelline",
    "category": "Beauty",
    "price": 422,
    "countInStock": 38,
    "isFeatured": false,
    "rating": 3,
    "numReviews": 715
  },
  {
    "name": "Noise Wearables 369",
    "image": "https://picsum.photos/seed/1085/800/800",
    "images": [
      "https://picsum.photos/seed/1085/800/800",
      "https://picsum.photos/seed/1086/800/800",
      "https://picsum.photos/seed/1087/800/800",
      "https://picsum.photos/seed/1088/800/800",
      "https://picsum.photos/seed/1089/800/800"
    ],
    "description": "High-quality wearables from Noise. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Noise",
    "category": "Wearables",
    "price": 37573,
    "countInStock": 97,
    "isFeatured": true,
    "rating": 4.3,
    "numReviews": 602
  },
  {
    "name": "Samsonite Travel 171",
    "image": "https://picsum.photos/seed/1090/800/800",
    "images": [
      "https://picsum.photos/seed/1090/800/800",
      "https://picsum.photos/seed/1091/800/800",
      "https://picsum.photos/seed/1092/800/800",
      "https://picsum.photos/seed/1093/800/800",
      "https://picsum.photos/seed/1094/800/800"
    ],
    "description": "High-quality travel from Samsonite. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Samsonite",
    "category": "Travel",
    "price": 17256,
    "countInStock": 26,
    "isFeatured": true,
    "rating": 4.8,
    "numReviews": 280
  },
  {
    "name": "Wilson Sports 762",
    "image": "https://picsum.photos/seed/1095/800/800",
    "images": [
      "https://picsum.photos/seed/1095/800/800",
      "https://picsum.photos/seed/1096/800/800",
      "https://picsum.photos/seed/1097/800/800",
      "https://picsum.photos/seed/1098/800/800",
      "https://picsum.photos/seed/1099/800/800"
    ],
    "description": "High-quality sports from Wilson. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Wilson",
    "category": "Sports",
    "price": 28479,
    "countInStock": 49,
    "isFeatured": true,
    "rating": 3.6,
    "numReviews": 902
  },
  {
    "name": "Pearson Books 9",
    "image": "https://picsum.photos/seed/1100/800/800",
    "images": [
      "https://picsum.photos/seed/1100/800/800",
      "https://picsum.photos/seed/1101/800/800",
      "https://picsum.photos/seed/1102/800/800",
      "https://picsum.photos/seed/1103/800/800",
      "https://picsum.photos/seed/1104/800/800"
    ],
    "description": "High-quality books from Pearson. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Pearson",
    "category": "Books",
    "price": 1943,
    "countInStock": 53,
    "isFeatured": true,
    "rating": 4,
    "numReviews": 583
  },
  {
    "name": "Realme Mobiles 661",
    "image": "https://picsum.photos/seed/1105/800/800",
    "images": [
      "https://picsum.photos/seed/1105/800/800",
      "https://picsum.photos/seed/1106/800/800",
      "https://picsum.photos/seed/1107/800/800",
      "https://picsum.photos/seed/1108/800/800",
      "https://picsum.photos/seed/1109/800/800"
    ],
    "description": "High-quality mobiles from Realme. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Realme",
    "category": "Mobiles",
    "price": 68743,
    "countInStock": 69,
    "isFeatured": false,
    "rating": 4.3,
    "numReviews": 264
  },
  {
    "name": "Acer Electronics 104",
    "image": "https://picsum.photos/seed/1110/800/800",
    "images": [
      "https://picsum.photos/seed/1110/800/800",
      "https://picsum.photos/seed/1111/800/800",
      "https://picsum.photos/seed/1112/800/800",
      "https://picsum.photos/seed/1113/800/800",
      "https://picsum.photos/seed/1114/800/800"
    ],
    "description": "High-quality electronics from Acer. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Acer",
    "category": "Electronics",
    "price": 136316,
    "countInStock": 85,
    "isFeatured": false,
    "rating": 3.3,
    "numReviews": 18
  },
  {
    "name": "Raymond Fashion 484",
    "image": "https://picsum.photos/seed/1115/800/800",
    "images": [
      "https://picsum.photos/seed/1115/800/800",
      "https://picsum.photos/seed/1116/800/800",
      "https://picsum.photos/seed/1117/800/800",
      "https://picsum.photos/seed/1118/800/800",
      "https://picsum.photos/seed/1119/800/800"
    ],
    "description": "High-quality fashion from Raymond. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Raymond",
    "category": "Fashion",
    "price": 4379,
    "countInStock": 66,
    "isFeatured": false,
    "rating": 4.3,
    "numReviews": 306
  },
  {
    "name": "Pepperfry Home & Furniture 542",
    "image": "https://picsum.photos/seed/1120/800/800",
    "images": [
      "https://picsum.photos/seed/1120/800/800",
      "https://picsum.photos/seed/1121/800/800",
      "https://picsum.photos/seed/1122/800/800",
      "https://picsum.photos/seed/1123/800/800",
      "https://picsum.photos/seed/1124/800/800"
    ],
    "description": "High-quality home & furniture from Pepperfry. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Pepperfry",
    "category": "Home & Furniture",
    "price": 40082,
    "countInStock": 72,
    "isFeatured": false,
    "rating": 4.2,
    "numReviews": 570
  },
  {
    "name": "LG Appliances 724",
    "image": "https://picsum.photos/seed/1125/800/800",
    "images": [
      "https://picsum.photos/seed/1125/800/800",
      "https://picsum.photos/seed/1126/800/800",
      "https://picsum.photos/seed/1127/800/800",
      "https://picsum.photos/seed/1128/800/800",
      "https://picsum.photos/seed/1129/800/800"
    ],
    "description": "High-quality appliances from LG. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "LG",
    "category": "Appliances",
    "price": 53432,
    "countInStock": 11,
    "isFeatured": false,
    "rating": 4.8,
    "numReviews": 895
  },
  {
    "name": "ITC Grocery 422",
    "image": "https://picsum.photos/seed/1130/800/800",
    "images": [
      "https://picsum.photos/seed/1130/800/800",
      "https://picsum.photos/seed/1131/800/800",
      "https://picsum.photos/seed/1132/800/800",
      "https://picsum.photos/seed/1133/800/800",
      "https://picsum.photos/seed/1134/800/800"
    ],
    "description": "High-quality grocery from ITC. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "ITC",
    "category": "Grocery",
    "price": 223,
    "countInStock": 32,
    "isFeatured": false,
    "rating": 3.8,
    "numReviews": 234
  },
  {
    "name": "Maybelline Beauty 179",
    "image": "https://picsum.photos/seed/1135/800/800",
    "images": [
      "https://picsum.photos/seed/1135/800/800",
      "https://picsum.photos/seed/1136/800/800",
      "https://picsum.photos/seed/1137/800/800",
      "https://picsum.photos/seed/1138/800/800",
      "https://picsum.photos/seed/1139/800/800"
    ],
    "description": "High-quality beauty from Maybelline. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Maybelline",
    "category": "Beauty",
    "price": 3457,
    "countInStock": 28,
    "isFeatured": false,
    "rating": 3.6,
    "numReviews": 811
  },
  {
    "name": "Garmin Wearables 404",
    "image": "https://picsum.photos/seed/1140/800/800",
    "images": [
      "https://picsum.photos/seed/1140/800/800",
      "https://picsum.photos/seed/1141/800/800",
      "https://picsum.photos/seed/1142/800/800",
      "https://picsum.photos/seed/1143/800/800",
      "https://picsum.photos/seed/1144/800/800"
    ],
    "description": "High-quality wearables from Garmin. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Garmin",
    "category": "Wearables",
    "price": 16598,
    "countInStock": 36,
    "isFeatured": false,
    "rating": 4.7,
    "numReviews": 793
  },
  {
    "name": "Safari Travel 990",
    "image": "https://picsum.photos/seed/1145/800/800",
    "images": [
      "https://picsum.photos/seed/1145/800/800",
      "https://picsum.photos/seed/1146/800/800",
      "https://picsum.photos/seed/1147/800/800",
      "https://picsum.photos/seed/1148/800/800",
      "https://picsum.photos/seed/1149/800/800"
    ],
    "description": "High-quality travel from Safari. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Safari",
    "category": "Travel",
    "price": 6800,
    "countInStock": 65,
    "isFeatured": false,
    "rating": 3.8,
    "numReviews": 910
  },
  {
    "name": "Powermax Sports 804",
    "image": "https://picsum.photos/seed/1150/800/800",
    "images": [
      "https://picsum.photos/seed/1150/800/800",
      "https://picsum.photos/seed/1151/800/800",
      "https://picsum.photos/seed/1152/800/800",
      "https://picsum.photos/seed/1153/800/800",
      "https://picsum.photos/seed/1154/800/800"
    ],
    "description": "High-quality sports from Powermax. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Powermax",
    "category": "Sports",
    "price": 34584,
    "countInStock": 15,
    "isFeatured": false,
    "rating": 4.1,
    "numReviews": 919
  },
  {
    "name": "Rupa Books 719",
    "image": "https://picsum.photos/seed/1155/800/800",
    "images": [
      "https://picsum.photos/seed/1155/800/800",
      "https://picsum.photos/seed/1156/800/800",
      "https://picsum.photos/seed/1157/800/800",
      "https://picsum.photos/seed/1158/800/800",
      "https://picsum.photos/seed/1159/800/800"
    ],
    "description": "High-quality books from Rupa. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Rupa",
    "category": "Books",
    "price": 1531,
    "countInStock": 27,
    "isFeatured": false,
    "rating": 4.8,
    "numReviews": 732
  },
  {
    "name": "Motorola Mobiles 88",
    "image": "https://picsum.photos/seed/1160/800/800",
    "images": [
      "https://picsum.photos/seed/1160/800/800",
      "https://picsum.photos/seed/1161/800/800",
      "https://picsum.photos/seed/1162/800/800",
      "https://picsum.photos/seed/1163/800/800",
      "https://picsum.photos/seed/1164/800/800"
    ],
    "description": "High-quality mobiles from Motorola. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Motorola",
    "category": "Mobiles",
    "price": 107815,
    "countInStock": 17,
    "isFeatured": false,
    "rating": 3.6,
    "numReviews": 869
  },
  {
    "name": "Sony Electronics 83",
    "image": "https://picsum.photos/seed/1165/800/800",
    "images": [
      "https://picsum.photos/seed/1165/800/800",
      "https://picsum.photos/seed/1166/800/800",
      "https://picsum.photos/seed/1167/800/800",
      "https://picsum.photos/seed/1168/800/800",
      "https://picsum.photos/seed/1169/800/800"
    ],
    "description": "High-quality electronics from Sony. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Sony",
    "category": "Electronics",
    "price": 156396,
    "countInStock": 71,
    "isFeatured": true,
    "rating": 3.5,
    "numReviews": 21
  },
  {
    "name": "Zara Fashion 906",
    "image": "https://picsum.photos/seed/1170/800/800",
    "images": [
      "https://picsum.photos/seed/1170/800/800",
      "https://picsum.photos/seed/1171/800/800",
      "https://picsum.photos/seed/1172/800/800",
      "https://picsum.photos/seed/1173/800/800",
      "https://picsum.photos/seed/1174/800/800"
    ],
    "description": "High-quality fashion from Zara. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Zara",
    "category": "Fashion",
    "price": 7958,
    "countInStock": 30,
    "isFeatured": false,
    "rating": 4.6,
    "numReviews": 202
  },
  {
    "name": "Nilkamal Home & Furniture 292",
    "image": "https://picsum.photos/seed/1175/800/800",
    "images": [
      "https://picsum.photos/seed/1175/800/800",
      "https://picsum.photos/seed/1176/800/800",
      "https://picsum.photos/seed/1177/800/800",
      "https://picsum.photos/seed/1178/800/800",
      "https://picsum.photos/seed/1179/800/800"
    ],
    "description": "High-quality home & furniture from Nilkamal. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Nilkamal",
    "category": "Home & Furniture",
    "price": 25015,
    "countInStock": 60,
    "isFeatured": false,
    "rating": 3.7,
    "numReviews": 314
  },
  {
    "name": "Philips Appliances 492",
    "image": "https://picsum.photos/seed/1180/800/800",
    "images": [
      "https://picsum.photos/seed/1180/800/800",
      "https://picsum.photos/seed/1181/800/800",
      "https://picsum.photos/seed/1182/800/800",
      "https://picsum.photos/seed/1183/800/800",
      "https://picsum.photos/seed/1184/800/800"
    ],
    "description": "High-quality appliances from Philips. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Philips",
    "category": "Appliances",
    "price": 17797,
    "countInStock": 77,
    "isFeatured": false,
    "rating": 3.3,
    "numReviews": 711
  },
  {
    "name": "ITC Grocery 188",
    "image": "https://picsum.photos/seed/1185/800/800",
    "images": [
      "https://picsum.photos/seed/1185/800/800",
      "https://picsum.photos/seed/1186/800/800",
      "https://picsum.photos/seed/1187/800/800",
      "https://picsum.photos/seed/1188/800/800",
      "https://picsum.photos/seed/1189/800/800"
    ],
    "description": "High-quality grocery from ITC. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "ITC",
    "category": "Grocery",
    "price": 1422,
    "countInStock": 45,
    "isFeatured": false,
    "rating": 3.9,
    "numReviews": 866
  },
  {
    "name": "Clinique Beauty 596",
    "image": "https://picsum.photos/seed/1190/800/800",
    "images": [
      "https://picsum.photos/seed/1190/800/800",
      "https://picsum.photos/seed/1191/800/800",
      "https://picsum.photos/seed/1192/800/800",
      "https://picsum.photos/seed/1193/800/800",
      "https://picsum.photos/seed/1194/800/800"
    ],
    "description": "High-quality beauty from Clinique. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Clinique",
    "category": "Beauty",
    "price": 1500,
    "countInStock": 38,
    "isFeatured": false,
    "rating": 3.8,
    "numReviews": 931
  },
  {
    "name": "Amazfit Wearables 47",
    "image": "https://picsum.photos/seed/1195/800/800",
    "images": [
      "https://picsum.photos/seed/1195/800/800",
      "https://picsum.photos/seed/1196/800/800",
      "https://picsum.photos/seed/1197/800/800",
      "https://picsum.photos/seed/1198/800/800",
      "https://picsum.photos/seed/1199/800/800"
    ],
    "description": "High-quality wearables from Amazfit. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Amazfit",
    "category": "Wearables",
    "price": 38638,
    "countInStock": 65,
    "isFeatured": true,
    "rating": 4.3,
    "numReviews": 195
  },
  {
    "name": "American Tourister Travel 642",
    "image": "https://picsum.photos/seed/1200/800/800",
    "images": [
      "https://picsum.photos/seed/1200/800/800",
      "https://picsum.photos/seed/1201/800/800",
      "https://picsum.photos/seed/1202/800/800",
      "https://picsum.photos/seed/1203/800/800",
      "https://picsum.photos/seed/1204/800/800"
    ],
    "description": "High-quality travel from American Tourister. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "American Tourister",
    "category": "Travel",
    "price": 5509,
    "countInStock": 43,
    "isFeatured": false,
    "rating": 4.7,
    "numReviews": 571
  },
  {
    "name": "Decathlon Sports 36",
    "image": "https://picsum.photos/seed/1205/800/800",
    "images": [
      "https://picsum.photos/seed/1205/800/800",
      "https://picsum.photos/seed/1206/800/800",
      "https://picsum.photos/seed/1207/800/800",
      "https://picsum.photos/seed/1208/800/800",
      "https://picsum.photos/seed/1209/800/800"
    ],
    "description": "High-quality sports from Decathlon. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Decathlon",
    "category": "Sports",
    "price": 5577,
    "countInStock": 70,
    "isFeatured": false,
    "rating": 3.5,
    "numReviews": 732
  },
  {
    "name": "HarperCollins Books 594",
    "image": "https://picsum.photos/seed/1210/800/800",
    "images": [
      "https://picsum.photos/seed/1210/800/800",
      "https://picsum.photos/seed/1211/800/800",
      "https://picsum.photos/seed/1212/800/800",
      "https://picsum.photos/seed/1213/800/800",
      "https://picsum.photos/seed/1214/800/800"
    ],
    "description": "High-quality books from HarperCollins. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "HarperCollins",
    "category": "Books",
    "price": 1951,
    "countInStock": 86,
    "isFeatured": false,
    "rating": 5,
    "numReviews": 383
  },
  {
    "name": "OnePlus Mobiles 411",
    "image": "https://picsum.photos/seed/1215/800/800",
    "images": [
      "https://picsum.photos/seed/1215/800/800",
      "https://picsum.photos/seed/1216/800/800",
      "https://picsum.photos/seed/1217/800/800",
      "https://picsum.photos/seed/1218/800/800",
      "https://picsum.photos/seed/1219/800/800"
    ],
    "description": "High-quality mobiles from OnePlus. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "OnePlus",
    "category": "Mobiles",
    "price": 129256,
    "countInStock": 23,
    "isFeatured": false,
    "rating": 4.9,
    "numReviews": 479
  },
  {
    "name": "HP Electronics 800",
    "image": "https://picsum.photos/seed/1220/800/800",
    "images": [
      "https://picsum.photos/seed/1220/800/800",
      "https://picsum.photos/seed/1221/800/800",
      "https://picsum.photos/seed/1222/800/800",
      "https://picsum.photos/seed/1223/800/800",
      "https://picsum.photos/seed/1224/800/800"
    ],
    "description": "High-quality electronics from HP. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "HP",
    "category": "Electronics",
    "price": 103468,
    "countInStock": 76,
    "isFeatured": false,
    "rating": 4.3,
    "numReviews": 843
  },
  {
    "name": "Adidas Fashion 207",
    "image": "https://picsum.photos/seed/1225/800/800",
    "images": [
      "https://picsum.photos/seed/1225/800/800",
      "https://picsum.photos/seed/1226/800/800",
      "https://picsum.photos/seed/1227/800/800",
      "https://picsum.photos/seed/1228/800/800",
      "https://picsum.photos/seed/1229/800/800"
    ],
    "description": "High-quality fashion from Adidas. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Adidas",
    "category": "Fashion",
    "price": 1829,
    "countInStock": 3,
    "isFeatured": false,
    "rating": 3,
    "numReviews": 973
  },
  {
    "name": "Duroflex Home & Furniture 834",
    "image": "https://picsum.photos/seed/1230/800/800",
    "images": [
      "https://picsum.photos/seed/1230/800/800",
      "https://picsum.photos/seed/1231/800/800",
      "https://picsum.photos/seed/1232/800/800",
      "https://picsum.photos/seed/1233/800/800",
      "https://picsum.photos/seed/1234/800/800"
    ],
    "description": "High-quality home & furniture from Duroflex. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Duroflex",
    "category": "Home & Furniture",
    "price": 7012,
    "countInStock": 28,
    "isFeatured": false,
    "rating": 4.7,
    "numReviews": 779
  },
  {
    "name": "Philips Appliances 208",
    "image": "https://picsum.photos/seed/1235/800/800",
    "images": [
      "https://picsum.photos/seed/1235/800/800",
      "https://picsum.photos/seed/1236/800/800",
      "https://picsum.photos/seed/1237/800/800",
      "https://picsum.photos/seed/1238/800/800",
      "https://picsum.photos/seed/1239/800/800"
    ],
    "description": "High-quality appliances from Philips. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Philips",
    "category": "Appliances",
    "price": 15639,
    "countInStock": 12,
    "isFeatured": false,
    "rating": 4.5,
    "numReviews": 755
  },
  {
    "name": "Happilo Grocery 717",
    "image": "https://picsum.photos/seed/1240/800/800",
    "images": [
      "https://picsum.photos/seed/1240/800/800",
      "https://picsum.photos/seed/1241/800/800",
      "https://picsum.photos/seed/1242/800/800",
      "https://picsum.photos/seed/1243/800/800",
      "https://picsum.photos/seed/1244/800/800"
    ],
    "description": "High-quality grocery from Happilo. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Happilo",
    "category": "Grocery",
    "price": 1419,
    "countInStock": 67,
    "isFeatured": false,
    "rating": 3.6,
    "numReviews": 382
  },
  {
    "name": "The Body Shop Beauty 120",
    "image": "https://picsum.photos/seed/1245/800/800",
    "images": [
      "https://picsum.photos/seed/1245/800/800",
      "https://picsum.photos/seed/1246/800/800",
      "https://picsum.photos/seed/1247/800/800",
      "https://picsum.photos/seed/1248/800/800",
      "https://picsum.photos/seed/1249/800/800"
    ],
    "description": "High-quality beauty from The Body Shop. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "The Body Shop",
    "category": "Beauty",
    "price": 3422,
    "countInStock": 54,
    "isFeatured": false,
    "rating": 4.8,
    "numReviews": 594
  },
  {
    "name": "Apple Wearables 750",
    "image": "https://picsum.photos/seed/1250/800/800",
    "images": [
      "https://picsum.photos/seed/1250/800/800",
      "https://picsum.photos/seed/1251/800/800",
      "https://picsum.photos/seed/1252/800/800",
      "https://picsum.photos/seed/1253/800/800",
      "https://picsum.photos/seed/1254/800/800"
    ],
    "description": "High-quality wearables from Apple. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Apple",
    "category": "Wearables",
    "price": 40966,
    "countInStock": 99,
    "isFeatured": false,
    "rating": 3.9,
    "numReviews": 211
  },
  {
    "name": "Mocobara Travel 235",
    "image": "https://picsum.photos/seed/1255/800/800",
    "images": [
      "https://picsum.photos/seed/1255/800/800",
      "https://picsum.photos/seed/1256/800/800",
      "https://picsum.photos/seed/1257/800/800",
      "https://picsum.photos/seed/1258/800/800",
      "https://picsum.photos/seed/1259/800/800"
    ],
    "description": "High-quality travel from Mocobara. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Mocobara",
    "category": "Travel",
    "price": 3866,
    "countInStock": 22,
    "isFeatured": false,
    "rating": 4.6,
    "numReviews": 563
  },
  {
    "name": "Spalding Sports 469",
    "image": "https://picsum.photos/seed/1260/800/800",
    "images": [
      "https://picsum.photos/seed/1260/800/800",
      "https://picsum.photos/seed/1261/800/800",
      "https://picsum.photos/seed/1262/800/800",
      "https://picsum.photos/seed/1263/800/800",
      "https://picsum.photos/seed/1264/800/800"
    ],
    "description": "High-quality sports from Spalding. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Spalding",
    "category": "Sports",
    "price": 27316,
    "countInStock": 28,
    "isFeatured": false,
    "rating": 4.2,
    "numReviews": 635
  },
  {
    "name": "Scholastic Books 131",
    "image": "https://picsum.photos/seed/1265/800/800",
    "images": [
      "https://picsum.photos/seed/1265/800/800",
      "https://picsum.photos/seed/1266/800/800",
      "https://picsum.photos/seed/1267/800/800",
      "https://picsum.photos/seed/1268/800/800",
      "https://picsum.photos/seed/1269/800/800"
    ],
    "description": "High-quality books from Scholastic. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Scholastic",
    "category": "Books",
    "price": 2014,
    "countInStock": 98,
    "isFeatured": true,
    "rating": 4.2,
    "numReviews": 601
  },
  {
    "name": "Apple Mobiles 180",
    "image": "https://picsum.photos/seed/1270/800/800",
    "images": [
      "https://picsum.photos/seed/1270/800/800",
      "https://picsum.photos/seed/1271/800/800",
      "https://picsum.photos/seed/1272/800/800",
      "https://picsum.photos/seed/1273/800/800",
      "https://picsum.photos/seed/1274/800/800"
    ],
    "description": "High-quality mobiles from Apple. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Apple",
    "category": "Mobiles",
    "price": 66216,
    "countInStock": 62,
    "isFeatured": false,
    "rating": 4,
    "numReviews": 225
  },
  {
    "name": "Dell Electronics 942",
    "image": "https://picsum.photos/seed/1275/800/800",
    "images": [
      "https://picsum.photos/seed/1275/800/800",
      "https://picsum.photos/seed/1276/800/800",
      "https://picsum.photos/seed/1277/800/800",
      "https://picsum.photos/seed/1278/800/800",
      "https://picsum.photos/seed/1279/800/800"
    ],
    "description": "High-quality electronics from Dell. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Dell",
    "category": "Electronics",
    "price": 67914,
    "countInStock": 59,
    "isFeatured": false,
    "rating": 4.4,
    "numReviews": 997
  },
  {
    "name": "Raymond Fashion 764",
    "image": "https://picsum.photos/seed/1280/800/800",
    "images": [
      "https://picsum.photos/seed/1280/800/800",
      "https://picsum.photos/seed/1281/800/800",
      "https://picsum.photos/seed/1282/800/800",
      "https://picsum.photos/seed/1283/800/800",
      "https://picsum.photos/seed/1284/800/800"
    ],
    "description": "High-quality fashion from Raymond. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Raymond",
    "category": "Fashion",
    "price": 5258,
    "countInStock": 85,
    "isFeatured": true,
    "rating": 4.5,
    "numReviews": 794
  },
  {
    "name": "Pepperfry Home & Furniture 317",
    "image": "https://picsum.photos/seed/1285/800/800",
    "images": [
      "https://picsum.photos/seed/1285/800/800",
      "https://picsum.photos/seed/1286/800/800",
      "https://picsum.photos/seed/1287/800/800",
      "https://picsum.photos/seed/1288/800/800",
      "https://picsum.photos/seed/1289/800/800"
    ],
    "description": "High-quality home & furniture from Pepperfry. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Pepperfry",
    "category": "Home & Furniture",
    "price": 44670,
    "countInStock": 83,
    "isFeatured": false,
    "rating": 4.6,
    "numReviews": 560
  },
  {
    "name": "Haier Appliances 813",
    "image": "https://picsum.photos/seed/1290/800/800",
    "images": [
      "https://picsum.photos/seed/1290/800/800",
      "https://picsum.photos/seed/1291/800/800",
      "https://picsum.photos/seed/1292/800/800",
      "https://picsum.photos/seed/1293/800/800",
      "https://picsum.photos/seed/1294/800/800"
    ],
    "description": "High-quality appliances from Haier. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Haier",
    "category": "Appliances",
    "price": 27194,
    "countInStock": 9,
    "isFeatured": true,
    "rating": 4.9,
    "numReviews": 913
  },
  {
    "name": "Happilo Grocery 339",
    "image": "https://picsum.photos/seed/1295/800/800",
    "images": [
      "https://picsum.photos/seed/1295/800/800",
      "https://picsum.photos/seed/1296/800/800",
      "https://picsum.photos/seed/1297/800/800",
      "https://picsum.photos/seed/1298/800/800",
      "https://picsum.photos/seed/1299/800/800"
    ],
    "description": "High-quality grocery from Happilo. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Happilo",
    "category": "Grocery",
    "price": 316,
    "countInStock": 23,
    "isFeatured": false,
    "rating": 4.6,
    "numReviews": 485
  },
  {
    "name": "Neutrogena Beauty 657",
    "image": "https://picsum.photos/seed/1300/800/800",
    "images": [
      "https://picsum.photos/seed/1300/800/800",
      "https://picsum.photos/seed/1301/800/800",
      "https://picsum.photos/seed/1302/800/800",
      "https://picsum.photos/seed/1303/800/800",
      "https://picsum.photos/seed/1304/800/800"
    ],
    "description": "High-quality beauty from Neutrogena. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Neutrogena",
    "category": "Beauty",
    "price": 468,
    "countInStock": 85,
    "isFeatured": true,
    "rating": 4.7,
    "numReviews": 331
  },
  {
    "name": "Samsung Wearables 238",
    "image": "https://picsum.photos/seed/1305/800/800",
    "images": [
      "https://picsum.photos/seed/1305/800/800",
      "https://picsum.photos/seed/1306/800/800",
      "https://picsum.photos/seed/1307/800/800",
      "https://picsum.photos/seed/1308/800/800",
      "https://picsum.photos/seed/1309/800/800"
    ],
    "description": "High-quality wearables from Samsung. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Samsung",
    "category": "Wearables",
    "price": 33042,
    "countInStock": 46,
    "isFeatured": false,
    "rating": 4.5,
    "numReviews": 587
  },
  {
    "name": "American Tourister Travel 292",
    "image": "https://picsum.photos/seed/1310/800/800",
    "images": [
      "https://picsum.photos/seed/1310/800/800",
      "https://picsum.photos/seed/1311/800/800",
      "https://picsum.photos/seed/1312/800/800",
      "https://picsum.photos/seed/1313/800/800",
      "https://picsum.photos/seed/1314/800/800"
    ],
    "description": "High-quality travel from American Tourister. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "American Tourister",
    "category": "Travel",
    "price": 12725,
    "countInStock": 79,
    "isFeatured": true,
    "rating": 4.2,
    "numReviews": 920
  },
  {
    "name": "Decathlon Sports 758",
    "image": "https://picsum.photos/seed/1315/800/800",
    "images": [
      "https://picsum.photos/seed/1315/800/800",
      "https://picsum.photos/seed/1316/800/800",
      "https://picsum.photos/seed/1317/800/800",
      "https://picsum.photos/seed/1318/800/800",
      "https://picsum.photos/seed/1319/800/800"
    ],
    "description": "High-quality sports from Decathlon. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Decathlon",
    "category": "Sports",
    "price": 33146,
    "countInStock": 39,
    "isFeatured": false,
    "rating": 4.9,
    "numReviews": 743
  },
  {
    "name": "Rupa Books 342",
    "image": "https://picsum.photos/seed/1320/800/800",
    "images": [
      "https://picsum.photos/seed/1320/800/800",
      "https://picsum.photos/seed/1321/800/800",
      "https://picsum.photos/seed/1322/800/800",
      "https://picsum.photos/seed/1323/800/800",
      "https://picsum.photos/seed/1324/800/800"
    ],
    "description": "High-quality books from Rupa. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Rupa",
    "category": "Books",
    "price": 1744,
    "countInStock": 8,
    "isFeatured": false,
    "rating": 4.4,
    "numReviews": 132
  },
  {
    "name": "Realme Mobiles 597",
    "image": "https://picsum.photos/seed/1325/800/800",
    "images": [
      "https://picsum.photos/seed/1325/800/800",
      "https://picsum.photos/seed/1326/800/800",
      "https://picsum.photos/seed/1327/800/800",
      "https://picsum.photos/seed/1328/800/800",
      "https://picsum.photos/seed/1329/800/800"
    ],
    "description": "High-quality mobiles from Realme. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Realme",
    "category": "Mobiles",
    "price": 128045,
    "countInStock": 3,
    "isFeatured": false,
    "rating": 5,
    "numReviews": 648
  },
  {
    "name": "MSI Electronics 998",
    "image": "https://picsum.photos/seed/1330/800/800",
    "images": [
      "https://picsum.photos/seed/1330/800/800",
      "https://picsum.photos/seed/1331/800/800",
      "https://picsum.photos/seed/1332/800/800",
      "https://picsum.photos/seed/1333/800/800",
      "https://picsum.photos/seed/1334/800/800"
    ],
    "description": "High-quality electronics from MSI. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "MSI",
    "category": "Electronics",
    "price": 155024,
    "countInStock": 41,
    "isFeatured": false,
    "rating": 4.8,
    "numReviews": 577
  },
  {
    "name": "Levis Fashion 666",
    "image": "https://picsum.photos/seed/1335/800/800",
    "images": [
      "https://picsum.photos/seed/1335/800/800",
      "https://picsum.photos/seed/1336/800/800",
      "https://picsum.photos/seed/1337/800/800",
      "https://picsum.photos/seed/1338/800/800",
      "https://picsum.photos/seed/1339/800/800"
    ],
    "description": "High-quality fashion from Levis. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Levis",
    "category": "Fashion",
    "price": 5662,
    "countInStock": 58,
    "isFeatured": false,
    "rating": 3.3,
    "numReviews": 944
  },
  {
    "name": "Duroflex Home & Furniture 602",
    "image": "https://picsum.photos/seed/1340/800/800",
    "images": [
      "https://picsum.photos/seed/1340/800/800",
      "https://picsum.photos/seed/1341/800/800",
      "https://picsum.photos/seed/1342/800/800",
      "https://picsum.photos/seed/1343/800/800",
      "https://picsum.photos/seed/1344/800/800"
    ],
    "description": "High-quality home & furniture from Duroflex. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Duroflex",
    "category": "Home & Furniture",
    "price": 22791,
    "countInStock": 31,
    "isFeatured": false,
    "rating": 3.7,
    "numReviews": 563
  },
  {
    "name": "Havells Appliances 806",
    "image": "https://picsum.photos/seed/1345/800/800",
    "images": [
      "https://picsum.photos/seed/1345/800/800",
      "https://picsum.photos/seed/1346/800/800",
      "https://picsum.photos/seed/1347/800/800",
      "https://picsum.photos/seed/1348/800/800",
      "https://picsum.photos/seed/1349/800/800"
    ],
    "description": "High-quality appliances from Havells. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Havells",
    "category": "Appliances",
    "price": 49953,
    "countInStock": 61,
    "isFeatured": false,
    "rating": 3.1,
    "numReviews": 475
  },
  {
    "name": "Amul Grocery 438",
    "image": "https://picsum.photos/seed/1350/800/800",
    "images": [
      "https://picsum.photos/seed/1350/800/800",
      "https://picsum.photos/seed/1351/800/800",
      "https://picsum.photos/seed/1352/800/800",
      "https://picsum.photos/seed/1353/800/800",
      "https://picsum.photos/seed/1354/800/800"
    ],
    "description": "High-quality grocery from Amul. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Amul",
    "category": "Grocery",
    "price": 4501,
    "countInStock": 73,
    "isFeatured": false,
    "rating": 3.6,
    "numReviews": 512
  },
  {
    "name": "Lakme Beauty 163",
    "image": "https://picsum.photos/seed/1355/800/800",
    "images": [
      "https://picsum.photos/seed/1355/800/800",
      "https://picsum.photos/seed/1356/800/800",
      "https://picsum.photos/seed/1357/800/800",
      "https://picsum.photos/seed/1358/800/800",
      "https://picsum.photos/seed/1359/800/800"
    ],
    "description": "High-quality beauty from Lakme. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Lakme",
    "category": "Beauty",
    "price": 2104,
    "countInStock": 70,
    "isFeatured": false,
    "rating": 4.8,
    "numReviews": 25
  },
  {
    "name": "Apple Wearables 12",
    "image": "https://picsum.photos/seed/1360/800/800",
    "images": [
      "https://picsum.photos/seed/1360/800/800",
      "https://picsum.photos/seed/1361/800/800",
      "https://picsum.photos/seed/1362/800/800",
      "https://picsum.photos/seed/1363/800/800",
      "https://picsum.photos/seed/1364/800/800"
    ],
    "description": "High-quality wearables from Apple. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Apple",
    "category": "Wearables",
    "price": 27137,
    "countInStock": 45,
    "isFeatured": true,
    "rating": 3.1,
    "numReviews": 346
  },
  {
    "name": "VIP Travel 641",
    "image": "https://picsum.photos/seed/1365/800/800",
    "images": [
      "https://picsum.photos/seed/1365/800/800",
      "https://picsum.photos/seed/1366/800/800",
      "https://picsum.photos/seed/1367/800/800",
      "https://picsum.photos/seed/1368/800/800",
      "https://picsum.photos/seed/1369/800/800"
    ],
    "description": "High-quality travel from VIP. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "VIP",
    "category": "Travel",
    "price": 8962,
    "countInStock": 62,
    "isFeatured": false,
    "rating": 4.7,
    "numReviews": 924
  },
  {
    "name": "Speedo Sports 317",
    "image": "https://picsum.photos/seed/1370/800/800",
    "images": [
      "https://picsum.photos/seed/1370/800/800",
      "https://picsum.photos/seed/1371/800/800",
      "https://picsum.photos/seed/1372/800/800",
      "https://picsum.photos/seed/1373/800/800",
      "https://picsum.photos/seed/1374/800/800"
    ],
    "description": "High-quality sports from Speedo. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Speedo",
    "category": "Sports",
    "price": 7458,
    "countInStock": 27,
    "isFeatured": false,
    "rating": 3,
    "numReviews": 408
  },
  {
    "name": "Penguin Books 559",
    "image": "https://picsum.photos/seed/1375/800/800",
    "images": [
      "https://picsum.photos/seed/1375/800/800",
      "https://picsum.photos/seed/1376/800/800",
      "https://picsum.photos/seed/1377/800/800",
      "https://picsum.photos/seed/1378/800/800",
      "https://picsum.photos/seed/1379/800/800"
    ],
    "description": "High-quality books from Penguin. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Penguin",
    "category": "Books",
    "price": 1558,
    "countInStock": 3,
    "isFeatured": false,
    "rating": 4.5,
    "numReviews": 141
  },
  {
    "name": "Google Mobiles 504",
    "image": "https://picsum.photos/seed/1380/800/800",
    "images": [
      "https://picsum.photos/seed/1380/800/800",
      "https://picsum.photos/seed/1381/800/800",
      "https://picsum.photos/seed/1382/800/800",
      "https://picsum.photos/seed/1383/800/800",
      "https://picsum.photos/seed/1384/800/800"
    ],
    "description": "High-quality mobiles from Google. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Google",
    "category": "Mobiles",
    "price": 101126,
    "countInStock": 10,
    "isFeatured": false,
    "rating": 3.7,
    "numReviews": 549
  },
  {
    "name": "Sony Electronics 881",
    "image": "https://picsum.photos/seed/1385/800/800",
    "images": [
      "https://picsum.photos/seed/1385/800/800",
      "https://picsum.photos/seed/1386/800/800",
      "https://picsum.photos/seed/1387/800/800",
      "https://picsum.photos/seed/1388/800/800",
      "https://picsum.photos/seed/1389/800/800"
    ],
    "description": "High-quality electronics from Sony. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Sony",
    "category": "Electronics",
    "price": 31852,
    "countInStock": 33,
    "isFeatured": true,
    "rating": 4.9,
    "numReviews": 620
  },
  {
    "name": "FabIndia Fashion 703",
    "image": "https://picsum.photos/seed/1390/800/800",
    "images": [
      "https://picsum.photos/seed/1390/800/800",
      "https://picsum.photos/seed/1391/800/800",
      "https://picsum.photos/seed/1392/800/800",
      "https://picsum.photos/seed/1393/800/800",
      "https://picsum.photos/seed/1394/800/800"
    ],
    "description": "High-quality fashion from FabIndia. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "FabIndia",
    "category": "Fashion",
    "price": 9394,
    "countInStock": 44,
    "isFeatured": true,
    "rating": 4.9,
    "numReviews": 78
  },
  {
    "name": "Godrej Interio Home & Furniture 19",
    "image": "https://picsum.photos/seed/1395/800/800",
    "images": [
      "https://picsum.photos/seed/1395/800/800",
      "https://picsum.photos/seed/1396/800/800",
      "https://picsum.photos/seed/1397/800/800",
      "https://picsum.photos/seed/1398/800/800",
      "https://picsum.photos/seed/1399/800/800"
    ],
    "description": "High-quality home & furniture from Godrej Interio. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Godrej Interio",
    "category": "Home & Furniture",
    "price": 3438,
    "countInStock": 53,
    "isFeatured": false,
    "rating": 4.8,
    "numReviews": 400
  },
  {
    "name": "Kent Appliances 344",
    "image": "https://picsum.photos/seed/1400/800/800",
    "images": [
      "https://picsum.photos/seed/1400/800/800",
      "https://picsum.photos/seed/1401/800/800",
      "https://picsum.photos/seed/1402/800/800",
      "https://picsum.photos/seed/1403/800/800",
      "https://picsum.photos/seed/1404/800/800"
    ],
    "description": "High-quality appliances from Kent. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Kent",
    "category": "Appliances",
    "price": 39090,
    "countInStock": 15,
    "isFeatured": false,
    "rating": 3.5,
    "numReviews": 130
  },
  {
    "name": "Dabur Grocery 726",
    "image": "https://picsum.photos/seed/1405/800/800",
    "images": [
      "https://picsum.photos/seed/1405/800/800",
      "https://picsum.photos/seed/1406/800/800",
      "https://picsum.photos/seed/1407/800/800",
      "https://picsum.photos/seed/1408/800/800",
      "https://picsum.photos/seed/1409/800/800"
    ],
    "description": "High-quality grocery from Dabur. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Dabur",
    "category": "Grocery",
    "price": 3403,
    "countInStock": 17,
    "isFeatured": false,
    "rating": 3.9,
    "numReviews": 352
  },
  {
    "name": "Lakme Beauty 190",
    "image": "https://picsum.photos/seed/1410/800/800",
    "images": [
      "https://picsum.photos/seed/1410/800/800",
      "https://picsum.photos/seed/1411/800/800",
      "https://picsum.photos/seed/1412/800/800",
      "https://picsum.photos/seed/1413/800/800",
      "https://picsum.photos/seed/1414/800/800"
    ],
    "description": "High-quality beauty from Lakme. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Lakme",
    "category": "Beauty",
    "price": 1534,
    "countInStock": 16,
    "isFeatured": false,
    "rating": 4.8,
    "numReviews": 578
  },
  {
    "name": "Garmin Wearables 521",
    "image": "https://picsum.photos/seed/1415/800/800",
    "images": [
      "https://picsum.photos/seed/1415/800/800",
      "https://picsum.photos/seed/1416/800/800",
      "https://picsum.photos/seed/1417/800/800",
      "https://picsum.photos/seed/1418/800/800",
      "https://picsum.photos/seed/1419/800/800"
    ],
    "description": "High-quality wearables from Garmin. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Garmin",
    "category": "Wearables",
    "price": 14456,
    "countInStock": 99,
    "isFeatured": false,
    "rating": 3.1,
    "numReviews": 809
  },
  {
    "name": "Safari Travel 830",
    "image": "https://picsum.photos/seed/1420/800/800",
    "images": [
      "https://picsum.photos/seed/1420/800/800",
      "https://picsum.photos/seed/1421/800/800",
      "https://picsum.photos/seed/1422/800/800",
      "https://picsum.photos/seed/1423/800/800",
      "https://picsum.photos/seed/1424/800/800"
    ],
    "description": "High-quality travel from Safari. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Safari",
    "category": "Travel",
    "price": 5671,
    "countInStock": 82,
    "isFeatured": false,
    "rating": 3.2,
    "numReviews": 73
  },
  {
    "name": "Cosco Sports 518",
    "image": "https://picsum.photos/seed/1425/800/800",
    "images": [
      "https://picsum.photos/seed/1425/800/800",
      "https://picsum.photos/seed/1426/800/800",
      "https://picsum.photos/seed/1427/800/800",
      "https://picsum.photos/seed/1428/800/800",
      "https://picsum.photos/seed/1429/800/800"
    ],
    "description": "High-quality sports from Cosco. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Cosco",
    "category": "Sports",
    "price": 34366,
    "countInStock": 76,
    "isFeatured": false,
    "rating": 4.8,
    "numReviews": 671
  },
  {
    "name": "HarperCollins Books 101",
    "image": "https://picsum.photos/seed/1430/800/800",
    "images": [
      "https://picsum.photos/seed/1430/800/800",
      "https://picsum.photos/seed/1431/800/800",
      "https://picsum.photos/seed/1432/800/800",
      "https://picsum.photos/seed/1433/800/800",
      "https://picsum.photos/seed/1434/800/800"
    ],
    "description": "High-quality books from HarperCollins. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "HarperCollins",
    "category": "Books",
    "price": 340,
    "countInStock": 29,
    "isFeatured": false,
    "rating": 3.7,
    "numReviews": 702
  },
  {
    "name": "Realme Mobiles 204",
    "image": "https://picsum.photos/seed/1435/800/800",
    "images": [
      "https://picsum.photos/seed/1435/800/800",
      "https://picsum.photos/seed/1436/800/800",
      "https://picsum.photos/seed/1437/800/800",
      "https://picsum.photos/seed/1438/800/800",
      "https://picsum.photos/seed/1439/800/800"
    ],
    "description": "High-quality mobiles from Realme. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Realme",
    "category": "Mobiles",
    "price": 68618,
    "countInStock": 7,
    "isFeatured": false,
    "rating": 4.1,
    "numReviews": 512
  },
  {
    "name": "MSI Electronics 633",
    "image": "https://picsum.photos/seed/1440/800/800",
    "images": [
      "https://picsum.photos/seed/1440/800/800",
      "https://picsum.photos/seed/1441/800/800",
      "https://picsum.photos/seed/1442/800/800",
      "https://picsum.photos/seed/1443/800/800",
      "https://picsum.photos/seed/1444/800/800"
    ],
    "description": "High-quality electronics from MSI. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "MSI",
    "category": "Electronics",
    "price": 131920,
    "countInStock": 11,
    "isFeatured": true,
    "rating": 3.2,
    "numReviews": 877
  },
  {
    "name": "Adidas Fashion 683",
    "image": "https://picsum.photos/seed/1445/800/800",
    "images": [
      "https://picsum.photos/seed/1445/800/800",
      "https://picsum.photos/seed/1446/800/800",
      "https://picsum.photos/seed/1447/800/800",
      "https://picsum.photos/seed/1448/800/800",
      "https://picsum.photos/seed/1449/800/800"
    ],
    "description": "High-quality fashion from Adidas. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Adidas",
    "category": "Fashion",
    "price": 4959,
    "countInStock": 71,
    "isFeatured": false,
    "rating": 3.3,
    "numReviews": 828
  },
  {
    "name": "Godrej Interio Home & Furniture 935",
    "image": "https://picsum.photos/seed/1450/800/800",
    "images": [
      "https://picsum.photos/seed/1450/800/800",
      "https://picsum.photos/seed/1451/800/800",
      "https://picsum.photos/seed/1452/800/800",
      "https://picsum.photos/seed/1453/800/800",
      "https://picsum.photos/seed/1454/800/800"
    ],
    "description": "High-quality home & furniture from Godrej Interio. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Godrej Interio",
    "category": "Home & Furniture",
    "price": 39925,
    "countInStock": 92,
    "isFeatured": false,
    "rating": 3.2,
    "numReviews": 24
  },
  {
    "name": "Bajaj Appliances 169",
    "image": "https://picsum.photos/seed/1455/800/800",
    "images": [
      "https://picsum.photos/seed/1455/800/800",
      "https://picsum.photos/seed/1456/800/800",
      "https://picsum.photos/seed/1457/800/800",
      "https://picsum.photos/seed/1458/800/800",
      "https://picsum.photos/seed/1459/800/800"
    ],
    "description": "High-quality appliances from Bajaj. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Bajaj",
    "category": "Appliances",
    "price": 28908,
    "countInStock": 71,
    "isFeatured": false,
    "rating": 3.9,
    "numReviews": 451
  },
  {
    "name": "Hindustan Unilever Grocery 419",
    "image": "https://picsum.photos/seed/1460/800/800",
    "images": [
      "https://picsum.photos/seed/1460/800/800",
      "https://picsum.photos/seed/1461/800/800",
      "https://picsum.photos/seed/1462/800/800",
      "https://picsum.photos/seed/1463/800/800",
      "https://picsum.photos/seed/1464/800/800"
    ],
    "description": "High-quality grocery from Hindustan Unilever. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Hindustan Unilever",
    "category": "Grocery",
    "price": 3932,
    "countInStock": 78,
    "isFeatured": false,
    "rating": 3.3,
    "numReviews": 44
  },
  {
    "name": "MAC Beauty 531",
    "image": "https://picsum.photos/seed/1465/800/800",
    "images": [
      "https://picsum.photos/seed/1465/800/800",
      "https://picsum.photos/seed/1466/800/800",
      "https://picsum.photos/seed/1467/800/800",
      "https://picsum.photos/seed/1468/800/800",
      "https://picsum.photos/seed/1469/800/800"
    ],
    "description": "High-quality beauty from MAC. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "MAC",
    "category": "Beauty",
    "price": 4505,
    "countInStock": 74,
    "isFeatured": false,
    "rating": 4.7,
    "numReviews": 338
  },
  {
    "name": "Fitbit Wearables 269",
    "image": "https://picsum.photos/seed/1470/800/800",
    "images": [
      "https://picsum.photos/seed/1470/800/800",
      "https://picsum.photos/seed/1471/800/800",
      "https://picsum.photos/seed/1472/800/800",
      "https://picsum.photos/seed/1473/800/800",
      "https://picsum.photos/seed/1474/800/800"
    ],
    "description": "High-quality wearables from Fitbit. This product is designed to provide maximum utility and durability for your daily needs.",
    "brand": "Fitbit",
    "category": "Wearables",
    "price": 37815,
    "countInStock": 83,
    "isFeatured": false,
    "rating": 4.9,
    "numReviews": 278
  },
  {
    "name": "Skybags Travel 162",
    "image": "https://picsum.photos/seed/1475/800/800",
    "images": [
      "https://picsum.photos/seed/1475/800/800",
      "https://picsum.photos/seed/1476/800/800",
      "https://picsum.photos/seed/1477/800/800",
      "https://picsum.photos/seed/1478/800/800",
      "https://picsum.photos/seed/1479/800/800"
    ],
    "description": "High-quality travel from Skybags. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Skybags",
    "category": "Travel",
    "price": 5826,
    "countInStock": 47,
    "isFeatured": false,
    "rating": 4.6,
    "numReviews": 693
  },
  {
    "name": "Yonex Sports 919",
    "image": "https://picsum.photos/seed/1480/800/800",
    "images": [
      "https://picsum.photos/seed/1480/800/800",
      "https://picsum.photos/seed/1481/800/800",
      "https://picsum.photos/seed/1482/800/800",
      "https://picsum.photos/seed/1483/800/800",
      "https://picsum.photos/seed/1484/800/800"
    ],
    "description": "High-quality sports from Yonex. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Yonex",
    "category": "Sports",
    "price": 30202,
    "countInStock": 3,
    "isFeatured": false,
    "rating": 4.4,
    "numReviews": 884
  },
  {
    "name": "Oxford Books 929",
    "image": "https://picsum.photos/seed/1485/800/800",
    "images": [
      "https://picsum.photos/seed/1485/800/800",
      "https://picsum.photos/seed/1486/800/800",
      "https://picsum.photos/seed/1487/800/800",
      "https://picsum.photos/seed/1488/800/800",
      "https://picsum.photos/seed/1489/800/800"
    ],
    "description": "High-quality books from Oxford. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Oxford",
    "category": "Books",
    "price": 1947,
    "countInStock": 50,
    "isFeatured": false,
    "rating": 4.6,
    "numReviews": 722
  },
  {
    "name": "Motorola Mobiles 582",
    "image": "https://picsum.photos/seed/1490/800/800",
    "images": [
      "https://picsum.photos/seed/1490/800/800",
      "https://picsum.photos/seed/1491/800/800",
      "https://picsum.photos/seed/1492/800/800",
      "https://picsum.photos/seed/1493/800/800",
      "https://picsum.photos/seed/1494/800/800"
    ],
    "description": "High-quality mobiles from Motorola. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Motorola",
    "category": "Mobiles",
    "price": 92634,
    "countInStock": 4,
    "isFeatured": false,
    "rating": 3.3,
    "numReviews": 405
  },
  {
    "name": "Dell Electronics 276",
    "image": "https://picsum.photos/seed/1495/800/800",
    "images": [
      "https://picsum.photos/seed/1495/800/800",
      "https://picsum.photos/seed/1496/800/800",
      "https://picsum.photos/seed/1497/800/800",
      "https://picsum.photos/seed/1498/800/800",
      "https://picsum.photos/seed/1499/800/800"
    ],
    "description": "High-quality electronics from Dell. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Dell",
    "category": "Electronics",
    "price": 143315,
    "countInStock": 90,
    "isFeatured": false,
    "rating": 4.2,
    "numReviews": 899
  },
  {
    "name": "Allen Solly Fashion 895",
    "image": "https://picsum.photos/seed/1500/800/800",
    "images": [
      "https://picsum.photos/seed/1500/800/800",
      "https://picsum.photos/seed/1501/800/800",
      "https://picsum.photos/seed/1502/800/800",
      "https://picsum.photos/seed/1503/800/800",
      "https://picsum.photos/seed/1504/800/800"
    ],
    "description": "High-quality fashion from Allen Solly. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Allen Solly",
    "category": "Fashion",
    "price": 2828,
    "countInStock": 13,
    "isFeatured": false,
    "rating": 3.9,
    "numReviews": 858
  },
  {
    "name": "Home Centre Home & Furniture 869",
    "image": "https://picsum.photos/seed/1505/800/800",
    "images": [
      "https://picsum.photos/seed/1505/800/800",
      "https://picsum.photos/seed/1506/800/800",
      "https://picsum.photos/seed/1507/800/800",
      "https://picsum.photos/seed/1508/800/800",
      "https://picsum.photos/seed/1509/800/800"
    ],
    "description": "High-quality home & furniture from Home Centre. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Home Centre",
    "category": "Home & Furniture",
    "price": 48929,
    "countInStock": 93,
    "isFeatured": false,
    "rating": 3.5,
    "numReviews": 175
  },
  {
    "name": "Prestige Appliances 73",
    "image": "https://picsum.photos/seed/1510/800/800",
    "images": [
      "https://picsum.photos/seed/1510/800/800",
      "https://picsum.photos/seed/1511/800/800",
      "https://picsum.photos/seed/1512/800/800",
      "https://picsum.photos/seed/1513/800/800",
      "https://picsum.photos/seed/1514/800/800"
    ],
    "description": "High-quality appliances from Prestige. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Prestige",
    "category": "Appliances",
    "price": 4510,
    "countInStock": 55,
    "isFeatured": false,
    "rating": 3.6,
    "numReviews": 936
  },
  {
    "name": "Reliance Grocery 386",
    "image": "https://picsum.photos/seed/1515/800/800",
    "images": [
      "https://picsum.photos/seed/1515/800/800",
      "https://picsum.photos/seed/1516/800/800",
      "https://picsum.photos/seed/1517/800/800",
      "https://picsum.photos/seed/1518/800/800",
      "https://picsum.photos/seed/1519/800/800"
    ],
    "description": "High-quality grocery from Reliance. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Reliance",
    "category": "Grocery",
    "price": 4159,
    "countInStock": 3,
    "isFeatured": false,
    "rating": 3.6,
    "numReviews": 975
  },
  {
    "name": "Neutrogena Beauty 765",
    "image": "https://picsum.photos/seed/1520/800/800",
    "images": [
      "https://picsum.photos/seed/1520/800/800",
      "https://picsum.photos/seed/1521/800/800",
      "https://picsum.photos/seed/1522/800/800",
      "https://picsum.photos/seed/1523/800/800",
      "https://picsum.photos/seed/1524/800/800"
    ],
    "description": "High-quality beauty from Neutrogena. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Neutrogena",
    "category": "Beauty",
    "price": 4696,
    "countInStock": 66,
    "isFeatured": false,
    "rating": 4.5,
    "numReviews": 373
  },
  {
    "name": "Fitbit Wearables 837",
    "image": "https://picsum.photos/seed/1525/800/800",
    "images": [
      "https://picsum.photos/seed/1525/800/800",
      "https://picsum.photos/seed/1526/800/800",
      "https://picsum.photos/seed/1527/800/800",
      "https://picsum.photos/seed/1528/800/800",
      "https://picsum.photos/seed/1529/800/800"
    ],
    "description": "High-quality wearables from Fitbit. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Fitbit",
    "category": "Wearables",
    "price": 21891,
    "countInStock": 41,
    "isFeatured": false,
    "rating": 3.4,
    "numReviews": 15
  },
  {
    "name": "Wildcraft Travel 616",
    "image": "https://picsum.photos/seed/1530/800/800",
    "images": [
      "https://picsum.photos/seed/1530/800/800",
      "https://picsum.photos/seed/1531/800/800",
      "https://picsum.photos/seed/1532/800/800",
      "https://picsum.photos/seed/1533/800/800",
      "https://picsum.photos/seed/1534/800/800"
    ],
    "description": "High-quality travel from Wildcraft. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Wildcraft",
    "category": "Travel",
    "price": 13107,
    "countInStock": 81,
    "isFeatured": false,
    "rating": 5,
    "numReviews": 573
  },
  {
    "name": "Spalding Sports 26",
    "image": "https://picsum.photos/seed/1535/800/800",
    "images": [
      "https://picsum.photos/seed/1535/800/800",
      "https://picsum.photos/seed/1536/800/800",
      "https://picsum.photos/seed/1537/800/800",
      "https://picsum.photos/seed/1538/800/800",
      "https://picsum.photos/seed/1539/800/800"
    ],
    "description": "High-quality sports from Spalding. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Spalding",
    "category": "Sports",
    "price": 37328,
    "countInStock": 45,
    "isFeatured": false,
    "rating": 4.2,
    "numReviews": 80
  },
  {
    "name": "Oxford Books 50",
    "image": "https://picsum.photos/seed/1540/800/800",
    "images": [
      "https://picsum.photos/seed/1540/800/800",
      "https://picsum.photos/seed/1541/800/800",
      "https://picsum.photos/seed/1542/800/800",
      "https://picsum.photos/seed/1543/800/800",
      "https://picsum.photos/seed/1544/800/800"
    ],
    "description": "High-quality books from Oxford. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Oxford",
    "category": "Books",
    "price": 1066,
    "countInStock": 89,
    "isFeatured": true,
    "rating": 3.9,
    "numReviews": 197
  },
  {
    "name": "Vivo Mobiles 751",
    "image": "https://picsum.photos/seed/1545/800/800",
    "images": [
      "https://picsum.photos/seed/1545/800/800",
      "https://picsum.photos/seed/1546/800/800",
      "https://picsum.photos/seed/1547/800/800",
      "https://picsum.photos/seed/1548/800/800",
      "https://picsum.photos/seed/1549/800/800"
    ],
    "description": "High-quality mobiles from Vivo. This product is designed to provide maximum performance and durability for your daily needs.",
    "brand": "Vivo",
    "category": "Mobiles",
    "price": 125206,
    "countInStock": 57,
    "isFeatured": false,
    "rating": 3.4,
    "numReviews": 342
  },
  {
    "name": "Sony Electronics 476",
    "image": "https://picsum.photos/seed/1550/800/800",
    "images": [
      "https://picsum.photos/seed/1550/800/800",
      "https://picsum.photos/seed/1551/800/800",
      "https://picsum.photos/seed/1552/800/800",
      "https://picsum.photos/seed/1553/800/800",
      "https://picsum.photos/seed/1554/800/800"
    ],
    "description": "High-quality electronics from Sony. This product is designed to provide maximum style and durability for your daily needs.",
    "brand": "Sony",
    "category": "Electronics",
    "price": 147833,
    "countInStock": 82,
    "isFeatured": false,
    "rating": 4.3,
    "numReviews": 798
  },
  {
    "name": "Allen Solly Fashion 670",
    "image": "https://picsum.photos/seed/1555/800/800",
    "images": [
      "https://picsum.photos/seed/1555/800/800",
      "https://picsum.photos/seed/1556/800/800",
      "https://picsum.photos/seed/1557/800/800",
      "https://picsum.photos/seed/1558/800/800",
      "https://picsum.photos/seed/1559/800/800"
    ],
    "description": "High-quality fashion from Allen Solly. This product is designed to provide maximum comfort and durability for your daily needs.",
    "brand": "Allen Solly",
    "category": "Fashion",
    "price": 1146,
    "countInStock": 72,
    "isFeatured": false,
    "rating": 4.1,
    "numReviews": 545
  }
];

const importData = async () => {
  try {
    await Product.deleteMany();

    // Find existing admin — do NOT delete users
    let adminUser = await User.findOne({ isAdmin: true });
    if (!adminUser) {
      console.error("No admin user found. Create an admin user first.");
      process.exit(1);
    }

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser._id };
    });

    await Product.insertMany(sampleProducts);

    console.log(`${sampleProducts.length} products seeded successfully!`);
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

importData();
