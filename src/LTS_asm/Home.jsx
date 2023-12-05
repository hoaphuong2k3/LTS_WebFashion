import React, { useState } from 'react';
import { Card, Pagination, Select, Checkbox, Button, Tooltip } from 'antd';
import { SyncOutlined } from '@ant-design/icons';
import { products } from '../LTS_asm/data/product';
import { categories } from '../LTS_asm/data/category';
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const { Meta } = Card;
    const { Option } = Select;
    const navigate = useNavigate();

    const formatCurrency = (price) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };
    const truncateTitle = (title, maxLength) => {
        if (title.length > maxLength) {
            return title.substring(0, maxLength) + '...';
        }
        return title;
    };


    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [sortOrder, setSortOrder] = useState('default');

    const itemsPerPage = 10;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const filteredCategories = categories.filter(category => category.id !== 0);

    // Sắp xếp sản phẩm theo giá
    const sortedProducts = [...products].sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.price - b.price;
        } else if (sortOrder === 'desc') {
            return b.price - a.price;
        } else {
            return 0;
        }
    });
    // Lọc sản phẩm theo category_id
    const filteredProducts = selectedCategories.length > 0
        ? sortedProducts.filter(product => selectedCategories.includes(product.category_id))
        : sortedProducts;


    const handleSortChange = (value) => {
        setSortOrder(value);
        setCurrentPage(1);
    };
    const handleCategoryChange = (checkedValues) => {
        setSelectedCategories(checkedValues);
        setCurrentPage(1);
    };

    const handleReset = () => {
        setSelectedCategories([]);
        setSortOrder('default');
        setCurrentPage(1);

    };

    const handleCardClick = (productId) => {
        // Sử dụng navigate để chuyển hướng đến trang chi tiết
        navigate(`/product/${productId}`);
    };



    return (
        <div>

            <div style={{ marginBottom: 16, textAlign: "right" }}>
                <Checkbox.Group style={{ marginRight: 16 }} onChange={handleCategoryChange} value={selectedCategories}>
                    {filteredCategories.map(category => (

                        <Checkbox key={category.id} value={category.id}>
                            {category.name}
                        </Checkbox>
                    ))}
                </Checkbox.Group>

                <Select defaultValue="default" style={{ width: 130 }} onChange={handleSortChange} value={sortOrder}>
                    <Option value="default">Mặc định</Option>
                    <Option value="asc">Thấp đến cao</Option>
                    <Option value="desc">Cao đến thấp</Option>
                </Select>

                <Tooltip title="Reset">
                    <Button shape="circle" icon={<SyncOutlined spin />} onClick={handleReset} style={{ marginLeft: 5 }} />
                </Tooltip>

            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', }}>
                {filteredProducts.slice(startIndex, endIndex).map(product => (
                    <Card
                        key={product.id}
                        hoverable
                        style={{ flex: '0 0 calc(20% - 16px)', margin: '8px', width: 'calc(20% - 16px)' }}
                        cover={<img alt={product.name} src={product.product_image} style={{ width: '100%', objectFit: 'cover' }} />}
                        onClick={() => handleCardClick(product.id)}
                    >
                        <Meta
                            title={truncateTitle(product.name, 30)}
                            description={
                                <div>
                                    <span style={{ color: 'red' }}>Price: {formatCurrency(product.price)}</span>
                                    <small style={{ textDecoration: 'line-through', paddingLeft: 7 }}>{formatCurrency(product.price_cu)}</small>
                                </div>

                            }
                        />
                    </Card>
                ))}
            </div>

            <Pagination style={{ textAlign: 'center' }}
                current={currentPage}
                total={filteredProducts.length}
                pageSize={itemsPerPage}
                onChange={handlePageChange}
            />

        </div>
    );
};

export default Home;
