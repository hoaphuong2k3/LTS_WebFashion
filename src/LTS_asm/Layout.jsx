import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { BiSearch, BiShoppingBag } from 'react-icons/bi';
import { Layout, theme, Menu, Image, Input, Button, Avatar, Badge } from 'antd';
import Home from "../LTS_asm/Home";
import Trang2 from "../LTS_asm/Trang2";
import Trang3 from "../LTS_asm/Trang3";
import Trang4 from "../LTS_asm/Trang4";
import Trang5 from "../LTS_asm/Trang5";
import Trang6 from "../LTS_asm/Trang6";
import Cart from '../LTS_asm/Cart';
import Checkout from "../LTS_asm/Checkout";
import ProductDetail from '../LTS_asm/Detail';
import { categories } from '../LTS_asm/data/category';
import { CartProvider } from '../LTS_asm/CartContext';

const { Header, Content, Footer } = Layout;
const LayoutASM = () => {

    const {
        token: { colorBgContainer },
    } = theme.useToken();
    

    return (
        <CartProvider>

            <Router>
                <Layout>
                    <Header
                        style={{
                            position: 'sticky',
                            top: 0,
                            zIndex: 1,
                            width: '100%',
                            height: 143,
                            backgroundColor: "#ee2624"
                        }}
                    >

                        <div style={{ display: 'flex', alignItems: 'center' }}>

                            <div className="demo-logo" style={{ paddingRight: 20 }}>
                                <Image src='https://cdn.sforum.vn/sforum/wp-content/uploads/2023/03/sendo-thumb.jpg' alt='logo' width={200} height={95} />
                            </div>
                            <Menu style={{ lineHeight: 3 }}
                                mode="horizontal"
                                items={new Array(3).fill(null).map((_, index) => ({
                                    key: String(index + 1),
                                    label: `Thời trang ${index + 1}`,
                                }))}
                            />


                            <Input placeholder="Tìm trên Sendo" style={{ width: 750, height: 40, marginLeft: 20, marginRight: 8 }} />
                            <Button
                                style={{
                                    width: 55,
                                    height: 40,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginRight: 30
                                }}
                            >
                                <BiSearch style={{ fontSize: 24 }} />
                            </Button>

                            <Badge  showZero size="small">
                                <Link to={`/cart`}>
                                    <BiShoppingBag style={{ fontSize: 30, color: "#fff", cursor: 'pointer' }} />
                                </Link>
                            </Badge>


                            <Avatar icon={<UserOutlined />} style={{ marginLeft: 30 }} />
                            <span style={{ color: "#fff" }}>Hoa Phượng</span>

                        </div>

                        <Menu
                            style={{
                                backgroundColor: "#ee2624",
                                color: "#fff",
                                fontSize: 16,
                                justifyContent: 'space-between',
                                textAlign: "center",
                                display: 'flex',
                                flex: 1,
                            }}
                            selectedKeys={[]}
                        >
                            {categories.map(category => (
                                <Menu.Item key={category.id}>
                                    <Link to={`/category/${category.id}`}>{category.name}</Link>
                                </Menu.Item>
                            ))}
                        </Menu>
                    </Header>
                    <Content
                        className="site-layout"
                        style={{
                            padding: '0 50px',
                            marginTop: 20
                        }}
                    >
                        <div
                            style={{
                                padding: 24,
                                minHeight: 500,
                                background: colorBgContainer,
                            }}
                        >
                            <Routes>
                                <Route path="/category/0" element={<Home />} replace />
                                <Route path="/category/1" element={<Trang2 />} />
                                <Route path="/category/2" element={<Trang3 />} />
                                <Route path="/category/3" element={<Trang4 />} />
                                <Route path="/category/4" element={<Trang5 />} />
                                <Route path="/category/5" element={<Trang6 />} />
                                <Route path="/product/:productId" element={<ProductDetail />} />
                                <Route path="/cart" element={<Cart />} />
                                <Route path="/checkout" element={<Checkout />} />
                            </Routes>

                        </div>
                    </Content>

                    <Footer
                        style={{
                            textAlign: 'center',
                        }}
                    >
                        Ant Design ©2023 Created by Ant UED
                    </Footer>
                </Layout>
            </Router>
        </CartProvider>
    );
};
export default LayoutASM;