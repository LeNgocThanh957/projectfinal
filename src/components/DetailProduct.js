import './DetailProduct.css';
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faArrowRight, faCartPlus, faCircleArrowLeft} from "@fortawesome/free-solid-svg-icons";
import { useCart } from './Cart'; // Đảm bảo đường dẫn đúng
import { toast } from 'react-toastify'; // Import toast từ react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import CSS của react-toastify

function DetailProduct() {
    const [data, setData] = useState([]);
    let { id } = useParams();
    const { addToCart } = useCart(); // Sử dụng Cart Context

    useEffect(() => {
        axios.get("http://localhost:3000/products/" + id).then(res => {
            setData(res.data);
        });
    }, [id]);

    const [activeButton, setActiveButton] = useState(null);
    const [count, setCount] = useState(1);

    const handleClick = (index) => {
        setActiveButton(index);
    };

    const increment = () => {
        setCount(count + 1);
    };

    const decrement = () => {
        setCount(count > 0 ? count - 1 : 0); // Không cho phép số lượng âm
    };

    const handleAddToCart = () => {
        if (count > 0) {
            addToCart(data, count); // Thêm số lượng vào item
            toast.success('Thêm vào giỏ hàng thành công!', {
                position: "top-right"
            });
        } else {
            toast.error('Số lượng không hợp lệ!', {
                position: "top-right"
            });
        }
    };

    return (
        <div className="DetailProduct">
            <Link to={'/home'} style={{
                width: "50px",
                height: "50px",
                fontSize: "30px",
                color: "black",
                paddingLeft: "5px"
            }}><FontAwesomeIcon icon={faCircleArrowLeft} /></Link>
            <div className="DetailProduct__1">
                <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0"
                                className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
                                aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
                                aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src={data.image1} className="d-block w-100" alt="First slide" />
                        </div>
                        <div className="carousel-item">
                            <img src={data.image2} className="d-block w-100" alt="Second slide" />
                        </div>
                        <div className="carousel-item">
                            <img src={data.image3} className="d-block w-100" alt="Third slide" />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
                            data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
                            data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            <div className="DetailProduct__2">
                <div className="DetailProduct__2-a">
                    {data.name}
                </div>
                <div className="DetailProduct__2-c">
                    Giá: {data.price}đ
                </div>
                <div className="DetailProduct__2-b">
                    Thể loại:<p style={{ color: "red", padding: "0 3px" }}>{data.category}</p> |
                    Số lượng còn lại: <p style={{ color: "red", paddingLeft: "3px" }}>{data.quantity}</p>
                </div>

                <div className="DetailProduct__2-d">
                    <h3 style={{fontSize:"28px", whiteSpace:"nowrap"}}>Kích thước:</h3>
                    <button className={activeButton === 1 ? 'active' : ''}
                            onClick={() => handleClick(1)}
                    >36
                    </button>
                    <button className={activeButton === 2 ? 'active' : ''}
                            onClick={() => handleClick(2)}>37
                    </button>
                    <button className={activeButton === 3 ? 'active' : ''}
                            onClick={() => handleClick(3)}>38
                    </button>
                    <button className={activeButton === 4 ? 'active' : ''}
                            onClick={() => handleClick(4)}>39
                    </button>
                    <button className={activeButton === 5 ? 'active' : ''}
                            onClick={() => handleClick(5)}>40
                    </button>
                    <button className={activeButton === 6 ? 'active' : ''}
                            onClick={() => handleClick(6)}>41
                    </button>
                    <button className={activeButton === 7 ? 'active' : ''}
                            onClick={() => handleClick(7)}>42
                    </button>
                    <button className={activeButton === 8 ? 'active' : ''}
                            onClick={() => handleClick(8)}>43
                    </button>
                    <button className={activeButton === 9 ? 'active' : ''}
                            onClick={() => handleClick(9)}>44
                    </button>
                </div>
                <div className="DetailProduct__2-e">
                    <h3>Số lượng:</h3>
                    <div className="DetailProduct__2-e2">
                        <button className="decrement-button" onClick={decrement}>-</button>
                        <span className="count">{count}</span>
                        <button className="decrement-button" onClick={increment}>+</button>
                    </div>
                </div>
                <div className="DetailProduct__2-g">
                    <div className="DetailProduct__2-g1" onClick={handleAddToCart}><FontAwesomeIcon icon={faCartPlus} />
                        <h3 className="DetailProduct__2-g1a">Thêm vào giỏ hàng</h3>
                    </div>
                    <div className="DetailProduct__2-g2">
                        <h3 className="DetailProduct__2-g1a">Mua ngay</h3>
                    </div>
                </div>
            </div>
            <Link to={'/cart'}>
                <button style={{whiteSpace:"nowrap", border:"none", background:"black", color:"white"}}>Giỏ hàng <FontAwesomeIcon icon={faArrowRight} /></button>
            </Link>
        </div>
    );
}

export default DetailProduct;