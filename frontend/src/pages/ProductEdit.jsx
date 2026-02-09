import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const ProductEdit = () => {
    const { id: productId } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/products/${productId}`);
                setName(data.name);
                setPrice(data.price);
                setImage(data.image);
                setBrand(data.brand);
                setCategory(data.category);
                setCountInStock(data.countInStock);
                setDescription(data.description);
            } catch (error) {
                setError(error.response?.data?.message || error.message);
            }
        };

        if (user && user.isAdmin) {
            fetchProduct();
        } else {
            navigate('/login');
        }
    }, [productId, user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
            };

            await axios.put(
                `http://localhost:5000/api/products/${productId}`,
                { name, price, image, brand, category, countInStock, description },
                config
            );
            setLoading(false);
            navigate('/admin/products');
        } catch (error) {
            setError(error.response?.data?.message || error.message);
            setLoading(false);
        }
    };

    return (
        <div className="container product-edit-page">
            <Link to="/admin/products" className="btn btn-light" style={{marginBottom: '2rem'}}>Go Back</Link>
            
            <div className="edit-card">
                <h1>Edit Product</h1>
                {error && <div className="alert alert-danger">{error}</div>}
                
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Price</label>
                        <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} required />
                    </div>
                    <div className="form-group">
                        <label>Image URL</label>
                        <input type="text" value={image} onChange={(e) => setImage(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Brand</label>
                        <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Category</label>
                        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Count In Stock</label>
                        <input type="number" value={countInStock} onChange={(e) => setCountInStock(Number(e.target.value))} required />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea rows="5" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                    </div>
                    
                    <button type="submit" className="btn btn-primary" style={{width: '100%'}} disabled={loading}>
                        {loading ? 'Updating...' : 'Update Product'}
                    </button>
                </form>
            </div>

            <style>{`
                .product-edit-page { padding: 4rem 2rem; }
                .edit-card {
                    background: var(--bg-card);
                    padding: 3rem;
                    border-radius: 1.5rem;
                    box-shadow: var(--shadow-lg);
                    max-width: 600px;
                    margin: 0 auto;
                }
                .edit-card h1 { margin-bottom: 2rem; text-align: center; font-size: 2rem; }
                .form-group { margin-bottom: 1.5rem; }
                .form-group label { display: block; margin-bottom: 0.5rem; font-weight: 600; font-size: 0.9rem; }
                .form-group input, .form-group textarea {
                    width: 100%;
                    padding: 0.75rem 1rem;
                    border: 1px solid var(--border);
                    border-radius: 0.5rem;
                    font-size: 1rem;
                    font-family: inherit;
                }
                .alert { padding: 1rem; border-radius: 0.5rem; margin-bottom: 1rem; text-align: center; background: #fee2e2; color: #b91c1c; }

                @media (max-width: 768px) {
                    .product-edit-page { padding: 2rem 1rem; }
                    .edit-card { padding: 2rem; }
                    .edit-card h1 { font-size: 1.5rem; }
                }
            `}</style>
        </div>
    );
};

export default ProductEdit;
