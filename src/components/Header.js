import './Header.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBagShopping, faSearch, faUser} from "@fortawesome/free-solid-svg-icons";
import {useContext, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {MyContext} from "../MyContext";

function Header({onSearch}) { // Nhận hàm onSearch từ props

    const [searchTerm, setSearchTerm] = useState(""); // State lưu trữ giá trị tìm kiếm
    const {currentUser, setCurrentUser} = useContext(MyContext);
    const navigate = useNavigate();
    // Hàm xử lý khi người dùng thay đổi input tìm kiếm
    console.log('Current User:', currentUser);
    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Hàm xử lý khi nhấn nút tìm kiếm
    const handleSearchClick = () => {
        onSearch(searchTerm); // Gửi giá trị tìm kiếm đến Content
    };

    const [isMenuVisible, setIsMenuVisible] = useState(false);

    const toggleMenuVisibility = () => {
        setIsMenuVisible(!isMenuVisible);
    };

    const handleLogout = () => {
        if (window.confirm("Bạn có chắc chắn muốn đăng xuất không?")) {
            // Xóa thông tin người dùng từ context và localStorage
            setCurrentUser({ username: '', password: '' });
            localStorage.removeItem('currentUser');
            // Điều hướng người dùng đến trang chủ
            navigate('/');
        }
    };
    return (
        <div className="Header">
            <div className="Header_sub1">
                <h1>THANH</h1>
            </div>
            <div className="Header_sub2">
                <div className="Header_sub2--a">
                    <input
                        className="Header_sub2--a1"
                        type="text"
                        placeholder="Tìm kiếm"
                        value={searchTerm} // Liên kết với state searchTerm
                        onChange={handleInputChange} // Cập nhật state khi người dùng nhập
                    />
                    <button className="Header_sub2--a2" onClick={handleSearchClick}>
                        <FontAwesomeIcon icon={faSearch}/>
                    </button>
                </div>
                <div className="Header_sub2--b">
                    <button className="Header_sub2--b1">Trang chủ</button>
                    <button className="Header_sub2--b1">Giới thiệu</button>
                    <button className="Header_sub2--b1">Sản phẩm</button>
                    <button className="Header_sub2--b1">Tin tức</button>
                    <button className="Header_sub2--b1">Liên hệ</button>
                    <button className="Header_sub2--b1">Câu hỏi thường gặp</button>
                    <button className="Header_sub2--b1">Hệ thống</button>
                </div>
            </div>
            <div className="Header_sub3">
                <div className="Header_sub3--a" onClick={toggleMenuVisibility}>
                    <div className="Header_sub3--a1">
                        <FontAwesomeIcon icon={faUser}/>
                    </div>
                    <h4>{currentUser.username}</h4>
                    <div style={{display: isMenuVisible ? "block" : "none"}}>
                        <button>Thông tin cá nhân</button>
                        <button onClick={handleLogout}>Đăng xuất</button>
                    </div>
                </div>
                <div className="Header_sub3--a">

                    <div className="Header_sub3--a1">
                        <FontAwesomeIcon icon={faBagShopping}/>
                    </div>
                    <Link to={'/cart'}>
                        <h4 style={{
                            textDecoration: "none",
                            color: "white",
                            borderBottom: "none",
                            cursor: "pointer"
                        }}>Giỏ hàng</h4>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Header;
