import React from 'react';
import {  Menu, Typography, Avatar } from 'antd';
import {Link} from 'react-router-dom'
import {HomeOutlined,  BulbOutlined, FundOutlined, } from '@ant-design/icons'

import icon from '../images/cryp.jpeg'

function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }

  const itemsNav = 
    [
        getItem(<Link to='/'>Homepage</Link>, '1', <HomeOutlined/>),
        getItem(<Link to='/cryptocurrencies'>Crypto Currencies</Link>, '2', <FundOutlined/>),
        getItem(<Link to='/news'>News</Link>, '3', <BulbOutlined/>)
    ];

const Navbar = () => {

  return (
    <div className='nav-container'>
        <div className='logo-container'>
            <Avatar src={icon} size='large'/>
            <Typography.Title level={2} className='logo'>
                <Link to='/'>CryptoApp</Link>
            </Typography.Title>
        </div>
        <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        items={itemsNav}>
        </Menu>
    </div>
  )
}

export default Navbar