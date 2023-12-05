// Cart.js
import React, { useState } from 'react';
import { Button, Row, Col, Card, Modal, Radio, Table, Popconfirm, message } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../LTS_asm/CartContext';
import { TagTwoTone, EnvironmentTwoTone, CaretRightOutlined, RocketTwoTone, WalletTwoTone, CarryOutTwoTone } from '@ant-design/icons';
import { address } from '../LTS_asm/data/address';

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const checkoutData = location.state;
  const { clearCart } = useCart();
  console.log(checkoutData.cartItems);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [deliveryMethod, setDeliveryMethod] = useState('allWeek');
  const [checkoutMethod, setCheckoutMethod] = useState('cod');

  const formatCurrency = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleAddressChange = (e) => {
    const selectedId = e.target.value;
    const selected = address.find(addr => addr.id === selectedId);
    setSelectedAddress(selected);
  };

  const handleDeliveryMethodChange = (e) => {
    const newDeliveryMethod = e.target.value === 'standard' ? 'allWeek' : e.target.value;
    setDeliveryMethod(newDeliveryMethod);
  };

  const handleCheckoutChange = (e) => {
    setCheckoutMethod(e.target.value);
  };

  const createFlexRow = (marginTop, borderTop) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop,
    borderTop
  });

  const columns = [
    {
      title: 'Sản phẩm',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <>
          <div>
            <span>{text}</span>
            <span style={{ fontWeight: "bold" }}> {`x${record.quantity}`}</span>
          </div>

        </>
      ),
    },
    {
      title: 'Đơn giá',
      dataIndex: 'price',
      key: 'price',
      render: (text) => formatCurrency(text),
    },
    {
      title: 'Tổng',
      dataIndex: 'subtotal',
      key: 'subtotal',
      render: (text) => (
        <span style={{ color: 'red' }}>{formatCurrency(text)}</span>
      ),
    },

  ];

  const groupedCartItems = checkoutData.cartItems.reduce((grouped, item) => {
    const existingItem = grouped.find(group => group.product.id === item.product.id);
  
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      grouped.push({ ...item });
    }
  
    return grouped;
  }, []);
  
  const data = groupedCartItems.map((item, index) => ({
    key: index,
    name: item.product.name,
    quantity: item.quantity,
    price: item.product.price,
    subtotal: item.product.price * item.quantity,
  }));
  

  const subtotal = checkoutData.cartItems.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
  }, 0);

  const totalAmount = subtotal + (selectedAddress ? selectedAddress.ship : 0);

  const handleCheckout = () => {
    clearCart();
    message.success('Đặt hàng thành công.');
    navigate('/category/0');

  };

  return (
    <>
      <Row>
        <Col span={15}>
          <Card
            type="inner"
            title={<span style={{ fontSize: 16 }}><EnvironmentTwoTone /> Địa chỉ nhận hàng</span>}
            extra={<Button type='link' onClick={showModal}>Thay đổi <CaretRightOutlined /></Button>}
            style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', border: '1px solid #ccc', borderRadius: 0 }}
          >
            {selectedAddress && (
              <>
                <strong>{selectedAddress.name}</strong>
                <span> | {selectedAddress.phone}</span>
                <div>{selectedAddress.address}</div>
              </>
            )}
          </Card>

          <Card
            type="inner"
            title={<span style={{ fontSize: 16 }}><RocketTwoTone /> Phương thức giao hàng</span>}
            style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', border: '1px solid #ccc', borderRadius: 0, marginTop: 20 }}
          >
            <div style={createFlexRow()}>
              <Radio checked value="standard"><strong>Giao tiêu chuẩn</strong></Radio>
              {selectedAddress && (
                <>
                  <strong style={{ color: "red" }}>{formatCurrency(selectedAddress.ship)}</strong>
                </>
              )}
            </div>

            <Radio.Group
              value={deliveryMethod}
              onChange={handleDeliveryMethodChange}
              style={{ display: 'block' }}
            >
              <Radio value="monToSat" style={{ margin: 30 }}>
                <strong>Từ thứ 2- thứ 6 (8-18h)</strong>
                <div style={{ color: "gray" }}>Phù hợp với địa chỉ văn phòng/cơ quan.</div>
              </Radio>
              <br />
              <Radio value="allWeek" style={{ marginLeft: 30 }}>
                <strong>Cả tuần (Trừ CN & ngày lễ)</strong>
                <div style={{ color: "gray" }}>Phù hợp với địa chỉ nhà riêng, luôn có người nhận. Giao hàng từ 8:00 - 18:00</div>
              </Radio>
            </Radio.Group>
          </Card>

          <Card
            type="inner"
            title={<span style={{ fontSize: 16 }}><WalletTwoTone /> Phương thức thanh toán</span>}
            style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', border: '1px solid #ccc', borderRadius: 0, marginTop: 20 }}
          >

            <Radio.Group
              value={checkoutMethod}
              onChange={handleCheckoutChange}
              style={{ display: 'block' }}
            >
              <div style={createFlexRow()}>
                <Radio value="momo" >
                  <strong>Ví Momo</strong>
                  <div style={{ color: "gray", fontSize: "small" }}>Nhớ kiểm tra số dư trước khi thanh toán bạn nhé.</div>
                </Radio>
                <img src='https://media3.scdn.vn/img4/2021/06_08/TgFdj5SXwtFP3STJ6mfk.png' alt='momo' height={24} />
              </div>
              <div style={createFlexRow(30)}>
                <Radio value="cod">
                  <strong>Tiền mặt (COD)</strong>
                  <div style={{ color: "gray", fontSize: "small" }}>Phí thu hộ: Miễn phí</div>
                </Radio>
                <img src='https://media3.scdn.vn/img4/2021/03_31/fMfdU81WB18wSe2LKOWW.png' alt='cod' height={24} />
              </div>
              <div style={createFlexRow(30)}>
                <Radio value="senpay">
                  <strong>Ví Senpay</strong>
                  <div style={{ color: "gray", fontSize: "small" }}>Số dư: 0₫</div>
                </Radio>
                <img src='https://media3.scdn.vn/img4/2021/05_14/oposINBx6SyQhflKKhUX.png' alt='senpay' height={24} />
              </div>
              <div style={createFlexRow(30)}>
                <Radio value="love">
                  <strong>Thanh toán kết hợp</strong>
                  <div style={{ color: "gray", fontSize: "small" }}>Số dư trong ví Senpay phải có ít nhất 1.000₫ để thanh toán.</div>
                </Radio>
                <img src='https://media3.scdn.vn/img4/2021/05_17/3TrUQZxPPqe9RqgEJ0D4.png' alt='...' height={24} />
              </div>
            </Radio.Group>
          </Card>

        </Col>

        <Col span={9} style={{ paddingLeft: 50 }}>
          <Card
            type="inner"
            title={<span style={{ fontSize: 16 }}><TagTwoTone /> Mã ưu đãi Sendo</span>}
            style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', border: '1px solid #ccc', borderRadius: 0 }}
          >
            <Button type="dashed" block size="large">
              <span style={{ fontWeight: 400, color: "#0f62fe" }}>Chọn/nhập mã</span>
            </Button>
          </Card>

          <Card
            type="inner"
            title={<span style={{ fontSize: 16 }}><CarryOutTwoTone /> Thông tin đơn hàng</span>}
            style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', border: '1px solid #ccc', borderRadius: 0, marginTop: 20 }}
          >
            <Table columns={columns} dataSource={data} pagination={false} />
          </Card>

          <Card
            type="inner"
            style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', border: '1px solid #ccc', borderRadius: 0, marginTop: 20 }}
          >
            <div style={createFlexRow(10)}>
              <span style={{ paddingRight: 10 }}>Tiền hàng:</span>
              <strong>{formatCurrency(subtotal)}</strong>
            </div>

            <div style={createFlexRow(10)}>
              <span style={{ paddingRight: 10 }}>Phí giao hàng:</span>
              <strong>
                {selectedAddress && (
                  <>
                    <strong>{formatCurrency(selectedAddress.ship)}</strong>
                  </>
                )}
              </strong>
            </div>

            <div style={createFlexRow(10, '1px solid #e7e8ea')}>
              <span style={{ paddingRight: 10 }}>Tổng thanh toán:</span>
              <strong style={{ color: "red", fontSize: 20 }}>{formatCurrency(totalAmount)}</strong>
            </div>

            <Popconfirm
              title="Bạn chắc chắn đặt hàng?"
              onConfirm={() => handleCheckout()}
              okText="Có"
              cancelText="Không"
            >
              <Button type="primary" danger block size="large" style={{ marginTop: 20 }}>
                <strong>Đặt mua</strong>
              </Button>
            </Popconfirm>
          </Card>
        </Col>
      </Row>

      <Modal
        title="Địa chỉ nhận hàng"
        open={isModalOpen}
        okButtonProps={{ style: { display: 'none' } }}
        onCancel={handleCancel}
      >
        <Radio.Group
          onChange={handleAddressChange}
          value={selectedAddress ? selectedAddress.id : undefined}
        >
          {address.map(addr => (
            <Radio key={addr.id} value={addr.id} style={{ borderBottom: '1px solid #ccc', padding: 15 }}>
              <strong>{addr.name}</strong>
              <span> | {addr.phone}</span>
              <div>{addr.address}</div>
            </Radio>
          ))}
        </Radio.Group>
      </Modal>

    </>
  );
};

export default Checkout;
