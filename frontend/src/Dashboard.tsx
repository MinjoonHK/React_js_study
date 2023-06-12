import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import DemoLine from './DemoLine';
import styles from '../src/css/Dashboard.module.css'
import DemoColumn from './DemoColumn';
import DemoGauge from './DemoGauge';
const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const menuItems = [
    {
        label: "Energy Performance",
        key: "/Performance", //key name should be uniform
        children: [
          {
            key: "/HourlyPerformance",
            label: "Hourly"
          },
          {
            key: "/DailyPerformance",
            label: "Daily"
          },
          ,
          {
            key: "/MonthlyPerformance",
            label: "Monthly"
          },
          ,
          {
            key: "/YearlyPerformance",
            label: "Yearly"
          },
        ],
      },
      {
        label: "Company List",
        key: "/company", //key name should be uniform
        children: [
          {
            key: "/HourlyPerformance",
            label: "Hourly"
          },
          {
            key: "/DailyPerformance",
            label: "Daily"
          },
          ,
          {
            key: "/MonthlyPerformance",
            label: "Monthly"
          },
          ,
          {
            key: "/YearlyPerformance",
            label: "Yearly"
          },
        ],
      },{
        label: "See in Map",
        key: "/Performance", //key name should be uniform
      },
  
]
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <br />
        <span className={styles.title}>Dash board</span>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <span className={styles.title}></span>Kellon Energy
        </Header>
        <Content
        style={{
          margin: '24px 16px',
          padding: 24,
          minHeight: 100,
          background: colorBgContainer,
        }}
        >
          <div className={styles.percentage_wrapper}>
            <div className={styles.percentage_content}>
               <h3>Electricity Produced</h3>
              </div>
            <div className={styles.percentage_content}>
              <h3>Income Produced </h3>
              </div>
            <div className={styles.percentage_content}>
              <h3>Temperature </h3>
              </div>
            <div className={styles.percentage_content}>
              <h3>No. of Panels</h3>
              </div>
          </div>
        </Content>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <div className={styles.wrapper}>
            <div><DemoLine/></div>
            <div><DemoLine/></div>
            <div><DemoLine/></div>
            <div><DemoLine/></div>
            <div><DemoColumn/></div>
          <div><DemoGauge/></div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;