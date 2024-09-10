import React from 'react';
import './Admin.css';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const Admin = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Hiển thị hộp thoại xác nhận khi người dùng nhấn vào Logout
        const confirmLogout = window.confirm("Bạn có chắc chắn muốn đăng xuất không?");
        if (confirmLogout) {
            // Điều hướng về trang đăng nhập
            navigate("/");
        }
    };

    return (
        <div className="admin-container">
            {/* Sidebar */}
            <div className="sidebar">
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <Link className="nav-link" to="/admin/products">Products</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/admin/categories">Category</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/admin/cart">Cart</Link>
                    </li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="main-content">
                {/* Header */}
                <header className="header">
                    <span className="navbar-brand">Admin Panel</span>
                    <nav>
                        <Link className="nav-link" to="/admin/profile">Profile</Link>
                        <button className="nav-link" onClick={handleLogout}>Logout</button>
                    </nav>
                </header>

                {/* Dashboard Content */}
                <Outlet />

                {/* Footer */}
                <footer className="footer">
                    <p>© 2024 Your Company. All Rights Reserved.</p>
                </footer>
            </div>
        </div>
    );
};

export default Admin;
