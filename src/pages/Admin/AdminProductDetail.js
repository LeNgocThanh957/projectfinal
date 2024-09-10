import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link, useParams} from 'react-router-dom';
import './AdminProductDetail.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleArrowLeft} from "@fortawesome/free-solid-svg-icons";

function ProductDetail() {
    const { id } = useParams(); // Lấy ID sản phẩm từ URL
    const [product, setProduct] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:3000/products/${id}`)
            .then(response => {
                setProduct(response.data);
            })
            .catch(error => {
                console.error("Đã xảy ra lỗi khi lấy thông tin sản phẩm:", error);
            });
    }, [id]);

    if (!product) {
        return <div>Đang tải dữ liệu...</div>;
    }

    return (
        <>
            <Link to={'/admin/products'} style={{
                width: "50px",
                height: "50px",
                fontSize: "30px",
                color: "black",
                paddingLeft: "5px"
            }}>
                <FontAwesomeIcon icon={faCircleArrowLeft}/>
            </Link>
            <div className="product-detail-wrapper">
                <h1 className="product-detail-title">{product.name}</h1>
                <div className="product-detail-images">
                    <img src={product.image1} alt={product.name} className="product-detail-image"/>
                    {/* Nếu có thêm hình ảnh, bạn có thể thêm vào đây */}
                </div>
                <div className="product-detail-info">
                    <p className="product-detail-price">Price: {product.price} VND</p>
                    <p className="product-detail-quantity">Quantity: {product.quantity}</p>
                    <p className="product-detail-category">Category: {product.category}</p>
                    {/* Thêm thông tin khác nếu có */}
                </div>
            </div>
        </>

    );
}

export default ProductDetail;
