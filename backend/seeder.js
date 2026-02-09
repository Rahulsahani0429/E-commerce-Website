import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Product from './models/Product.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const products = [
    // Mobiles
    {
        name: 'iPhone 15 Pro (Natural Titanium)',
        image: 'https://picsum.photos/id/160/800/800',
        description: 'The ultimate iPhone. Featuring a strong and light aerospace-grade titanium design.',
        brand: 'Apple',
        category: 'Mobiles',
        price: 129900,
        countInStock: 15,
        isFeatured: true,
        rating: 4.9,
        numReviews: 120,
    },
    {
        name: 'Samsung Galaxy S24 Ultra',
        image: 'https://picsum.photos/id/161/800/800',
        description: 'Elite smartphone with AI features and the most powerful zoom camera.',
        brand: 'Samsung',
        category: 'Mobiles',
        price: 115000,
        countInStock: 10,
        isFeatured: true,
        rating: 4.8,
        numReviews: 85,
    },
    {
        name: 'Google Pixel 8 Pro',
        image: 'https://picsum.photos/id/162/800/800',
        description: 'The best of Google AI on a stunning, colorful display.',
        brand: 'Google',
        category: 'Mobiles',
        price: 99000,
        countInStock: 12,
        isFeatured: true,
        rating: 4.7,
        numReviews: 64,
    },
    // Electronics
    {
        name: 'Sony WH-1000XM5 Wireless Headphones',
        image: 'https://picsum.photos/id/3/800/800',
        description: 'Industry-leading noise cancellation and breathtaking sound quality.',
        brand: 'Sony',
        category: 'Electronics',
        price: 24999,
        countInStock: 20,
        isFeatured: true,
        rating: 4.9,
        numReviews: 340,
    },
    {
        name: 'MacBook Air M2',
        image: 'https://picsum.photos/id/180/800/800',
        description: 'Strikingly thin and fast. Supercharged by the M2 chip.',
        brand: 'Apple',
        category: 'Electronics',
        price: 94900,
        countInStock: 8,
        isFeatured: true,
        rating: 4.8,
        numReviews: 92,
    },
    {
        name: 'Canon EOS R6 Mark II',
        image: 'https://picsum.photos/id/250/800/800',
        description: 'The ultimate hybrid camera for stills and video.',
        brand: 'Canon',
        category: 'Electronics',
        price: 215000,
        countInStock: 5,
        isFeatured: true,
        rating: 5.0,
        numReviews: 14,
    },
    {
        name: 'Dell UltraSharp 27" 4K Monitor',
        image: 'https://picsum.photos/id/201/800/800',
        description: 'Brilliant color, wide viewing angles and excellent clarity for work.',
        brand: 'Dell',
        category: 'Electronics',
        price: 42000,
        countInStock: 15,
        isFeatured: true,
        rating: 4.7,
        numReviews: 45,
    },
    // Fashion
    {
        name: 'Men\'s Slim Fit Cotton Shirt',
        image: 'https://picsum.photos/id/338/800/800',
        description: 'A classic white shirt for formal and casual wear.',
        brand: 'Raymond',
        category: 'Fashion',
        price: 1599,
        countInStock: 100,
        isFeatured: true,
        rating: 4.2,
        numReviews: 1200,
    },
    {
        name: 'Women\'s Floral Maxi Dress',
        image: 'https://picsum.photos/id/349/800/800',
        description: 'Lightweight and flowy floral dress for summer outings.',
        brand: 'Zara',
        category: 'Fashion',
        price: 2999,
        countInStock: 45,
        isFeatured: true,
        rating: 4.5,
        numReviews: 230,
    },
    {
        name: 'Classic Denims (Blue)',
        image: 'https://picsum.photos/id/350/800/800',
        description: 'High-quality denim jeans with a comfortable straight fit.',
        brand: 'Levi\'s',
        category: 'Fashion',
        price: 3499,
        countInStock: 60,
        isFeatured: true,
        rating: 4.6,
        numReviews: 540,
    },
    {
        name: 'Sport Running Shoes',
        image: 'https://picsum.photos/id/21/800/800',
        description: 'Engineered for performance. Lightweight and breathable.',
        brand: 'Nike',
        category: 'Fashion',
        price: 8500,
        countInStock: 30,
        isFeatured: true,
        rating: 4.9,
        numReviews: 890,
    },
    // Home & Furniture
    {
        name: 'Modern Velvet 3-Seater Sofa',
        image: 'https://picsum.photos/id/403/800/800',
        description: 'Luxurious velvet sofa that adds a touch of elegance to your living room.',
        brand: 'Ikea',
        category: 'Home & Furniture',
        price: 45000,
        countInStock: 4,
        isFeatured: true,
        rating: 4.7,
        numReviews: 12,
    },
    {
        name: 'Solid Wood Coffee Table',
        image: 'https://picsum.photos/id/445/800/800',
        description: 'Sustainable mango wood table with a rustic finish.',
        brand: 'Furlenco',
        category: 'Home & Furniture',
        price: 8900,
        countInStock: 10,
        isFeatured: true,
        rating: 4.4,
        numReviews: 28,
    },
    {
        name: 'Ergonomic Office Chair',
        image: 'https://picsum.photos/id/449/800/800',
        description: 'Maximum comfort for long work hours with adjustable lumbar support.',
        brand: 'Heron',
        category: 'Home & Furniture',
        price: 12500,
        countInStock: 25,
        isFeatured: true,
        rating: 4.6,
        numReviews: 145,
    },
    {
        name: 'Abstract Canvas Wall Art',
        image: 'https://picsum.photos/id/450/800/800',
        description: 'Hand-painted abstract art on large canvas to liven up your walls.',
        brand: 'Artify',
        category: 'Home & Furniture',
        price: 4500,
        countInStock: 20,
        isFeatured: true,
        rating: 4.8,
        numReviews: 32,
    },
    {
        name: 'Smart Robotic Vacuum',
        image: 'https://picsum.photos/id/488/800/800',
        description: 'Advanced robotic vacuum with mapping and strong suction.',
        brand: 'iRobot',
        category: 'Electronics',
        price: 28000,
        countInStock: 12,
        isFeatured: true,
        rating: 4.5,
        numReviews: 67,
    },
    {
        name: 'Luxury Cotton Bedding Set',
        image: 'https://picsum.photos/id/500/800/800',
        description: 'Ultra-soft 800 thread count Egyptian cotton sheets.',
        brand: 'SleepWell',
        category: 'Home & Furniture',
        price: 5500,
        countInStock: 50,
        isFeatured: true,
        rating: 4.9,
        numReviews: 88,
    }
];

const importData = async () => {
    try {
        await Product.deleteMany();
        await User.deleteMany();

        const adminUser = await User.create({
            name: 'Admin User',
            email: 'admin@example.com',
            password: 'password123',
            isAdmin: true,
        });

        const sampleProducts = products.map((product) => {
            return { ...product, user: adminUser._id };
        });

        await Product.insertMany(sampleProducts);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importData();
