import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id || id === 'undefined') return;
      try {
        const { data } = await axios.get(`${API_BASE_URL}/api/products/${id}`);
        setProduct(data);
        setLoading(false);
      } catch (error) {
        setError(error.response?.data?.message || error.message);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const addToCartHandler = () => {
    addToCart(product, qty);
    navigate('/cart');
  };

  if (loading) return <div className="container" style={{padding: '5rem 0', textAlign: 'center'}}>Loading product details...</div>;
  if (error) return <div className="container" style={{padding: '5rem 0', textAlign: 'center', color: 'var(--accent)'}}>{error}</div>;
  if (!product) return <div className="container">Product not found</div>;

  return (
    <div className="product-detail-wrapper">
      <div className="container">
        {/* Breadcrumbs */}
        <div className="breadcrumbs">
          <Link to="/">Home</Link> &gt; 
          <Link to="/shop">{product.category || 'Shop'}</Link> &gt; 
          <span>{product.name}</span>
        </div>

        <div className="detail-container">
          <div className="detail-left">
            <div className="p-image-box">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="p-actions desktop-actions-box">
              <button 
                className="add-cart-btn" 
                disabled={product.countInStock === 0}
                onClick={addToCartHandler}
              >
                🛒 ADD TO CART
              </button>
              <button 
                className="buy-now-btn" 
                disabled={product.countInStock === 0}
                onClick={() => { addToCartHandler(); navigate('/cart'); }}
              >
                ⚡ BUY NOW
              </button>
            </div>
          </div>

          <div className="detail-right">
            <h1 className="p-name">{product.name}</h1>
            <div className="p-rating-row">
              <span className="p-rating-badge">{product.rating} ★</span>
              <span className="p-rating-reviews">{product.numReviews} Ratings & Reviews</span>
              <span className="p-assured-badge">Assured</span>
            </div>
            
            <div className="p-price-area">
              <span className="p-price-main">₹{product.price}</span>
              <span className="p-price-discount">10% off</span>
            </div>

            <div className="p-stock-status">
              {product.countInStock > 0 ? (
                <span className="in-stock">In Stock</span>
              ) : (
                <span className="out-of-stock">Out of Stock</span>
              )}
            </div>

            <div className="p-desc-section">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>

            <div className="p-specs-table">
              <h3>Specifications</h3>
              <div className="spec-row">
                <span className="spec-label">Brand</span>
                <span className="spec-value">{product.brand}</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">Model Name</span>
                <span className="spec-value">{product.name}</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">Category</span>
                <span className="spec-value">{product.category || 'General'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Sticky Actions */}
        <div className="mobile-sticky-actions">
           <button 
              className="add-cart-btn" 
              disabled={product.countInStock === 0}
              onClick={addToCartHandler}
            >
              ADD TO CART
            </button>
            <button 
              className="buy-now-btn" 
              disabled={product.countInStock === 0}
              onClick={() => { addToCartHandler(); navigate('/cart'); }}
            >
              BUY NOW
            </button>
        </div>
      </div>
      <style>{`
        .product-detail-wrapper { background: #f1f3f6; min-height: 100vh; padding: 0.5rem 0 5rem; }
        .breadcrumbs { font-size: 0.7rem; color: #878787; margin-bottom: 0.5rem; display: flex; gap: 0.4rem; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
        .breadcrumbs a { color: #878787; text-decoration: none; }
        
        .detail-container { display: grid; grid-template-columns: 450px 1fr; gap: 1rem; background: white; padding: 1.5rem; border-radius: 2px; box-shadow: var(--shadow); }
        
        .detail-left { position: sticky; top: 120px; height: fit-content; }
        .p-image-box { border: 1px solid #f0f0f0; padding: 1rem; margin-bottom: 1rem; height: 350px; display: flex; align-items: center; justify-content: center; }
        .p-image-box img { max-width: 100%; max-height: 100%; object-fit: contain; }
        
        .p-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; }
        .p-actions button { padding: 1rem; border: none; font-size: 0.9rem; font-weight: 700; border-radius: 2px; cursor: pointer; }
        .add-cart-btn { background: #fff; color: #212121; border: 1px solid #e0e0e0 !important; }
        .buy-now-btn { background: #fb641b; color: white; }
        .detail-left .add-cart-btn { background: #ff9f00; color: white; border: none !important; }

        .detail-right { padding-left: 1rem; }
        .p-name { font-size: 1.1rem; font-weight: 400; color: #212121; margin-bottom: 0.5rem; }
        .p-rating-row { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem; }
        .p-rating-badge { background: #388e3c; color: white; padding: 1px 6px; border-radius: 3px; font-size: 0.75rem; font-weight: 700; }
        .p-rating-reviews { color: #878787; font-size: 0.8rem; }
        .p-assured-badge { background: #2874f0; color: white; font-size: 0.5rem; font-weight: 800; padding: 1px 3px; border-radius: 2px; font-style: italic; }

        .p-price-area { margin-bottom: 1rem; display: flex; align-items: baseline; gap: 0.75rem; }
        .p-price-main { font-size: 1.6rem; font-weight: 700; }
        .p-price-discount { color: #388e3c; font-weight: 700; font-size: 0.9rem; }

        .p-desc-section, .p-specs-table { border-top: 1px solid #f0f0f0; padding-top: 1rem; margin-top: 1rem; }
        .p-desc-section h3, .p-specs-table h3 { font-size: 1rem; margin-bottom: 0.75rem; }
        .spec-row { display: flex; padding: 0.75rem 0; border-bottom: 1px solid #f9f9f9; font-size: 0.85rem; }
        .spec-label { width: 35%; color: #878787; }
        .spec-value { flex: 1; color: #212121; }

        .mobile-sticky-actions { display: none; position: fixed; bottom: 0; left: 0; right: 0; background: white; grid-template-columns: 1fr 1fr; z-index: 1000; box-shadow: 0 -2px 10px rgba(0,0,0,0.1); }
        .mobile-sticky-actions button { padding: 1rem; font-weight: 700; border: none; font-size: 0.9rem; }

        @media (max-width: 768px) {
          .detail-container { grid-template-columns: 1fr; padding: 1rem; }
          .detail-left { position: relative; top: 0; }
          .p-image-box { height: 280px; }
          .desktop-actions-box { display: none; }
          .mobile-sticky-actions { display: grid; }
          .detail-right { padding-left: 0; }
          .p-name { font-size: 1rem; }
          .spec-label { width: 45%; }
        }
      `}</style>
    </div>
  );
};

export default ProductDetail;
