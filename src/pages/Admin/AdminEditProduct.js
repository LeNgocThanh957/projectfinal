import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminEditProduct.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams, useNavigate } from "react-router-dom";

function EditProduct() {
    const { id } = useParams(); // Lấy productId từ URL
    const [product, setProduct] = useState({
        name: '',
        image1: '',
        price: '',
        quantity: '',
        category: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        // Gọi API để lấy thông tin sản phẩm theo productId
        axios.get(`http://localhost:3000/products/${id}`)
            .then(response => {
                // Đảm bảo rằng dữ liệu từ API có cấu trúc đúng
                const fetchedProduct = response.data;
                if (fetchedProduct) {
                    setProduct({
                        name: fetchedProduct.name || '',
                        image1: fetchedProduct.image1 || '',
                        price: fetchedProduct.price || '',
                        quantity: fetchedProduct.quantity || '',
                        category: fetchedProduct.category || ''
                    });
                }
            })
            .catch(error => {
                console.error('There was an error fetching the product:', error);
            });
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Gọi API để cập nhật sản phẩm
        axios.put(`http://localhost:3000/products/${id}`, product)
            .then(response => {
                console.log('Product updated successfully:', response.data);
                // Điều hướng về trang danh sách sản phẩm sau khi cập nhật thành công
                navigate('/admin/products');
            })
            .catch(error => {
                console.error('There was an error updating the product:', error);
            });
    };

    return (
        <>
            <Link to={'/admin/products'} style={{
                width: "50px",
                height: "50px",
                fontSize: "30px",
                color: "black",
                paddingLeft: "5px"
            }}>
                <FontAwesomeIcon icon={faCircleArrowLeft} />
            </Link>
            <div className="edit-product-container">
                <h2>Edit Product</h2>
                <form className="edit-product-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Product Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={product.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="image1">Image URL:</label>
                        <input
                            type="text"
                            id="image1"
                            name="image1"
                            value={product.image1}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="price">Price:</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={product.price}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="quantity">Quantity:</label>
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            value={product.quantity}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="category">Category:</label>
                        <input
                            type="text"
                            id="category"
                            name="category"
                            value={product.category}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <button type="submit" className="submit-button">Update Product</button>
                </form>
            </div>
        </>
    );
}

export default EditProduct;
