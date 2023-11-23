import React, { useState } from 'react'
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Button, Col, Dropdown, Layout, Menu, MenuProps, Row, Space, message, theme } from 'antd';
import style from './layout.module.scss'
import { DownOutlined } from '@ant-design/icons';
import LineChart from './LineChart';
import BarChart from './BarChart';
import StackedBarChart from './StackedBarChart';
import Table from './Table';
import FormComponent from './FormComponent';


const TopBarNav = () => {

  const [showModals, setShowModals] = useState(false)
  const { Header, Content, Footer, Sider } = Layout;
  const labels = ['Dashboards', 'Account', 'Payroll', 'Reports', 'Advisor', 'Contacts']



  const onClick: MenuProps['onClick'] = ({ key }) => {
    message.info(`Click on item ${key}`);
  };
  


  const items = ['January', 'February', 'March','April','May','June','July','August','September',
  'October','November','December'];


  const menu = (
    <div className={style['monthly-selection']}>
       <Menu onClick={onClick}>
      {items.map((item)=>(
        <Menu.Item key={item}>{item}</Menu.Item>
      )
      )}
    </Menu>
    </div>
   
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
        <Header style={{ padding: 0, backgroundColor: '#fff' }} />
        <Row gutter={16}>
          <Col span={12}>
          <Content style={{ margin: '24px 16px 0' }}>
          <div style={{minHeight: '40vh', background: '#fff', borderRadius:'12px' }}>
            <div className={style['wrap-header']}>
              <div className={style['heading-text']}>
              Checking Account
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
            <div className={style['charts-section']} style={{width: '90%'}}>
            <LineChart/> 
            </div>
          </div>
        </Content>
          </Col>
        <Col span={12}>
        <Content style={{ margin: '24px 16px 0' }}>
          <div style={{ minHeight: '40vh', background: '#fff', borderRadius:'12px' }}>
          <div className={style['wrap-header']}>
              <div className={style['heading-text']}>
              Checking Account
              </div>
              <div className={style['button-invoice']}>
                <Button onClick={()=>setShowModals(true)}>
                  New Sales Invoice
                </Button>
              </div>
                   
            </div>
            <div className={style['charts-section']} style={{width: '100%'}}>
              <BarChart/> 
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
              Checking Account
              </div>
            </div>
            <div className={style['charts-section']} style={{width: '90%'}}>
              <StackedBarChart/> 
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
              <Table/> 
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