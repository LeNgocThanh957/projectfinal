import { useState } from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import Content from "../components/Content";

function Home() {
    const [searchTerm, setSearchTerm] = useState("");

    // Hàm xử lý thay đổi từ khóa tìm kiếm
    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    return (
        <>
            <Header onSearch={handleSearch} />
            <Content searchTerm={searchTerm} />
            <Footer />
        </>
    );
}

export default Home;
