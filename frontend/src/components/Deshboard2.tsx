import React from 'react';
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import { NavLink, Route, Routes } from 'react-router-dom';
import EnergyPerformance from './EnergyPerformance';
import Pagemap from './Pagemap';
import CompanyInformation from './CompanyInformation';
import { Button, Col, Container, Form, Row } from "react-bootstrap";

const { Header, Content, Footer, Sider } = Layout;

const items: MenuProps['items'] = [
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
].map((item, index) => ({
  key: String(index + 1),
  label: item.link ?<NavLink  to={item.link}>{item.label}</NavLink > : item.label,

}));

const Dashboard: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={items} />
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Row>
        <Col sm={3}>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button>
              Search
            </Button>
          </Form>
        </Col>
      </Row>
        <Content
        style={{
          margin: '24px 16px',
          padding: 24,
          minHeight: 100,
          background: colorBgContainer,
        }}
        >
          <p>Hello</p>
        </Content>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div style={{ padding: 24, textAlign: 'center', background: colorBgContainer }}>
            {
               <Routes>
               <Route path="/" element={<EnergyPerformance/>}></Route>
                 <Route path="/energyPerformance" element={<EnergyPerformance/>}></Route>
                 <Route path="/companyInformation" element={<CompanyInformation/>}></Route>
                 <Route path="/map" element={<Pagemap/>}></Route>
               </Routes>
            }
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>©2023</Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;