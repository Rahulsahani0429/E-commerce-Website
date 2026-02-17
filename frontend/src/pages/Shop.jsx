import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import ProductCard from '../components/ProductCard';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const { search } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const searchParams = new URLSearchParams(search);
        const keyword = searchParams.get('keyword') || '';
        const urlCategory = searchParams.get('category') || '';
        const urlPriceRange = searchParams.get('priceRange') || '';
        const isFeatured = searchParams.get('isFeatured') === 'true';
        
        // Sync state with URL for UI consistency
        setCategory(urlCategory);
        setPriceRange(urlPriceRange);

        const params = new URLSearchParams();
        if (keyword) params.append('keyword', keyword);
        if (urlCategory) params.append('category', urlCategory);
        if (isFeatured) params.append('isFeatured', 'true');
        
        if (urlPriceRange === 'under2000') {
          params.append('maxPrice', '2000');
        } else if (urlPriceRange === '2000-5000') {
          params.append('minPrice', '2000');
          params.append('maxPrice', '5000');
        } else if (urlPriceRange === '5000-10000') {
          params.append('minPrice', '5000');
          params.append('maxPrice', '10000');
        } else if (urlPriceRange === 'over10000') {
          params.append('minPrice', '10000');
        }

        const url = `${API_BASE_URL}/api/products?${params.toString()}`;

        const { data } = await axios.get(url);
        setProducts(data);
        setLoading(false);
      } catch (error) {
        setError(error.response?.data?.message || error.message);
        setLoading(false);
      }
    };
    fetchProducts();
  }, [search]);

  const [activeBanner, setActiveBanner] = useState(0);
  const categories = [
    { name: 'All Products', icon: '🏠', path: '/shop' },
    { name: 'Mobiles', icon: '📱', path: '/shop?category=Mobiles' },
    { name: 'Electronics', icon: '💻', path: '/shop?category=Electronics' },
    { name: 'Fashion', icon: '👕', path: '/shop?category=Fashion' },
    { name: 'Home & Furniture', icon: '🛋️', path: '/shop?category=Home%20%26%20Furniture' },
    { name: 'Appliances', icon: '📺', path: '/shop?category=Appliances' },
    { name: 'Grocery', icon: '🛒', path: '/shop?category=Grocery' },
    { name: 'Travel', icon: '✈️', path: '/shop?category=Travel' },
    { name: 'Beauty', icon: '💄', path: '/shop?category=Beauty' }
  ];

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
      setActiveBanner(prev => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const updateFilters = (newCat, newPrice) => {
    const searchParams = new URLSearchParams(search);
    
    if (newCat !== undefined) {
      if (newCat) searchParams.set('category', newCat);
      else searchParams.delete('category');
    }
    
    if (newPrice !== undefined) {
      if (newPrice) searchParams.set('priceRange', newPrice);
      else searchParams.delete('priceRange');
    }
    
    navigate({ search: searchParams.toString() });
  };

  const toggleFilters = () => setShowFilters(!showFilters);

  if (loading) return <div className="container" style={{padding: '5rem 0', textAlign: 'center'}}>Loading shop...</div>;
  if (error) return <div className="container" style={{padding: '5rem 0', textAlign: 'center', color: 'var(--accent)'}}>{error}</div>;

  return (
    <div className="shop-page-wrapper">
      {/* Category Bar */}
      <div className="category-bar">
        <div className="container cat-container">
          {categories.map((cat, idx) => (
            <Link 
              key={idx} 
              to={cat.path} 
              className={`category-item ${category === cat.name ? 'active-cat' : ''}`}
            >
              <span className="cat-icon">{cat.icon}</span>
              <span className="cat-name">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="container">
        {/* Hero Slider */}
        <div className="hero-slider">
          <div className="slider-wrapper" style={{ transform: `translateX(-${activeBanner * 100}%)` }}>
            {banners.map((banner, i) => (
              <img key={i} src={banner} alt={`Promotion ${i + 1}`} />
            ))}
          </div>
          <div className="slider-dots">
            {banners.map((_, i) => (
              <span key={i} className={`dot ${activeBanner === i ? 'active' : ''}`} onClick={() => setActiveBanner(i)}></span>
            ))}
          </div>
        </div>

        <div className="shop-container">
          {/* Mobile Filter Button */}
          <div className="mobile-filter-bar" onClick={toggleFilters}>
            🔍 Filters {category || priceRange ? `(${!!category + !!priceRange})` : ''}
          </div>

          {/* Sidebar Filters */}
          <aside className={`filter-sidebar ${showFilters ? 'open' : ''}`}>
            <div className="filter-sidebar-header">
              <h3>Filters</h3>
              <div className="sidebar-actions">
                {(category || priceRange) && (
                  <button 
                    className="clear-all-btn"
                    onClick={() => { updateFilters('', ''); }}
                  >
                    Clear All
                  </button>
                )}
                <button className="close-filters" onClick={() => setShowFilters(false)}>✕</button>
              </div>
            </div>
            <div className="filter-group">
              <h4>Categories</h4>
              <ul>
                {['Mobiles', 'Electronics', 'Fashion', 'Home & Furniture', 'Appliances', 'Grocery', 'Travel', 'Beauty'].map(cat => (
                  <li 
                    key={cat}
                    className={category === cat ? 'active-filter' : ''}
                    onClick={() => {
                      updateFilters(cat === category ? '' : cat);
                      if (window.innerWidth <= 768) setShowFilters(false);
                    }}
                  >
                    {cat}
                  </li>
                ))}
              </ul>
            </div>
            <div className="filter-group">
              <h4>Price Range</h4>
              <ul>
                {[
                  { label: 'Under ₹2000', value: 'under2000' },
                  { label: '₹2000 - ₹5000', value: '2000-5000' },
                  { label: '₹5000 - ₹10000', value: '5000-10000' },
                  { label: 'Over ₹10000', value: 'over10000' }
                ].map(range => (
                  <li 
                    key={range.value}
                    className={priceRange === range.value ? 'active-filter' : ''} 
                    onClick={() => {
                      updateFilters(undefined, range.value === priceRange ? '' : range.value);
                      if (window.innerWidth <= 768) setShowFilters(false);
                    }}
                  >
                    {range.label}
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Product Listing */}
          <main className="product-listing">
            <div className="shop-header">
              <p>Showing {products.length} products</p>
              <div className="sort-by">
                Sort By: <strong>Relevance</strong>
              </div>
            </div>
            
            <div className="shop-product-grid">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} className="shop-card" />
              ))}
            </div>
          </main>
        </div>
      </div>

      <div className={`drawer-overlay ${showFilters ? 'show' : ''}`} onClick={() => setShowFilters(false)}></div>

      <style>{`
        .shop-page-wrapper { padding-bottom: 3rem; background: #f1f3f6; min-height: 100vh; }
        
        /* Category Bar - Flipkart Style */
        .category-bar { background: white; box-shadow: 0 1px 2px 0 rgba(0,0,0,.1); padding: 0.75rem 0; margin-bottom: 0.75rem; }
        .cat-container { display: flex; justify-content: space-around; gap: 0.5rem; overflow-x: auto; scrollbar-width: none; }
        .cat-container::-webkit-scrollbar { display: none; }
        .category-item { display: flex; flex-direction: column; align-items: center; cursor: pointer; min-width: 70px; flex-shrink: 0; padding: 0.5rem; transition: transform 0.2s; text-decoration: none; }
        .category-item:hover { transform: translateY(-2px); }
        .category-item.active-cat { border-bottom: 2px solid #2874f0; }
        .cat-icon { font-size: 2.5rem; margin-bottom: 0.4rem; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1)); }
        .cat-name { font-size: 0.8rem; font-weight: 600; color: #212121; text-align: center; line-height: 1.2; }

        /* Hero Slider */
        .hero-slider { margin-bottom: 0.75rem; height: 280px; box-shadow: 0 1px 2px 0 rgba(0,0,0,.1); border-radius: 0; overflow: hidden; position: relative; background: white; }
        .slider-wrapper { display: flex; transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1); height: 100%; }
        .slider-wrapper img { min-width: 100%; height: 100%; object-fit: cover; }
        .slider-dots { position: absolute; bottom: 15px; left: 50%; transform: translateX(-50%); display: flex; gap: 8px; z-index: 10; }
        .dot { width: 10px; height: 10px; border-radius: 50%; background: rgba(255,255,255,0.6); cursor: pointer; transition: all 0.3s; border: 1px solid rgba(0,0,0,0.1); }
        .dot.active { background: white; width: 28px; border-radius: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.2); }
        .shop-container { display: grid; grid-template-columns: 280px 1fr; gap: 1rem; align-items: start; }
        
        .filter-sidebar { background: white; padding: 1rem; box-shadow: var(--shadow); border-radius: 2px; position: sticky; top: 120px; transition: 0.3s; z-index: 10; }
        .filter-sidebar-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #f0f0f0; padding-bottom: 0.75rem; margin-bottom: 1.25rem; }
        .filter-sidebar h3 { font-size: 1rem; margin: 0; }
        .sidebar-actions { display: flex; align-items: center; gap: 1rem; }
        .close-filters { display: none; background: none; border: none; font-size: 1.2rem; cursor: pointer; }
        .clear-all-btn { background: none; border: none; color: var(--primary); font-size: 0.7rem; font-weight: 700; cursor: pointer; text-transform: uppercase; }
        
        .filter-group { margin-bottom: 1.25rem; }
        .filter-group h4 { font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.6rem; color: #878787; }
        .filter-group ul { list-style: none; font-size: 0.85rem; color: #212121; }
        .filter-group li { margin-bottom: 0.4rem; cursor: pointer; transition: color 0.1s; display: flex; align-items: center; gap: 0.5rem; }
        .filter-group li:hover { color: var(--primary); }
        .active-filter { color: var(--primary); font-weight: 700; }

        .product-listing { background: white; padding: 0.75rem; box-shadow: var(--shadow); border-radius: 2px; }
        .shop-header { display: flex; justify-content: space-between; border-bottom: 1px solid #f0f0f0; padding-bottom: 0.6rem; margin-bottom: 0.75rem; font-size: 0.8rem; }
        
        .shop-product-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 0.75rem; }
        .shop-card { text-decoration: none; color: inherit; padding: 0.75rem; border: 1px solid #f0f0f0; border-radius: 4px; transition: 0.2s; display: flex; flex-direction: column; }
        .shop-card:hover { box-shadow: 0 4px 15px rgba(0,0,0,0.08); transform: translateY(-3px); }
        .shop-card-image { height: 160px; display: flex; align-items: center; justify-content: center; margin-bottom: 0.75rem; position: relative; }
        .shop-card-image img { max-width: 100%; max-height: 100%; object-fit: contain; }
        
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
        
        .shop-card-info h3 { font-size: 0.9rem; font-weight: 400; color: #212121; margin-bottom: 0.4rem; line-height: 1.3; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; min-height: 2.3rem; }
        .shop-rating { display: flex; align-items: center; gap: 0.4rem; margin-bottom: 0.4rem; }
        .rating-badge { background: #388e3c; color: white; padding: 2px 5px; border-radius: 3px; font-size: 0.7rem; font-weight: 700; }
        .rating-count { color: #878787; font-size: 0.75rem; }
        
        .shop-price-row { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.3rem; }
        .price-main { font-size: 1rem; font-weight: 700; color: #212121; }
        .flipkart-assured { background: #2874f0; color: white; font-size: 0.5rem; font-weight: 800; padding: 1px 4px; border-radius: 2px; font-style: italic; }
        .shop-brand { color: #878787; font-size: 0.7rem; }

        .mobile-filter-bar { display: none; background: white; padding: 0.8rem; text-align: center; color: var(--primary); font-weight: 700; font-size: 0.9rem; border-radius: 2px; box-shadow: var(--shadow); margin-bottom: 0.75rem; cursor: pointer; position: sticky; top: 110px; z-index: 5; }

        @media (max-width: 1024px) {
          .shop-container { grid-template-columns: 200px 1fr; }
        }

        @media (max-width: 768px) {
          .shop-container { grid-template-columns: 1fr; }
          .mobile-filter-bar { display: block; }
          .close-filters { display: block; }
          .filter-sidebar { position: fixed; bottom: -100%; left: 0; width: 100%; background: white; border-radius: 12px 12px 0 0; padding: 2rem 1.5rem; box-shadow: 0 -4px 15px rgba(0,0,0,0.1); z-index: 2001; transition: 0.4s; top: auto; }
          .filter-sidebar.open { bottom: 0; }
          .shop-product-grid { grid-template-columns: repeat(2, 1fr); gap: 0.5rem; }
          .shop-card-image { height: 130px; }
          .shop-card { padding: 0.5rem; }
        }
      `}</style>
    </div>
  );
};

export default Shop;
