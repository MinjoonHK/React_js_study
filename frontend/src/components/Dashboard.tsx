import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Divider } from 'antd';
import DemoLine from './DemoLine';
import styles from '../css/Dashboard.module.css'
import DemoColumn from './DemoColumn';
import DemoGauge from './DemoGauge';
import { BrowserRouter, HashRouter, Routes, Route, Outlet, Link, NavLink  } from 'react-router-dom'; //router 
import EnergyPerformance from './EnergyPerformance';
import CompanyInformation from './CompanyInformation';
import Pagemap from './Pagemap';




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
        link: '/energyPerformance',
      },
      {
        label: "Company Information",
        key: "/Company", //key name should be uniform
        link:'/companyInformation',
      },
      {
        label: "See in Map",
        key: "//map", //key name should be uniform
        link:'/map',
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
          items={menuItems.map(item => ({
            ...item,
            label: item.link ?<NavLink  to={item.link}>{item.label}</NavLink > : item.label
          }))}
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
               <p className={styles.percentage_values}>20.567 kwh</p>
              </div>
            <div className={styles.percentage_content}>
              <h3>Income Produced </h3>
              <p className={styles.percentage_values}>10580 HKD</p>
              </div>
            <div className={styles.percentage_content}>
              <h3>Temperature </h3>
              <p className={styles.percentage_values}>45</p>
              </div>
            <div className={styles.percentage_content}>
              <h3>No. of Panels</h3>
              <p className={styles.percentage_values}>1260</p>
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
          <Routes>
          <Route path="/" element={<EnergyPerformance/>}></Route>
            <Route path="/energyPerformance" element={<EnergyPerformance/>}></Route>
            <Route path="/companyInformation" element={<CompanyInformation/>}></Route>
            <Route path="/map" element={<Pagemap/>}></Route>
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;