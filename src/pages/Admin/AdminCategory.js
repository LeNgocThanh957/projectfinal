import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminCategory.css';

function CategoryList() {
    const [categories, setCategories] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [newName, setNewName] = useState('');
    const [newCategoryName, setNewCategoryName] = useState('');
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:3000/categories")
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error("Đã xảy ra lỗi khi lấy danh mục:", error);
            });
    }, []);

    const handleDelete = (id) => {
        const isConfirmed = window.confirm("Bạn có chắc chắn muốn xóa danh mục này không?");
        if (isConfirmed) {
            axios.delete(`http://localhost:3000/categories/${id}`)
                .then(() => {
                    setCategories(categories.filter(category => category.id !== id));
                })
                .catch(error => {
                    console.error("Đã xảy ra lỗi khi xóa danh mục:", error);
                });
        }
    };

    const handleEdit = (id, currentName) => {
        setEditingId(id);
        setNewName(currentName);
    };

    const handleSave = (id) => {
        axios.put(`http://localhost:3000/categories/${id}`, { name: newName })
            .then(() => {
                setCategories(categories.map(category =>
                    category.id === id ? { ...category, name: newName } : category
                ));
                setEditingId(null);
            })
            .catch(error => {
                console.error("Đã xảy ra lỗi khi cập nhật danh mục:", error);
            });
    };

    const handleCancel = () => {
        setEditingId(null);
    };

    const handleAdd = () => {
        axios.post('http://localhost:3000/categories', { name: newCategoryName })
            .then(response => {
                setCategories([...categories, response.data]);
                setNewCategoryName('');
                setIsAdding(false);
            })
            .catch(error => {
                console.error('Đã xảy ra lỗi khi thêm thể loại:', error);
            });
    };

    return (
        <div className="category-list">
            <div className="header">
                <h2 className="category-list-title">Danh sách danh mục</h2>
                {!isAdding ? (
                    <button className="add-category-button" onClick={() => setIsAdding(true)}>Thêm thể loại</button>
                ) : (
                    <div className="add-category-form">
                        <input
                            type="text"
                            value={newCategoryName}
                            onChange={(e) => setNewCategoryName(e.target.value)}
                            className="form-input"
                            placeholder="Tên thể loại mới"
                        />
                        <button className="submit-button" onClick={handleAdd}>Thêm</button>
                        <button className="cancel-button" onClick={() => setIsAdding(false)}>Hủy</button>
                    </div>
                )}
            </div>
            <ul className="category-list-items">
                {categories.map(category => (
                    <li key={category.id} className="category-list-item">
                        {editingId === category.id ? (
                            <div className="edit-container">
                                <input
                                    type="text"
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                    className="edit-input"
                                />
                                <button className="save-button" onClick={() => handleSave(category.id)}>Lưu</button>
                                <button className="cancel-button" onClick={handleCancel}>Hủy</button>
                            </div>
                        ) : (
                            <>
                                <span className="category-name">{category.name}</span>
                                <div className="category-actions">
                                    <button className="edit-button" onClick={() => handleEdit(category.id, category.name)}>Sửa</button>
                                    <button className="delete-button" onClick={() => handleDelete(category.id)}>Xóa</button>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CategoryList;
