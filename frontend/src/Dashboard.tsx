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
      },{
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
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <DemoLine/>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;