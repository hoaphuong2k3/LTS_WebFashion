// Cart.js
import React, { useEffect, useState } from 'react';
import { Table, Button, Row, Col, Card, Popconfirm } from 'antd';
import { useCart } from '../LTS_asm/CartContext';
import { TagOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, addToCart, deleteCart } = useCart();
  const [totalAmount, setTotalAmount] = useState(0);

  const formatCurrency = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const columns = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
    },
    {
      title: 'Sản phẩm',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (text, record) => (
        <span>
          <Button
            type="link"
            size="small"
            onClick={() => handleQuantityChange(record.key, -1)}
            disabled={text === 1}
          >
            -
          </Button>
          {text}
          <Button
            type="link"
            size="small"
            onClick={() => handleQuantityChange(record.key, 1)}
          >
            +
          </Button>
        </span>
      ),
    },
    {
      title: 'Đơn giá',
      dataIndex: 'price',
      key: 'price',
      render: (text) => formatCurrency(text),
    },
    {
      title: 'Thành tiền',
      dataIndex: 'total',
      key: 'total',
      render: (text) => formatCurrency(text),
    },
    {
      title: 'Thao tác',
      dataIndex: 'delete',
      key: 'delete',
      render: (_, record) => (
        <Popconfirm
          title="Xóa sản phẩm này khỏi giỏ hàng?"
          onConfirm={() => handleDelete(record.key)}
          okText="Có"
          cancelText="Không"
        >
          <Button type="link" size="small" icon={<DeleteOutlined />} />
        </Popconfirm>
      ),
    },
  ];

  const handleQuantityChange = (itemId, newQuantity) => {
    addToCart(cartItems.find(item => item.product.id === itemId).product, newQuantity);
  };

  const handleDelete = (itemId) => {
    const updatedCartItems = cartItems.filter(item => item.product.id !== itemId);
    deleteCart(updatedCartItems);
  };

  const cartDataMap = {};
  cartItems.forEach((item, index) => {
    const { id, name, price } = item.product;
    const { quantity } = item;

    if (!cartDataMap[id]) {
      cartDataMap[id] = {
        key: id,
        index: Object.keys(cartDataMap).length + 1,
        name,
        quantity,
        price,
        total: quantity * price,
      };
    } else {
      cartDataMap[id].quantity += quantity;
      cartDataMap[id].total = cartDataMap[id].quantity * price;
    }
  });

  const data = Object.values(cartDataMap);

  useEffect(() => {
    const total = cartItems.reduce((acc, item) => {
      return acc + item.product.price * item.quantity;
    }, 0);

    setTotalAmount(total);
  }, [cartItems]);

  const handleCheckout = () => {
    const checkoutData = {
      cartItems: cartItems,
    };
    navigate('/checkout', { state: checkoutData });
  }

  return (
    <>
      <Row>
        <Col span={17}>
          <Table columns={columns} dataSource={data} />
        </Col>
        <Col span={7} style={{ paddingLeft: 50 }}>
          <Card
            type="inner"
            title={<span><TagOutlined /> Mã ưu đãi Sendo</span>}
            extra={<Button type='link'>Chọn/nhập mã</Button>}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ paddingRight: 10 }}>Tạm tính:</span>
              <strong style={{ color: "red", fontSize: 20 }}>{formatCurrency(totalAmount)}</strong>
            </div>
            
              <Button type="primary" danger block size="large" onClick={handleCheckout}>
                <strong>Mua ngay</strong>
              </Button>
    
          </Card>
        </Col>
      </Row>

    </>
  );
};

export default Cart;
