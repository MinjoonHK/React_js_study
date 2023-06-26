import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme, Button, Input, Divider} from 'antd';
import { Link, NavLink, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import EnergyPerformance from '../../components/EnergyPerformance';
import Pagemap from '../../components/Pagemap';
import CompanyInformation from '../../components/CompanyInformation';
import AddCompany from '../../components/CompanyAdd';

const { Header, Content, Footer, Sider } = Layout;
const { Search } = Input;
const onSearch = (value: string) => console.log(value);

function logout(){
    localStorage.clear();
}


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
  label: item.link ?<NavLink  style={{textDecoration:'none'}} to={item.link}>{item.label}</NavLink > : item.label,

}));

const Dashboard: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed} collapsedWidth={0} style={{minHeight:"100vh"}}>
        <div style={{color:'white', margin:'20px'}}><h2>Navigator</h2></div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={items} />
      </Sider>
      <Layout>
        <Header 
        style={{
          display:'flex',
           padding: 0,
            background: colorBgContainer,
            justifyContent:'space-between',
             }} >
        
        <div style={{display:'flex'}}>
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
          <span style={{marginTop:'20px'}}>
          <Search
          placeholder="input Company Name"
          allowClear
          enterButton="Search"
          size="middle"
          onSearch={onSearch}
          
    />
    </span>
              </div>
          <span style={{textAlign:'center',marginRight:'20px', marginTop:'5px'}}>
            <Link to="/Login">
            <Button
            onClick={() =>{ logout()}}
            ><b>Logout</b>
            </Button>
            </Link>
            
            </span>
        </Header>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div style={{ padding: 24, textAlign: 'center', background: colorBgContainer }}>
            {
               <Routes>
               <Route path="/" element={<EnergyPerformance/>}></Route>
                 <Route path="/energyPerformance" element={<EnergyPerformance/>}></Route>
                 <Route path="/companyInformation" element={<CompanyInformation/>}></Route>
                 <Route path="/map" element={<Pagemap/>}></Route>
                 <Route path="/addCompany" element={<AddCompany/>}></Route>
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