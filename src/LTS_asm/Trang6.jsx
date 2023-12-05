import React from 'react';
import { Card, theme } from 'antd';

const Trang6 = () => {
    const { Meta } = Card;

    console.log('Home component is rendered'); // Thêm dòng log này để kiểm tra

    return (
        <Card
            hoverable
            style={{ width: 240 }}
           
        >
            <Meta title="Europe Street beat" description="www.instagram.com" />
        </Card>
    );
};

export default Trang6;
