//Necessary imports
//
import React from 'react'
import {  Routes, Route, Link, } from 'react-router-dom'
import {Layout, Typography, Space} from 'antd'


//Import Components
import Navbar from './components/Navbar'
import Cryptocurrencies from './components/Cryptocurrencies'
import CryptoDetails from './components/CryptoDetails'
import Homepage from './components/Homepage'
import News from './components/News'

//Import css file
import './App.css'


//Main app
const App = () => {
  return (
      //App (whole wrapper)
    <div className='app'>
        
        <div className='navbar'>
            <Navbar/>
        </div>

        <div className='main'>
            <Layout>
                <div className='routes'>
                    <Routes>
                        <Route exact path='/' element={<Homepage/>}/>
                        <Route exact path='/cryptocurrencies' element={<Cryptocurrencies/>}/>
                        <Route exact path='/crypto/:coinId' element={<CryptoDetails/>}/>
                        <Route exact path='/news' element={<News/>}></Route>
                    </Routes>
                      
                </div>
            </Layout>    
            <div className='footer'>
            <Typography.Title level={5} style={{color: 'white', textAlign: 'center'}}>
                CryptoApp inc <br>
                </br>
                All rights reserved
            </Typography.Title>
            <Space>
                <Link to='/'>Home</Link>
                <Link to='/exchanges'>Exchanges</Link>
                <Link to='/news'>News</Link>
            </Space>
        </div>
        </div>

    </div>
  )
}

export default App