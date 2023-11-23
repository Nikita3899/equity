import React from 'react'
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Button, Col, Dropdown, Layout, Menu, MenuProps, Row, Space, message, theme } from 'antd';
import style from './layout.module.scss'
import { DownOutlined } from '@ant-design/icons';
import LineChart from './LineChart';
import BarChart from './BarChart';
import StackedBarChart from './StackedBarChart';
import Table from './Table';


const TopBarNav = () => {

  const { Header, Content, Footer, Sider } = Layout;
  const labels = ['Dashboards', 'Account', 'Payroll', 'Reports', 'Advisor', 'Contacts']



  const onClick: MenuProps['onClick'] = ({ key }) => {
    message.info(`Click on item ${key}`);
  };
  
  const items: MenuProps['items'] = [
    {
      label: 'January',
      key: '1',
    },
    {
      label: 'Feburary',
      key: '2',
    },
    {
      label: 'March',
      key: '3',
    },
    {
      label: 'April',
      key: '4',
    },
    {
      label: 'May',
      key: '5',
    },
    {
      label: 'June',
      key: '6',
    },
    {
      label: 'July',
      key: '7',
    },
    {
      label: 'August',
      key: '8',
    },
    {
      label: 'September',
      key: '9',
    },
    {
      label: 'October',
      key: '10',
    },
    {
      label: 'November',
      key: '11',
    },
    {
      label: 'December',
      key: '12',
    },
  ];
// https://calendar.app.google/pYb2YYmDVEvfoTxa6

  return (

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
          <div style={{ padding:'8px 0px',minHeight: '40vh', background: '#fff', borderRadius:'12px' }}>
            <div className={style['wrap-header']}>
              <div className={style['heading-text']}>
              Checking Account
              </div>
              <div className={style['wrap-selects']}>
                  <Dropdown menu={{ items, onClick }}>
                    <div onClick={(e) => e.preventDefault()}>
                      <Space>
                        January
                        <DownOutlined />
                      </Space>
                    </div>
                  </Dropdown>
              </div>
            </div>
            <div className={style['charts-section']} style={{width: '80%', marginTop:'20px'}}>
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
                 <Button>
                  New Sales Invoice
                 </Button>  
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
            <div className={style['charts-section']} style={{width: '100%'}}>
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
              Checking Account
              </div>
            </div>
            <div className={style['charts-section']} >
              <Table/> 
            </div>
          </div>
        </Content>
        </Col>

        </Row>

      </Layout>
    </Layout>

  )
}

export default TopBarNav