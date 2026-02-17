import React, { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

const InfoPage = () => {
  const { slug } = useParams();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const getPageContent = (slug) => {
    switch (slug) {
      case 'about-us':
        return {
          title: 'About Us',
          content: 'Welcome to our platform. We are dedicated to providing the best shopping experience for our customers. Our journey started with a simple idea: to make premium products accessible to everyone.'
        };
      case 'contact-us':
        return {
          title: 'Contact Us',
          content: 'Have questions? We\'re here to help. You can reach out to us at support@premiumshop.com or visit our help center.'
        };
      case 'careers':
        return {
          title: 'Careers',
          content: 'Join our team! We are always looking for talented individuals to help us grow and innovate.'
        };
      case 'payments':
        return {
          title: 'Payments',
          content: 'We support various payment methods including Credit/Debit cards, UPI, and Net Banking to ensure a smooth checkout experience.'
        };
      case 'shipping':
        return {
          title: 'Shipping',
          content: 'We offer fast and reliable shipping across the country. Track your orders in real-time from your profile.'
        };
      case 'returns':
        return {
          title: 'Cancellation & Returns',
          content: 'Easy cancellations and returns within 30 days of purchase. Visit our help center for more details.'
        };
      case 'terms-of-use':
        return {
          title: 'Terms of Use',
          content: 'By using our website, you agree to our terms and conditions. Please read them carefully.'
        };
      case 'privacy-policy':
        return {
          title: 'Privacy Policy',
          content: 'Your privacy is important to us. We protect your personal data and ensure a secure shopping environment.'
        };
      default:
        return {
          title: 'Information',
          content: 'This page contains important information about our services and policies.'
        };
    }
  };

  const { title, content } = getPageContent(slug);

  return (
    <div className="container" style={{ padding: '4rem 1rem', minHeight: '60vh' }}>
      <h1 style={{ marginBottom: '2rem', color: 'var(--text-main)' }}>{title}</h1>
      <div style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '1.1rem' }}>
        <p>{content}</p>
        <p style={{ marginTop: '1rem' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </p>
      </div>
    </div>
  );
};

export default InfoPage;
