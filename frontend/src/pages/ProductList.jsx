import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();
    const navigate = useNavigate();

    const fetchProducts = async () => {
        try {
            const { data } = await axios.get(`${API_BASE_URL}/api/products`);
            setProducts(data);
            setLoading(false);
        } catch (error) {
            setError(error.response?.data?.message || error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user && user.isAdmin) {
            fetchProducts();
        } else {
            navigate('/login');
        }
    }, [user, navigate]);

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                };
                await axios.delete(`${API_BASE_URL}/api/products/${id}`, config);
                fetchProducts(); // Refresh list
            } catch (error) {
                alert(error.response?.data?.message || error.message);
            }
        }
    };

    const createProductHandler = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.post(`${API_BASE_URL}/api/products`, {}, config);
            navigate(`/admin/product/${data._id}/edit`);
        } catch (error) {
            alert(error.response?.data?.message || error.message);
        }
    };

    if (loading) return <div className="container">Loading...</div>;
    if (error) return <div className="container alert alert-danger">{error}</div>;

    return (
        <div className="container admin-product-list">
            <div className="header-row">
                <h1>Products Catalog</h1>
                <button className="btn btn-primary" onClick={createProductHandler}>
                    + Create Product
                </button>
            </div>
            
            <div className="table-responsive">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>BRAND</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>${product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>
                                    <div className="actions">
                                        <Link to={`/admin/product/${product._id}/edit`} className="edit-btn">Edit</Link>
                                        <button className="delete-btn" onClick={() => deleteHandler(product._id)}>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <style>{`
                .admin-product-list { padding: 4rem 2rem; }
                .header-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2.5rem; }
                .header-row h1 { font-size: 2rem; }
                .table-responsive { overflow-x: auto; background: var(--bg-card); border-radius: 1rem; box-shadow: var(--shadow); }
                table { width: 100%; border-collapse: collapse; text-align: left; }
                th, td { padding: 1.25rem; border-bottom: 1px solid var(--border); }
                th { background: rgba(0,0,0,0.02); font-weight: 700; color: var(--primary); font-size: 0.9rem; text-transform: uppercase; }
                tr:hover { background: rgba(0,0,0,0.01); }
                .actions { display: flex; gap: 1rem; }
                .edit-btn { text-decoration: none; color: #2563eb; font-weight: 600; }
                .delete-btn { background: none; border: none; color: #dc2626; font-weight: 600; cursor: pointer; }
            `}</style>
        </div>
    );
};

export default ProductList;
