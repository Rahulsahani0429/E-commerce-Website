import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    { name: "All Products", icon: "🏠", path: "/shop" },
    { name: "Mobiles", icon: "📱", path: "/shop?category=Mobiles" },
    { name: "Electronics", icon: "💻", path: "/shop?category=Electronics" },
    { name: "Fashion", icon: "👕", path: "/shop?category=Fashion" },
    {
      name: "Home & Furniture",
      icon: "🛋️",
      path: "/shop?category=Home%20%26%20Furniture",
    },
    { name: "Appliances", icon: "📺", path: "/shop?category=Appliances" },
    { name: "Grocery", icon: "🛒", path: "/shop?category=Grocery" },
    { name: "Travel", icon: "✈️", path: "/shop?category=Travel" },
    { name: "Beauty", icon: "💄", path: "/shop?category=Beauty" },
  ];

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        // Add timestamp to prevent caching
        const timestamp = new Date().getTime();
        const url = `${API_BASE_URL}/api/products?isFeatured=true&_t=${timestamp}`;
        console.log("Fetching deals from:", url);

        const { data } = await axios.get(url);
        console.log("Deals received:", data);
        console.log("Number of featured products:", data.length);

        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching deals:", error);
        console.error("Error details:", error.response?.data || error.message);
        setLoading(false);
      }
    };
    fetchDeals();
  }, []);

  const [activeBanner, setActiveBanner] = useState(0);
  const banners = [
    "https://picsum.photos/seed/banner1/1600/400",
    "https://picsum.photos/seed/banner2/1600/400",
    "https://picsum.photos/seed/banner3/1600/400",
    "https://picsum.photos/seed/banner4/1600/400",
    "https://picsum.photos/seed/banner5/1600/400",
    "https://picsum.photos/seed/banner6/1600/400",
    "https://picsum.photos/seed/banner7/1600/400",
    "https://picsum.photos/seed/banner8/1600/400",
    "https://picsum.photos/seed/banner9/1600/400",
    "https://picsum.photos/seed/banner10/1600/400"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="home-page">
      {/* Category Bar */}
      <div className="category-bar">
        <div className="container cat-container">
          {categories.map((cat, idx) => (
            <Link key={idx} to={cat.path} className="category-item">
              <span className="cat-icon">{cat.icon}</span>
              <span className="cat-name">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="container">
        {/* Hero Slider */}
        <div className="hero-slider">
          <div
            className="slider-wrapper"
            style={{ transform: `translateX(-${activeBanner * 100}%)` }}
          >
            {banners.map((banner, i) => (
              <img key={i} src={banner} alt={`Promotion ${i + 1}`} />
            ))}
          </div>
          <div className="slider-dots">
            {banners.map((_, i) => (
              <span
                key={i}
                className={`dot ${activeBanner === i ? "active" : ""}`}
                onClick={() => setActiveBanner(i)}
              ></span>
            ))}
          </div>
        </div>

        {/* Top Deals Section */}
        <div className="deals-section">
          <div className="deals-header">
            <div className="deals-title">
              <h2>Top Deals</h2>
              <p>
                Featured of Rahul Offers for You{" "}
                {products.length > 0 && `(${products.length} items)`}
              </p>
            </div>
            <Link to="/shop" className="view-all-btn">
              VIEW ALL
            </Link>
          </div>

          <div className="deals-body">
            <div className="deals-main-content">
              {loading ? (
                <div className="deals-loading">Loading amazing deals...</div>
              ) : products.length > 0 ? (
                <div className="deals-grid">
                  {products.map(product => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="no-deals">
                  Check back later for fresh deals!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .home-page { padding-bottom: 3rem; background: #f1f3f6; min-height: 100vh; overflow-x: hidden; width: 100%; max-width: 100vw; }
        
        /* Category Bar - Flipkart Style */
        .category-bar { background: white; box-shadow: 0 1px 2px 0 rgba(0,0,0,.1); padding: 0.75rem 0; margin-bottom: 0.75rem; width: 100%; overflow: hidden; }
        .cat-container { display: flex; justify-content: flex-start; gap: 8.5rem; overflow-x: auto; scrollbar-width: none; padding-bottom: 4px; }
        .cat-container::-webkit-scrollbar { display: none; }
        .category-item { display: flex; flex-direction: column; align-items: center; cursor: pointer; min-width: 60px; flex-shrink: 0; padding: 0.5rem; transition: transform 0.2s; text-decoration: none; }
        .category-item:hover { transform: translateY(-2px); }
        .cat-icon { font-size: 2.2rem; margin-bottom: 0.4rem; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1)); }
        .cat-name { font-size: 0.75rem; font-weight: 600; color: #212121; text-align: center; line-height: 1.2; }

        /* Hero Slider */
        .hero-slider { margin-bottom: 0.75rem; height: 280px; box-shadow: 0 1px 2px 0 rgba(0,0,0,.1); border-radius: 0; overflow: hidden; position: relative; background: white; width: 100%; max-width: 100%; }
        .slider-wrapper { display: flex; transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1); height: 100%; will-change: transform; }
        .slider-wrapper img { min-width: 100%; height: 100%; object-fit: cover; flex-shrink: 0; }
        .slider-dots { position: absolute; bottom: 15px; left: 50%; transform: translateX(-50%); display: flex; gap: 8px; z-index: 10; }
        .dot { width: 10px; height: 10px; border-radius: 50%; background: rgba(255,255,255,0.6); cursor: pointer; transition: all 0.3s; border: 1px solid rgba(0,0,0,0.1); }
        .dot.active { background: white; width: 28px; border-radius: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.2); }

        /* Deals Section */
        .deals-section { background: white; padding: 1rem 1.25rem; box-shadow: 0 1px 2px 0 rgba(0,0,0,.1); border-radius: 0; margin-bottom: 0.75rem; overflow: hidden; width: 100%; }
        .deals-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #f0f0f0; padding-bottom: 1rem; margin-bottom: 1.25rem; }
        .deals-title h2 { font-size: 1.4rem; color: #212121; margin: 0; font-weight: 500; }
        .deals-title p { color: #878787; font-size: 0.85rem; margin: 0.3rem 0 0; font-weight: 400; }
        .view-all-btn { background: #2874f0; color: white !important; padding: 0.5rem 1.5rem; border-radius: 2px; font-weight: 600; text-decoration: none; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.5px; box-shadow: 0 1px 2px 0 rgba(0,0,0,.2); transition: all 0.2s; white-space: nowrap; }
        .view-all-btn:hover { background: #1c5bbf; box-shadow: 0 2px 4px 0 rgba(0,0,0,.3); }

        .deals-body { display: block; width: 100%; }
        .deals-main-content { width: 100%; min-width: 0; }
        
        /* Product Grid */
        .deals-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; width: 100%; max-width: 100%; box-sizing: border-box; }
        @media (min-width: 480px) { .deals-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (min-width: 768px) { .deals-grid { grid-template-columns: repeat(4, 1fr); } }
        @media (min-width: 1024px) { .deals-grid { grid-template-columns: repeat(5, 1fr); } }
        @media (min-width: 1280px) { .deals-grid { grid-template-columns: repeat(6, 1fr); } }
        @media (min-width: 1440px) { .deals-grid { grid-template-columns: repeat(7, 1fr); } }
        @media (min-width: 1600px) { .deals-grid { grid-template-columns: repeat(8, 1fr); } }

        /* Product Cards - Enhanced Design */
        .deal-card { 
          text-decoration: none; 
          color: inherit; 
          text-align: center; 
          padding: 1.5rem 1rem; 
          border: 1px solid #f0f0f0; 
          border-radius: 8px; /* Slightly rounded */
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); 
          background: white;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          overflow: hidden;
        }
        
        .deal-card:hover { 
          transform: translateY(-10px); 
          box-shadow: 0 15px 30px rgba(0,0,0,0.1);
          border-color: transparent;
          z-index: 1;
        }
        
        .deal-image { 
          height: 180px; 
          width: 100%;
          display: flex; 
          align-items: center; 
          justify-content: center; 
          margin-bottom: 1rem;
          padding: 0.5rem;
          transition: transform 0.4s ease;
          position: relative;
        }
        
        .deal-card:hover .deal-image img { 
          transform: scale(1.1); 
        }
        
        .deal-image img { 
          max-width: 100%; 
          max-height: 100%; 
          object-fit: contain; 
          transition: transform 0.4s ease;
        }
        
        /* Product Card Image Indicators */
        .card-image-indicators {
          position: absolute;
          bottom: 5px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 4px;
          z-index: 10;
          padding: 4px 8px;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 12px;
        }
        
        .card-indicator-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.6);
          transition: all 0.3s ease;
        }
        
        .card-indicator-dot.active {
          background: white;
          width: 8px;
          height: 8px;
        }
        
        .deal-info { width: 100%; }
        
        .deal-info .deal-name { 
          font-weight: 600; 
          color: #212121; 
          margin-bottom: 0.5rem; 
          font-size: 1rem; 
          overflow: hidden; 
          text-overflow: ellipsis; 
          white-space: nowrap; 
          transition: color 0.3s ease;
        }
        
        .deal-card:hover .deal-name {
          color: #2874f0; 
        }
        
        .deal-price { 
          color: #388e3c; 
          font-weight: 600; 
          font-size: 1.1rem; 
          margin-bottom: 0.3rem;
        }
        
        .deal-brand { 
          color: #878787; 
          font-size: 0.8rem; 
          margin-bottom: 0.5rem;
        }

        /* Sidebar Banner - Flipkart Style */
        .side-banner { 
          width: 100%; 
          border-radius: 0; 
          overflow: hidden; 
          box-shadow: 0 1px 2px 0 rgba(0,0,0,.1);
          background: white;
        }
        .side-banner img { 
          width: 100%; 
          height: 100%; 
          object-fit: cover; 
          min-height: 200px;
        }
        @media (min-width: 1024px) {
          .side-banner img { min-height: 500px; }
        }
        
        .deals-loading, .no-deals { 
          padding: 3rem 2rem; 
          text-align: center; 
          color: #878787; 
          font-size: 1rem; 
          background: #fafafa; 
          border-radius: 4px;
        }

        /* Mobile Responsive Adjustments */
        @media (max-width: 768px) {
          .hero-slider { height: 180px; }
          .deals-grid { gap: 0.75rem; }
          .deal-image { height: 110px; }
          .deals-section { padding: 0.75rem 1rem; }
          .deals-title h2 { font-size: 1.1rem; }
          .cat-icon { font-size: 2rem; }
          .category-item { min-width: 60px; padding: 0.3rem; }
        }
      `}</style>
    </div>
  );
};

export default Home;
