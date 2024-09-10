import './App.css';
import {Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import DetailProduct from "./components/DetailProduct";
import Cart from "./components/Cart";
import Admin from "./pages/Admin/Admin";
import AdminProducts from "./pages/Admin/AdminProducts";
import AdminAddProduct from "./pages/Admin/AdminAddProduct";
import AdminEditProduct from "./pages/Admin/AdminEditProduct";
import AdminProductDetail from "./pages/Admin/AdminProductDetail";
import AdminCategory from "./pages/Admin/AdminCategory";
import AdminCart from "./pages/Admin/AdminCart";

function App() {
    return (
        <Routes>
            <Route path="home" element={<Home/>}></Route>
            <Route path="register" element={<Register/>}></Route>
            <Route path="/" element={<Login/>}></Route>
            <Route path="cart" element={<Cart/>}></Route>
            <Route element={<DetailProduct/>} path="detail/:id"></Route>
            <Route path="admin" element={<Admin/>}>
                <Route path="addproduct" element={<AdminAddProduct/>}></Route>
                <Route path="productdetail/:id" element={<AdminProductDetail/>}></Route>
                <Route path="products" element={<AdminProducts/>}></Route>
                <Route path="editproduct/:id" element={<AdminEditProduct/>}></Route>
                <Route path="categories" element={<AdminCategory/>}></Route>
                <Route path="cart" element={<AdminCart/>}></Route>
            </Route>

        </Routes>
    );
}

export default App;
