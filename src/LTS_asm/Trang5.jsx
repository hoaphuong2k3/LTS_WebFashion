import React, { useState } from 'react';
import { Card, Pagination } from 'antd';
import { products } from '../LTS_asm/data/product'; // Import the products data

const Trang5 = () => {
    const { Meta } = Card;

    const category1Products = products.filter(product => product.category_id === 4);
    const formatCurrency = (price) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };
    const truncateTitle = (title, maxLength) => {
        if (title.length > maxLength) {
            return title.substring(0, maxLength) + '...';
        }
        return title;
    };
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentProducts = category1Products.slice(startIndex, endIndex);
    const totalPages = Math.ceil(category1Products.length / itemsPerPage);
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', }}>
                {category1Products.map(product => (
                    <Card
                        key={product.id}
                        hoverable
                        style={{ flex: '0 0 calc(20% - 16px)', margin: '8px', width: 'calc(20% - 16px)' }}
                        cover={<img alt={product.name} src={product.product_image} style={{ width: '100%', objectFit: 'cover' }} />}
                    >
                        <Meta
                            title={truncateTitle(product.name, 30)}
                            description={<span style={{ color: 'red' }}>Price: {formatCurrency(product.price)}</span>}
                        />
                    </Card>
                ))}
            </div>
            {/* Hiển thị phân trang */}
            <Pagination
                current={currentPage}
                total={category1Products.length}
                pageSize={itemsPerPage}
                onChange={handlePageChange}
            />
        </div>
    );
};

export default Trang5;
