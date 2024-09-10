import React, { useState } from 'react';
import axios from 'axios';
import './AdminAddProduct.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {Link, useNavigate} from "react-router-dom";

function AddProduct() {
    const [product, setProduct] = useState({
        name: '',
        image1: '',
        price: '',
        quantity: '',
        category: ''
    });
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Gọi API để thêm sản phẩm mới
        axios.post('http://localhost:3000/products', product)
            .then(response => {
                console.log('Product added successfully:', response.data);
                // Xử lý sau khi thêm sản phẩm thành công
                setProduct({
                    name: '',
                    image1: '',
                    price: '',
                    quantity: '',
                    category: ''
                });
            })
            .catch(error => {
                console.error('There was an error adding the product:', error);
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
            }}><FontAwesomeIcon icon={faCircleArrowLeft} /></Link>
            <div className="add-product-container">
                <h2>Add New Product</h2>
                <form className="add-product-form" onSubmit={handleSubmit}>
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

                    <Link to={'/admin/products'}>
                        <button type="submit" className="submit-button">Add Product
                        </button>
                    </Link>

                </form>
            </div>
        </>

    );
}

export default AddProduct;
