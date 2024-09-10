import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import './Register.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";

function Register() {
    const [username, setUserName] = useState("");
    const [password, setPassWord] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setConfirmShowPassword] = useState(false); // Trạng thái để hiện/ẩn mật khẩu
    const navigate = useNavigate();

    const changeUserName = (event) => {
        setUserName(event.target.value);
    };

    const changePassWord = (event) => {
        setPassWord(event.target.value);
    };

    const changeConfirmPassword = (event) => {
        setConfirmPassword(event.target.value);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword); // Đảo trạng thái hiện/ẩn mật khẩu
    };

    const togglePasswordVisibility2 = () => {
        setConfirmShowPassword(!showConfirmPassword); // Đảo trạng thái hiện/ẩn mật khẩu
    };

    const submit = () => {
        if (username === "" || password === "") {
            alert("Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu.");
            return; // Ngăn không cho đăng ký nếu không nhập đủ
        }
        if (password.length < 6) {
            alert("Mật khẩu phải chứa ít nhất 6 ký tự.");
            return; // Ngăn không cho đăng ký nếu mật khẩu không đủ độ dài
        }

        if (password !== confirmPassword) {
            alert("Mật khẩu và xác nhận mật khẩu không khớp.");
            return; // Ngăn không cho đăng ký nếu mật khẩu và xác nhận mật khẩu không khớp
        }

        const user = {
            username: username,
            password: password,
            confirmPassword: confirmPassword
        };

        axios.post("http://localhost:3000/users/register", user)
            .then(() => {
                alert("Đăng ký thành công");
                navigate("/"); // Điều hướng về login
            })
            .catch((error) => {
                console.error("Có lỗi xảy ra:", error);
                alert("Đăng ký thất bại. Vui lòng thử lại.");
            });
    };

    return (
        <div className="register">
            <h1 className="register_title">REGISTER</h1>
            <div className="register_content">
                <input
                    className="register_username"
                    value={username}
                    placeholder="Enter Username"
                    onChange={changeUserName}
                />
                <div className="register_box--password">
                    <input
                        className="register_password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        placeholder="Enter password"
                        onChange={changePassWord}
                    />
                    <button
                        type="button"
                        className="password_hide_presently"
                        onClick={togglePasswordVisibility}
                    >
                        {showPassword ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
                    </button>
                </div>
                <div className="register_box--password">
                    <input
                        className="register_password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        placeholder="Re-enter the password"
                        onChange={changeConfirmPassword}
                    />
                    <button
                        type="button"
                        className="password_hide_presently"
                        onClick={togglePasswordVisibility2}
                    >
                        {showConfirmPassword ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
                    </button>
                </div>
                <Link to="/">
                    <button className="register_login--button">Login</button>
                </Link>
                <button className="register_submit" onClick={submit}>REGISTER</button>
            </div>
        </div>
    );
}

export default Register;
