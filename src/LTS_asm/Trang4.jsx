import React from 'react';
import { Card } from 'antd';
import { products } from '../LTS_asm/data/product'; // Import the products data

const Trang4 = () => {
    const { Meta } = Card;

    const category1Products = products.filter(product => product.category_id === 3);
    const formatCurrency = (price) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };
    const truncateTitle = (title, maxLength) => {
      if (title.length > maxLength) {
          return title.substring(0, maxLength) + '...';
      }
      return title;
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
        </div>
    );
};

export default Trang4;
