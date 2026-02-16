import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
  const { cartItems, removeFromCart, addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const checkoutHandler = () => {
    if (user) {
      navigate('/shipping');
    } else {
      navigate('/login?redirect=/shipping');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart-container">
        <div className="empty-cart-card">
          <div className="empty-cart-img">🛒</div>
          <h2>Your Cart is Empty!</h2>
          <p>Add items to it now.</p>
          <Link to="/shop" className="shop-now-btn">Shop Now</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page-wrapper">
      <div className="container cart-container">
        <div className="cart-main">
          <div className="cart-header">
            <h2>My Cart ({cartItems.length})</h2>
          </div>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.product} className="flipkart-cart-item">
                <div className="cart-item-img">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="cart-item-info">
                  <Link to={`/product/${item.product}`}><h3>{item.name}</h3></Link>
                  <p className="item-seller">Seller: {item.brand}</p>
                  <div className="item-price-row">
                    <span className="curr-price">₹{item.price}</span>
                    <span className="orig-price">₹{Math.round(item.price * 1.1)}</span>
                    <span className="price-off">10% Off</span>
                  </div>
                  <div className="item-actions">
                    <div className="qty-ctrl">
                      <button onClick={() => addToCart(item, item.qty - 1)} disabled={item.qty <= 1}>-</button>
                      <input type="text" value={item.qty} readOnly />
                      <button onClick={() => addToCart(item, item.qty + 1)} disabled={item.qty >= item.countInStock}>+</button>
                    </div>
                    <button className="remove-btn" onClick={() => removeFromCart(item.product)}>REMOVE</button>
                  </div>
                </div>
                <div className="delivery-info">
                  Delivery by <span>Tomorrow, Wed</span> | <span className="free-text">Free</span>
                </div>
              </div>
            ))}
          </div>
          <div className="place-order-row">
            <button className="place-order-btn" onClick={checkoutHandler}>PLACE ORDER</button>
          </div>
        </div>

        <div className="cart-summary-sidebar">
          <div className="price-details-card">
            <h3>PRICE DETAILS</h3>
            <div className="price-row">
              <span>Price ({cartItems.length} items)</span>
              <span>₹{cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(0)}</span>
            </div>
            <div className="price-row">
              <span>Discount</span>
              <span className="discount-text">- ₹0</span>
            </div>
            <div className="price-row">
              <span>Delivery Charges</span>
              <span className="discount-text">FREE</span>
            </div>
            <div className="total-amount-row">
              <span>Total Amount</span>
              <span>₹{cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(0)}</span>
            </div>
            <p className="savings-msg">You will save ₹0 on this order</p>
          </div>
        </div>
      </div>
      <style>{`
        .cart-page-wrapper { background: #f1f3f6; min-height: 100vh; padding: 0.5rem 0 5rem; }
        .cart-container { display: grid; grid-template-columns: 1fr 380px; gap: 0.5rem; align-items: start; }
        
        .cart-main { background: white; border-radius: 2px; box-shadow: var(--shadow); }
        .cart-header { padding: 0.8rem 1rem; border-bottom: 1px solid #f0f0f0; }
        .cart-header h2 { font-size: 1rem; font-weight: 700; }
        
        .flipkart-cart-item { display: grid; grid-template-columns: 100px 1fr; gap: 1rem; padding: 1rem; border-bottom: 1px solid #f0f0f0; }
        .cart-item-img { height: 100px; text-align: center; }
        .cart-item-img img { max-width: 100%; max-height: 100%; object-fit: contain; }
        
        .cart-item-info h3 { font-size: 0.9rem; font-weight: 400; margin-bottom: 0.3rem; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }
        .cart-item-info a { text-decoration: none; color: #212121; }
        .item-seller { font-size: 0.75rem; color: #878787; margin-bottom: 0.75rem; }
        
        .item-price-row { display: flex; align-items: baseline; gap: 0.5rem; margin-bottom: 1rem; }
        .curr-price { font-size: 1.1rem; font-weight: 700; color: #212121; }
        .orig-price { text-decoration: line-through; color: #878787; font-size: 0.8rem; }
        .price-off { color: #388e3c; font-size: 0.8rem; font-weight: 700; }
        
        .item-actions { display: flex; align-items: center; gap: 1.5rem; }
        .qty-ctrl { display: flex; align-items: center; gap: 0.4rem; }
        .qty-ctrl button { width: 26px; height: 26px; border-radius: 50%; border: 1px solid #e0e0e0; background: white; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 0.9rem; }
        .qty-ctrl input { width: 40px; height: 26px; text-align: center; border: 1px solid #e0e0e0; font-size: 0.85rem; border-radius: 2px; }
        
        .remove-btn { background: none; border: none; font-size: 0.9rem; font-weight: 700; color: #212121; cursor: pointer; }
        
        .delivery-info { font-size: 0.8rem; color: #212121; text-align: right; }
        @media (max-width: 1024px) {
           .flipkart-cart-item { grid-template-columns: 80px 1fr; }
           .delivery-info { position: absolute; top: 1rem; right: 1rem; display: none; }
        }

        .place-order-row { padding: 1rem; position: fixed; bottom: 0; left: 0; right: 0; background: white; display: flex; justify-content: flex-end; box-shadow: 0 -2px 10px rgba(0,0,0,0.1); z-index: 100; }
        .place-order-btn { background: #fb641b; color: white; border: none; padding: 0.8rem 3rem; font-size: 1rem; font-weight: 700; border-radius: 2px; cursor: pointer; width: 100%; max-width: 250px; }

        .price-details-card { background: white; padding: 1rem; box-shadow: var(--shadow); border-radius: 2px; position: sticky; top: 120px; margin-top: 0.5rem; }
        .price-details-card h3 { font-size: 0.9rem; color: #878787; border-bottom: 1px solid #f0f0f0; padding-bottom: 0.8rem; margin-bottom: 1rem; }
        .price-row { display: flex; justify-content: space-between; margin-bottom: 1rem; font-size: 0.95rem; color: #212121; }
        .total-amount-row { display: flex; justify-content: space-between; margin: 1rem 0; padding: 1rem 0; border-top: 1px dashed #e0e0e0; border-bottom: 1px dashed #e0e0e0; font-size: 1.1rem; font-weight: 700; }
        .discount-text { color: #388e3c; }
        .savings-msg { color: #388e3c; font-weight: 700; font-size: 0.85rem; }

        .empty-cart-container { background: #f1f3f6; min-height: 80vh; display: flex; align-items: center; justify-content: center; padding: 1rem; }
        .empty-cart-card { background: white; padding: 2rem; text-align: center; border-radius: 2px; box-shadow: var(--shadow); width: 100%; max-width: 500px; }
        
        @media (max-width: 1024px) {
          .cart-container { grid-template-columns: 1fr; }
          .price-details-card { position: relative; top: 0; }
          .place-order-btn { width: 100%; max-width: none; }
        }
      `}</style>
    </div>
  );
};

export default Cart;
