const Footer = () => {
  return (
    <footer style={{
      background: 'var(--bg-card)',
      color: 'var(--text-main)',
      padding: '4rem 0',
      marginTop: '4rem',
      borderTop: '1px solid var(--border)'
    }}>
      <div className="container" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '4rem'
      }}>
        <div className="footer-section">
          <h3 style={{color: 'var(--primary)', marginBottom: '1.5rem'}}>PREMIUM SHOP</h3>
          <p style={{color: 'var(--text-muted)', fontSize: '0.9rem'}}>
            The world's leading destination for premium lifestyle products. 
            Curated with care, delivered with excellence.
          </p>
        </div>
        <div className="footer-section">
          <h4 style={{color: 'var(--primary)', marginBottom: '1.25rem'}}>Quick Links</h4>
          <ul style={{listStyle: 'none', color: 'var(--text-muted)', fontSize: '0.9rem'}}>
            <li style={{marginBottom: '0.5rem'}}>Shop All</li>
            <li style={{marginBottom: '0.5rem'}}>Featured</li>
            <li style={{marginBottom: '0.5rem'}}>Recent Arrivals</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4 style={{color: 'var(--primary)', marginBottom: '1.25rem'}}>Contact</h4>
          <p style={{color: 'var(--text-muted)', fontSize: '0.9rem'}}>
            support@premiumshop.com<br/>
            123 Luxury Lane, Grace City
          </p>
        </div>
      </div>
      <div className="container" style={{
        marginTop: '3rem',
        paddingTop: '2rem',
        borderTop: '1px solid var(--border)',
        textAlign: 'center',
        color: 'var(--text-muted)',
        fontSize: '0.8rem'
      }}>
        &copy; 2026 Premium Shop. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
