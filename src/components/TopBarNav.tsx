import React, { useState } from 'react'
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Button, Col, Dropdown, Layout, Menu, Row, Space } from 'antd';
import style from './layout.module.scss'
import { DownOutlined } from '@ant-design/icons';
import LineChart from './LineChart';
import BarChart from './BarChart';
import StackedBarChart from './StackedBarChart';
import Table from './Table';
import FormComponent from './FormComponent';
import {labels, items, manageItems, stackData, tableDataSource} from './consts'
import Search from 'antd/es/input/Search';
import Bell from '../assets/Bell.svg'


const TopBarNav = () => {

  const [showModals, setShowModals] = useState(false)
  const { Header, Content, Sider } = Layout;
  const [data, setData] = useState([21, 62, 26, 64, 56]);
  const [stackedData , setStackedData] = useState(stackData);
  const [dataSource, setDataSource] = useState(tableDataSource);
  
  const generateRandomData = () => {
    const newData = Array.from({ length:Math.floor(Math.random() * (9 - 5 + 1)) + 5 }, () => Math.floor(Math.random() * 100));
    setData(newData);

    const newDataStacked = stackedData.map((item) => ({
      ...item,
      value1: Math.floor(Math.random() * 100),
      value2: Math.floor(Math.random() * 100),
    }));
  
    setStackedData(newDataStacked);

    const newDataSource = dataSource.map((item)=>({
      ...item,
      this_month: Math.floor(Math.random() * 20000),
      ytd: Math.floor(Math.random() * 20000)
    }))

    setDataSource(newDataSource);
  };
  
  const menu = (
    <div className={style['monthly-selection']}>
       <Menu onClick={generateRandomData}>
      {items.map((item)=>(
        <Menu.Item key={item}>{item}</Menu.Item>
      )
      )}
    </Menu>
    </div>
  )

  const menuManage = (
    <Menu onClick={generateRandomData}>
      {manageItems.map((item)=>(
        <Menu.Item key={item}>{item}</Menu.Item>
      ))}
    </Menu>
  )
// https://calendar.app.google/pYb2YYmDVEvfoTxa6

const onCancel = () =>{
  setShowModals(false);
}

return (
<>
{showModals && (<FormComponent visible={showModals} onCancel={onCancel}/>)}
<Layout>
      <div className={style['sider-container']}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className={style['menu-container']} />
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined, UploadOutlined].map(
            (icon, index) => ({
              key: String(index + 1),
              icon: React.createElement(icon),
              label: labels[index],
            }),
          )}
        />
      </Sider>
      </div>
      <Layout>
        <Header style={{ padding: 0, backgroundColor: '#fff',display:'flex',alignItems:'center',justifyContent:'flex-end'}}>
          <div style={{paddingTop:'10px',display:'flex'}}>
            <div style={{width:'300px',paddingRight:'20px'}}><Search/></div>
            {/* <div style={{marginTop:'-5px'}}><img src={Bell}/></div> */}
          </div>
          </Header>
        <Row gutter={16}>
          <Col span={12}>
          <Content style={{ margin: '24px 16px 0' }}>
          <div style={{minHeight: '40vh', background: '#fff', borderRadius:'12px' }}>
            <div className={style['wrap-header']}>
              <div className={style['heading-text']}>
              Checking Account
              </div>
              <div className={style['wrap-dropDowns']}>
              <div className={style['monthly-selection']} style={{paddingRight:'12px'}}>
                  <Dropdown overlay={menuManage}>
                    <div onClick={(e) => e.preventDefault()}>
                      <Space>
                        <Button>
                        Manage
                        <DownOutlined />
                        </Button>   
                      </Space>
                    </div>
                  </Dropdown>
              </div>
              <div className={style['monthly-selection']}>
                  <Dropdown overlay={menu}>
                    <div onClick={(e) => e.preventDefault()}>
                      <Space>
                        <Button>
                        January
                        <DownOutlined />
                        </Button>   
                      </Space>
                    </div>
                  </Dropdown>
              </div>
              </div>   
            </div>
            <div className={style['charts-section']} style={{width: '90%'}}>
            <LineChart data={data}/> 
            </div>
          </div>
        </Content>
          </Col>
        <Col span={12}>
        <Content style={{ margin: '24px 16px 0' }}>
          <div style={{ minHeight: '40vh', background: '#fff', borderRadius:'12px' }}>
          <div className={style['wrap-header']}>
              <div className={style['heading-text']}>
                Invoices owed to you
              </div>
              <div className={style['button-invoice']}>
                <Button onClick={()=>setShowModals(true)}>
                  New Sales Invoice
                </Button>
              </div>
                   
            </div>
            <div className={style['charts-section']} style={{width: '100%'}}>
              <BarChart data={data}/> 
            </div>
          </div>
        </Content></Col>
        
        </Row>
        <Row  gutter={16}>
        <Col span={12}>
        <Content style={{ margin: '24px 16px 0' }}>
          <div style={{ minHeight: '40vh', background: '#fff', borderRadius:'12px' }}>
          <div className={style['wrap-header']}>
              <div className={style['heading-text']}>
              Total Cash Flow
              </div>
              <div className={style['wrap-legends']}>
                <div className={style['wrap-legends']} style={{paddingRight:'10px'}}>
                  <div className={style['sq']}/>
                  <div style={{color:'#dadada'}}>In</div>
                  </div>
                  <div className={style['wrap-legends']}>
                  <div className={style['sq1']}/>
                  <div style={{color:'#dadada'}}>Out</div>
                  </div>
              </div>
            </div>
            <div className={style['charts-section']} style={{width: '90%'}}>
              <StackedBarChart data={stackedData}/> 
            </div>
          </div>
        </Content>
        </Col>
        <Col span={12}>
       
        <Content style={{ margin: '24px 16px 0' }}>
          <div style={{ minHeight: '40vh', background: '#fff', borderRadius:'12px' }}>
          <div className={style['wrap-header']}>
              <div className={style['heading-text']}>
              Account watchlist
              </div>
            </div>
            <div className={style['table-section']}>
              <Table data={dataSource}/> 
            </div>
          </div>
        </Content>
        </Col>

        </Row>

      </Layout>
    </Layout>

</>
     
  )
}

export default TopBarNav