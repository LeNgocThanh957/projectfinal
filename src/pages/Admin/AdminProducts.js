import React, { useEffect, useState } from 'react';
import axios from "axios";
import './AdminProducts.css';
import { Link } from "react-router-dom";

function AdminProducts() {
    const [list, setList] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/products").then(response => {
            setList(response.data);
        });
    }, []);

    const handleDelete = (id) => {
        const isConfirmed = window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?");
        if (isConfirmed) {
            axios.delete(`http://localhost:3000/products/${id}`).then(() => {
                setList(list.filter(item => item.id !== id));
            });
        }
    };

    return (
        <div className="content">
            <div style={{ fontSize: "35px", fontWeight: "700" }}>DANH SÁCH SẢN PHẨM</div>
            <Link to="/admin/addproduct">
                <button style={{ fontSize: "15px", fontWeight: "700", height: "50px", width: "200px" }}>
                    Thêm mới sản phẩm
                </button>
            </Link>

            {list.map(item => (
                <div key={item.id} className="product-detail">
                    <Link to={`/admin/productdetail/${item.id}`}>
                        <h1 className="product-title">{item.name}</h1>
                    </Link>

                    <div className="product-images">
                        <img src={item.image1} alt={item.name} className="product-image" />
                    </div>
                    <div className="product-info">
                        <p className="product-price">Price: {item.price} VND</p>
                        <p className="product-quantity">Quantity: {item.quantity}</p>
                        <p className="product-category">Category: {item.category}</p>
                    </div>
                    <div className="product-actions">
                        <Link to={`/admin/editproduct/${item.id}`}>
                            <button className="edit-button">Sửa</button>
                        </Link>
                        <button className="delete-button" onClick={() => handleDelete(item.id)}>Xóa</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default AdminProducts;
