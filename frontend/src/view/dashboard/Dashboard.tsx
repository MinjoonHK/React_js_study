import React, { useState, useEffect } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DownOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, theme, Button, Input, Dropdown, Space } from "antd";
import { Link, NavLink, Route, Routes } from "react-router-dom";
import EnergyPerformance from "../../components/EnergyPerformance";
import Pagemap from "../../components/Pagemap";
import CompanyList from "../../components/CompanyList";
import AddCompany from "../../components/CompanyAdd";
import UserProfile from "../../components/UserProfile";
import jwtDecode from "jwt-decode";
import DailyEnergyPerformance from "../../components/DailyEnergyPerformance";
import MonthlyEnergyPerformance from "../../components/MonthlyEnergyPerformance";

const { Header, Content, Footer, Sider } = Layout;

function logout() {
  localStorage.clear();
}

const items: MenuProps["items"] = [
  {
    label: "Overall Peroformance",
    key: "/Performance", //key name should be uniform
    link: "/energyPerformance",
  },
  {
    label: "Daily Performance",
    key: "/DailyPerformance", //key name should be uniform
    link: "/DailyenergyPerformance",
  },
  {
    label: "Monthly Performance",
    key: "/MonthlyPerformance", //key name should be uniform
    link: "/MonthlyenergyPerformance",
  },
  {
    label: "Work Order",
    key: "/map", //key name should be uniform
    link: "/map",
  },
  {
    label: "Registered Companies",
    key: "/Company", //key name should be uniform
    link: "/companylist",
  },
  {
    label: "See in Map",
    key: "/map", //key name should be uniform
    link: "/map",
  },
].map((item, index) => ({
  key: String(index + 1),
  label: item.link ? (
    <NavLink style={{ textDecoration: "none" }} to={item.link}>
      {item.label}
    </NavLink>
  ) : (
    item.label
  ),
}));

const userDropdown: MenuProps["items"] = [
  {
    label: (
      <Link style={{ textDecoration: "none" }} to="/userinformation">
        Profile
      </Link>
    ),
    key: "0",
  },
  {
    label: (
      <Link
        onClick={logout}
        style={{ fontWeight: "bold", textDecoration: "none" }}
        to="/login"
      >
        Logout
      </Link>
    ),
    key: "1",
  },
];

interface decodedToken {
  ID: string;
  Email: string;
  Name: string;
  Role: string;
}

const Dashboard: React.FC = () => {
  const [greeting, setGreeting] = useState("");
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      const decoded: decodedToken = jwtDecode(token);
      const greetingName = decoded.Name;
      setFirstName(greetingName);
    }
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting("Good Morning!");
    } else if (hour < 18) {
      setGreeting("Good Afternoon!");
    } else {
      setGreeting("Good Evening!");
    }
  }, []);

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        collapsedWidth={0}
        style={{ minHeight: "100vh" }}
      >
        <div style={{ color: "white", margin: "20px" }}>
          <h2>Navigator</h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={items}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            display: "flex",
            padding: 0,
            background: colorBgContainer,
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex" }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
          </div>

          <span
            style={{
              textAlign: "center",
            }}
          >
            <span
              style={{
                marginRight: "20px",
                fontWeight: "bold",
              }}
            >
              <span
                style={{
                  color: "black",
                  fontSize: "16px",
                  marginRight: "16px",
                }}
              >
                {greeting}
              </span>

              <Dropdown menu={{ items: userDropdown }} trigger={["click"]}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space style={{ color: "black", fontSize: "18px" }}>
                    {firstName ? <>{firstName}</> : null}
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
            </span>
          </span>
        </Header>
        <Content
          style={{
            margin: "24px 16px 0",
            overflow: "initial",
          }}
        >
          <div
            style={{
              padding: 24,
              textAlign: "center",
              background: colorBgContainer,
            }}
          >
            {
              <Routes>
                <Route
                  path="/dashboard"
                  element={<EnergyPerformance />}
                ></Route>
                <Route
                  path="/energyPerformance"
                  element={<EnergyPerformance />}
                ></Route>
                <Route path="/companylist" element={<CompanyList />}></Route>
                <Route path="/map" element={<Pagemap />}></Route>
                <Route path="/addCompany" element={<AddCompany />}></Route>
                <Route
                  path="/userinformation"
                  element={<UserProfile />}
                ></Route>
                <Route
                  path="/dailyEnergyPerformance"
                  element={<DailyEnergyPerformance />}
                ></Route>
                <Route
                  path="/monthlyEnergyPerformance"
                  element={<MonthlyEnergyPerformance />}
                ></Route>
              </Routes>
            }
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>©KELLON 2023</Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
