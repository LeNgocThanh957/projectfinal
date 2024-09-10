import './Login.css';
import {useContext, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import {MyContext} from "../MyContext";


function Login() {
    let [username, setUserName] = useState("");
    let [password, setPassWord] = useState("");
    let [passwordVisible, setPasswordVisible] = useState(false);
    const navigate = useNavigate();
    const { setCurrentUser} = useContext(MyContext);

    const changeUserName = (event) => {
        let dataInput = event.target.value;
        setUserName(dataInput);
    }

    const changePassWord = (event) => {
        let dataInput = event.target.value;
        setPassWord(dataInput);
    }

    const submit = () => {
        let user = {
            username: username,
            password: password,
        };

        axios.post("http://localhost:3000/users/login", user).then((response) => {

            if (response.status === 200) {
                alert("Đăng nhập thành công");
                setCurrentUser(response.data);
                // Kiểm tra nếu tên đăng nhập chứa chữ "admin"
                if (username.toLowerCase().includes("admin")) {
                    navigate("/admin/products");  // Chuyển hướng tới trang admin
                } else {
                    navigate("/home");  // Chuyển hướng tới trang home nếu không phải admin
                }

            } else {
                alert("Tên đăng nhập hoặc mật khẩu không đúng");
            }
            console.log('Response:', response);
        }).catch((error) => {
            console.error("There was an error!", error);
            alert("Đăng nhập thất bại");
        });
    }

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };
    return (
        <>
            <div className="login">
                <h1 className="login_title">LOGIN</h1>
                <div className="login_content">
                    <input className="login_username" value={username} placeholder="Username"
                           onChange={changeUserName}/>
                    <input className="login_password" type={passwordVisible ? 'text' : 'password'} value={password}
                           placeholder="Password" onChange={changePassWord}/>
                    <div className="login_register">
                        <button
                            type="button"
                            className="password_hide_presently1"
                            onClick={togglePasswordVisibility}
                        >
                            {passwordVisible ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
                        </button>
                        <Link to="register">
                            <button className="login_register--button">Register</button>
                        </Link>

                    </div>
                    <button className="login_submit" onClick={submit}>LOGIN</button>
                </div>
            </div>
        </>
    );
}

export default Login;