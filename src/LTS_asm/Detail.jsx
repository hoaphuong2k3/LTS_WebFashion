// ProductDetail.js
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Col, Row, Rate, Tag, Input, Button, Flex, message  } from 'antd';
import { products } from '../LTS_asm/data/product';
import { useCart } from '../LTS_asm/CartContext';

const ProductDetail = () => {
  const { addToCart } = useCart();
  const { productId } = useParams();
  const product = products.find(p => p.id.toString() === productId);

  const formatCurrency = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const discountPercentage = ((product.price_cu - product.price) / product.price_cu) * 100;

  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (value) => {
    if (value >= 1) {
      setQuantity(value);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    message.success('Sản phẩm đã được thêm vào giỏ hàng.');
  };
  return (

    <>
      <Row>
        <Col span={12}>
          <img src={product.product_image} alt={product.name} style={{ width: '100%', maxHeight: '400px', objectFit: 'contain' }} />
        </Col>
        <Col span={12} style={{ paddingRight: 80 }}>

          <p style={{ fontSize: "23px", fontWeight: "400" }}>{product.name}</p>
          <p><Rate allowHalf defaultValue={4.5} /></p>
          <p>
            <span style={{ textDecoration: 'line-through' }}>{formatCurrency(product.price_cu)}</span>
            <span style={{ color: 'red', fontSize: 25, margin: "0 15px 0 15px" }}>{formatCurrency(product.price)}</span>
            <Tag color="#ee4d2d" style={{ fontWeight: "bold" }}>Giảm {`${discountPercentage.toFixed(0)}%`}</Tag>
          </p>
          <p>{product.description}</p>
          <p>
            Số lượng:
            <span style={{ marginLeft: 30 }}>
              <Button onClick={handleDecrease}>-</Button>
              <Input
                min={1}
                value={quantity}
                style={{ width: 60, textAlign: 'center' }}
                onChange={handleQuantityChange}

              />
              <Button onClick={handleIncrease}>+</Button>
            </span>
          </p>

          <Flex gap="small" wrap="wrap" style={{marginTop: 50}}>
            <Button danger icon={<ShoppingCartOutlined />} size= "large" onClick={handleAddToCart}> Thêm vào giỏ hàng</Button>
            <Button type="primary" danger size= "large" style={{ width: '200px' }}>Mua ngay</Button>
          </Flex>
        </Col>
      </Row>
    </>

  );
};

export default ProductDetail;
