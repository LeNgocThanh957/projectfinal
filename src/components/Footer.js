import './Footer.css';
import {faFacebook} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


function Footer() {


    return (
        <div className="Footer">
            <div className="Footer_sub1">
                <h1 className="Footer_sub1a">Thông tin liên hệ</h1>
                <a className="Footer_sub1b" href="https://www.facebook.com/LeNgocThanh.KA/"><FontAwesomeIcon icon={faFacebook}/>Lê Ngọc Thanh</a>
            </div>
            <div className="Footer_sub2">
                @ Bản quyền thuộc về Lê Ngọc Thanh
            </div>

        </div>
    )
}

export default Footer;