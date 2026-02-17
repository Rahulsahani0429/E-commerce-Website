import { Link } from 'react-router-dom';

const Footer = () => {
  const footerStyle = {
    background: '#172337',
    color: '#fff',
    padding: '40px 0 0 0',
    fontFamily: 'Inter, sans-serif',
    fontSize: '12px',
    marginTop: '40px'
  };

  const containerStyle = {
    maxWidth: '1248px',
    margin: '0 auto',
    padding: '0 10px',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  };

  const sectionStyle = {
    flex: '1',
    minWidth: '150px',
    marginBottom: '20px',
    padding: '0 10px'
  };

  const headingStyle = {
    color: '#878787',
    fontSize: '12px',
    fontWeight: '400',
    marginBottom: '10px',
    textTransform: 'uppercase'
  };

  const listStyle = {
    listStyle: 'none',
    padding: 0,
    margin: 0
  };

  const listItemStyle = {
    marginBottom: '5px'
  };

  const linkStyle = {
    color: '#fff',
    textDecoration: 'none',
    fontWeight: '500'
  };

  const bottomBarStyle = {
    borderTop: '1px solid #454d5e',
    padding: '25px 0',
    marginTop: '40px',
    background: '#172337'
  };

  const bottomContainerStyle = {
    maxWidth: '1248px',
    margin: '0 auto',
    padding: '0 10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap'
  };

  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        <div style={sectionStyle}>
          <h4 style={headingStyle}>ABOUT</h4>
          <ul style={listStyle}>
            <li style={listItemStyle}><Link to="/info/contact-us" style={linkStyle}>Contact Us</Link></li>
            <li style={listItemStyle}><Link to="/info/about-us" style={linkStyle}>About Us</Link></li>
            <li style={listItemStyle}><Link to="/info/careers" style={linkStyle}>Careers</Link></li>
            <li style={listItemStyle}><Link to="/info/flipkart-stories" style={linkStyle}>Flipkart Stories</Link></li>
            <li style={listItemStyle}><Link to="/info/press" style={linkStyle}>Press</Link></li>
            <li style={listItemStyle}><Link to="/info/corporate-information" style={linkStyle}>Corporate Information</Link></li>
          </ul>
        </div>

        <div style={sectionStyle}>
          <h4 style={headingStyle}>HELP</h4>
          <ul style={listStyle}>
            <li style={listItemStyle}><Link to="/info/payments" style={linkStyle}>Payments</Link></li>
            <li style={listItemStyle}><Link to="/info/shipping" style={linkStyle}>Shipping</Link></li>
            <li style={listItemStyle}><Link to="/info/returns" style={linkStyle}>Cancellation & Returns</Link></li>
            <li style={listItemStyle}><Link to="/info/faq" style={linkStyle}>FAQ</Link></li>
          </ul>
        </div>

        <div style={sectionStyle}>
          <h4 style={headingStyle}>CONSUMER POLICY</h4>
          <ul style={listStyle}>
            <li style={listItemStyle}><Link to="/info/returns" style={linkStyle}>Cancellation & Returns</Link></li>
            <li style={listItemStyle}><Link to="/info/terms-of-use" style={linkStyle}>Terms Of Use</Link></li>
            <li style={listItemStyle}><Link to="/info/security" style={linkStyle}>Security</Link></li>
            <li style={listItemStyle}><Link to="/info/privacy-policy" style={linkStyle}>Privacy</Link></li>
            <li style={listItemStyle}><Link to="/info/sitemap" style={linkStyle}>Sitemap</Link></li>
            <li style={listItemStyle}><Link to="/info/grievance-redressal" style={linkStyle}>Grievance Redressal</Link></li>
          </ul>
        </div>

        <div style={sectionStyle}>
          <h4 style={headingStyle}>GROUP COMPANIES</h4>
          <ul style={listStyle}>
            <li style={listItemStyle}><a href="https://www.myntra.com" target="_blank" rel="noopener noreferrer" style={linkStyle}>Myntra</a></li>
            <li style={listItemStyle}><a href="https://www.cleartrip.com" target="_blank" rel="noopener noreferrer" style={linkStyle}>Cleartrip</a></li>
            <li style={listItemStyle}><a href="https://www.shopsy.in" target="_blank" rel="noopener noreferrer" style={linkStyle}>Shopsy</a></li>
          </ul>
        </div>

        <div style={{ ...sectionStyle, borderLeft: '1px solid #454d5e', paddingLeft: '25px', flex: '1.5' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ flex: 1 }}>
              <h4 style={headingStyle}>Mail Us:</h4>
              <p style={{ color: '#fff', lineHeight: '1.4' }}>
                Flipkart Internet Private Limited,<br />
                Buildings Alyssa, Begonia &<br />
                Clove Embassy Tech Village,<br />
                Outer Ring Road, Devarabeesanahalli Village,<br />
                Bengaluru, 560103,<br />
                Karnataka, India
              </p>
            </div>
            <div style={{ flex: 1, marginLeft: '20px' }}>
              <h4 style={headingStyle}>Registered Office Address:</h4>
              <p style={{ color: '#fff', lineHeight: '1.4' }}>
                Flipkart Internet Private Limited,<br />
                Buildings Alyssa, Begonia &<br />
                Clove Embassy Tech Village,<br />
                Outer Ring Road, Devarabeesanahalli Village,<br />
                Bengaluru, 560103,<br />
                Karnataka, India<br />
                CIN : U51109KA2012PTC066107<br />
                Telephone: <span style={{ color: '#2874f0' }}>044-45614700</span> / <span style={{ color: '#2874f0' }}>044-67415800</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div style={bottomBarStyle}>
        <div style={bottomContainerStyle}>
          <div style={{ display: 'flex', gap: '25px' }}>
            <Link to="/info/seller" style={{ ...linkStyle, display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ color: '#ffc200' }}>⭐</span> Become a Seller
            </Link>
            <Link to="/info/advertise" style={{ ...linkStyle, display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ color: '#ffc200' }}>⭐</span> Advertise
            </Link>
            <Link to="/info/gift-cards" style={{ ...linkStyle, display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ color: '#ffc200' }}>🎁</span> Gift Cards
            </Link>
            <Link to="/info/help-center" style={{ ...linkStyle, display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ color: '#ffc200' }}>❓</span> Help Center
            </Link>
          </div>
          <div>
            &copy; 2007-2026 Flipkart.com
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/payment-method-69e7ec.svg" style={{ height: '20px' }} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
