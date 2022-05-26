import React, {useState} from 'react'
import HTMLReactParser from "html-react-parser";
import { useParams } from 'react-router-dom'
import millify from 'millify';
import { Col, Row, Typography, Select } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, 
  ExclamationCircleOutlined, StopOutlined, TrophyOutlined, 
  CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';

import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../services/cryptoApi'
import LineChart from './LineChart';

const { Title, Text } = Typography;
const {Option} = Select


const CryptoDetails = () => {

  let {coinId} = useParams();
  const [timePeriod, setTimePeriod] = useState('7d')
  let {data, isFetching} = useGetCryptoDetailsQuery(coinId)
  let {data: coinHistory} = useGetCryptoHistoryQuery({coinId, timePeriod})
  let cryptoDetails = data?.data?.coin;
  console.log('here')
  console.log(data?.data?.coin)
  //console.log(cryptoDetails)

  if (isFetching) {
    return 'Loading..'
  }

  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];


  let stats = [
    { id: '1', title: 'Price to USD', value: `$ ${data?.data?.coin.price && (data?.data?.coin.price)}`, icon: <DollarCircleOutlined /> },
    { id: '2', title: 'Rank', value: data?.data?.coin.rank, icon: <NumberOutlined /> },
    { id: '3', title: '24h Volume', value:  `$ ${data?.data?.coin["24hVolume"] && data?.data?.coin["24hVolume"]}`, icon: <ThunderboltOutlined />},
    { id: '4', title: 'Market Cap', value: `$ ${data?.data?.coin.marketCap && data?.data?.coin.marketCap}`, icon: <DollarCircleOutlined /> },
    { id: '5', title: 'All-time-high(daily avg.)', value: `$ ${data?.data?.coin.allTimeHigh.price}`, icon: <TrophyOutlined /> },
  ];

 
    let genericStats = [
    { id: '6', title: 'Number Of Markets', value: data?.data?.coin.numberOfMarkets, icon: <FundOutlined />},
    { id: '7', title: 'Number Of Exchanges', value: data?.data?.coin.numberOfExchanges, icon: <MoneyCollectOutlined />},
    { id: '8', title: 'Change', value: data?.data?.coin.change, icon : <ExclamationCircleOutlined />},
    { id: '9', title: 'Total Supply', value:  `$ ${data?.data?.coin.supply.total}`, icon: <ExclamationCircleOutlined />},
    { id: '10', title: 'Circulating Supply', value: `$ ${data?.data?.coin.supply.circulating}`, icon: <ExclamationCircleOutlined />},
    ];


  return (
    <Col className="coin-detail-container">
      <Col className="coin-heading-container">
        <Title level={2} className="coin-name">
          {data?.data?.coin.name} ({data?.data?.coin.price}$) Price
        </Title>
        <p>{data?.data?.coin.name} live price in US Dollar (USD). View value statistics, market cap and supply.</p>
      </Col>
      <Select defaultValue={'7d'} className='select-timeperiod' 
      placeholder='Select Time Period' onChange={(value) => {setTimePeriod(value)}}>
        {time.map((date) => <Option key={date}>{date}</Option>)}
      </Select>
      <LineChart coinHistory={coinHistory} currentPrice={millify(data?.data?.coin.price)} coinName={data?.data?.coin.name}/>
      <Col className='stats-container'>
        <Col className='coin-value-statistics'>
          <Col className='coin-value-statistics-heading'>
            <Title level={3} className='coin-details-heading'>
              {data?.data?.coin.name} Value Statistics
            </Title>
            <p>
              An overview showing the stats of {data?.data?.coin.name}
            </p>
          </Col>
          {stats.map((items) => (
            <Col className="coin-stats" key={items.title}>
              <Col className="coin-stats-name">
                <Text>{items.icon}</Text>
                <Text>{items.title}</Text>
              </Col>
              <Text className="stats" >{items.value}</Text>
            </Col>
          ))}
        </Col>
        <Col className='other-stats-info'>
          <Col className='coin-value-statistics-heading'>
            <Title level={3} className='coin-details-heading'>
              Other Statistics
            </Title>
          </Col>
          {genericStats.map((items) => (
            <Col className="coin-stats" key={items.title}>
              <Col className="coin-stats-name">
                <Text>{items.icon}</Text>
                <Text>{items.title}</Text>
              </Col>
              <Text className="stats" >{items.value}</Text>
            </Col>
          ))}
        </Col>
      </Col>
            <Col className='coin-desc-link'>
              <Row className='coin-desc'>
                <Title level={3} className='coin-details-heading'>
                  What is {data?.data?.coin.name}
                  <p></p>
                </Title>
                {HTMLReactParser(data?.data?.coin.description)}
              </Row>
              <Col className='coin-links'>
                <Title className='coin-details-heading'>
                  {data?.data?.coin.name} Links
                </Title>
                {data?.data?.coin.links.map((link) =>(
                  <Row className='coin-link' key={link.url}>
                    <Title level={5} className='link-name'>
                      {link.type}
                    </Title>
                    <a href={link.url} target='_blank' rel='noreferrer'>
                      {link.name}
                    </a>
                  </Row>
                ))}
              </Col>
            </Col>
    </Col>  
  )
}



export default CryptoDetails