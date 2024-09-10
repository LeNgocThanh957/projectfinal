import './Content.css';
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { useCart } from './Cart'; // Đảm bảo đường dẫn đúng
import { toast } from 'react-toastify'; // Import toast từ react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import CSS của react-toastify

function Content({ searchTerm }) {
    const [list, setList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const { addToCart } = useCart(); // Sử dụng Cart Context

    useEffect(() => {
        axios.get("http://localhost:3000/products")
            .then(response => {
                setList(response.data);
                setFilteredList(response.data);
                setCurrentPage(1);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);

    useEffect(() => {
        let filtered = list;

        if (selectedCategory) {
            filtered = filtered.filter(item => item.category === selectedCategory);
        }

        if (searchTerm) {
            filtered = filtered.filter(item =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredList(filtered);
        setCurrentPage(1);
    }, [searchTerm, selectedCategory, list]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredList.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredList.length / itemsPerPage);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo(0, 0);
    };

    const handleAddToCart = (item) => {
        const quantity = parseInt(prompt("Nhập số lượng:", 1), 10); // Yêu cầu nhập số lượng

        if (quantity && quantity > 0) {
            addToCart(item, quantity); // Thêm số lượng vào item
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
        <div className="Content">
            <div className="Content1">
                <div className="Content1__a">Danh mục sản phẩm</div>
                {["", "Thể thao", "Công nghệ", "Du lịch", "Giáo dục", "Nghệ thuật"].map(category => (
                    <button
                        key={category}
                        className={`Content1__b ${selectedCategory === category ? "highlighted" : ""}`}
                        onClick={() => setSelectedCategory(category)}
                    >
                        {category || "Tất cả sản phẩm"}
                    </button>
                ))}
            </div>
            <div className="Content2">
                <div className="Content2__a"><h1>Danh sách sản phẩm</h1></div>
                {currentItems.length === 0 ? (
                    <p>Không có sản phẩm nào.</p>
                ) : (
                    currentItems.map(item => (
                        <div className="Content2__a-1" key={item.id}>
                            <Link to={'/detail/' + item.id} className="Content2__a-1a">{item.name}</Link>
                            <img className="Content2__a-1b" src={item.image1} alt={item.name}/>
                            <div className="Content2__a-1c">Giá: {item.price}</div>
                            <Link to={'/detail/' + item.id} className="Content2__a-1c2">Xem chi tiết</Link>
                            <div className="Content2__a-1d" onClick={() => handleAddToCart(item)}>
                                <FontAwesomeIcon
                                    icon={faCartPlus}
                                    style={{ cursor: 'pointer' }} // Thay đổi con trỏ khi hover
                                />
                                <h2 className="Content2__a-1d-a">Thêm vào giỏ hàng</h2>
                            </div>
                            <div className="Content2__a-1e">
                                <h2 className="Content2__a-1d-a">Mua ngay</h2>
                            </div>
                        </div>
                    ))
                )}
                <div className="pagination">
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => paginate(index + 1)}
                            className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
            <div className="Content3">
                <img className="Content3__a" src="https://img.pikbest.com/01/56/36/37y888piCJs5.jpg!f305cw" alt=""/>
            </div>
        </div>
    );
}

export default Content;
