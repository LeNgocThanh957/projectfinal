import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminCart.css'; // Thay đổi theo tên file CSS của bạn
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';

function Cart() {
    const [carts, setCarts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch carts from API
        axios.get('http://localhost:3000/carts')
            .then(response => {
                setCarts(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError('Failed to fetch carts');
                setLoading(false);
            });
    }, []);

    const handleDelete = (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa giỏ hàng này không?')) {
            axios.delete(`http://localhost:3000/carts/${id}`)
                .then(() => {
                    setCarts(carts.filter(cart => cart.id !== id));
                })
                .catch(error => {
                    setError('Failed to delete cart');
                });
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="cart-container">
            <Link to="/admin" className="back-button">
                <FontAwesomeIcon icon={faCircleArrowLeft} /> Back to Admin
            </Link>
            <h2>Cart List</h2>
            <table className="cart-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>User</th>
                    <th>Total</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {carts.map(cart => (
                    <tr key={cart.id}>
                        <td>{cart.id}</td>
                        <td>{cart.user}</td>
                        <td>{cart.total} VND</td>
                        <td>{new Date(cart.date).toLocaleDateString()}</td>
                        <td>
                            <Link to={`/admin/cart/${cart.id}`} className="view-button">View</Link>
                            <button
                                className="delete-button"
                                onClick={() => handleDelete(cart.id)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default Cart;
