import React, { useState, useEffect } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme, Button, Dropdown, Space } from "antd";
import { Route, Routes, useNavigate } from "react-router-dom";
import EnergyPerformance from "../../components/EnergyPerformance";
import Pagemap from "../../components/Pagemap";
import CompanyList from "../../components/CompanyList";
import AddCompany from "../../components/CompanyAdd";
import AdminProfile from "../../components/AdminProfile";
import jwtDecode from "jwt-decode";
import WorkOrder from "../../components/WorkOrder";
import AddWorkOrder from "../../components/WorkorderAdd";
import UserList from "../../components/UserList";
import Settings from "../../components/Settings";
import DeviceInfo from "../../components/DeviceInfo";
import AddDevice from "../../components/DeviceAdd";
import UserEnergyPerformance from "../../components/userpage/UserEnergyPerfomance";
import { AdminDashboard } from "./DashboardComponents/AdminDashboardMenu";
import { DashboardDropdown } from "./DashboardComponents/DashboardDropdown";
import { UserDashboard } from "./DashboardComponents/UserDashboardMenu";

const { Header, Content, Footer, Sider } = Layout;

function logout() {
  localStorage.clear();
}

export interface decodedToken {
  ID: number;
  Email: string;
  Name: string;
  Role: string;
  iat: number;
  exp: number;
}

const Dashboard: React.FC = () => {
  const [greeting, setGreeting] = useState("");
  const [firstName, setFirstName] = useState("");
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState("User");

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    const decoded: decodedToken = jwtDecode(token);
    const hour = new Date().getHours();
    const currentTime: number = Date.now();
    const expirationTime: number = new Date(decoded.exp * 1000).getTime();
    if (currentTime > expirationTime) {
      navigate("/login");
      setTimeout(() => logout(), 100);
    }
    if (token) {
      const greetingName = decoded.Name;
      setFirstName(greetingName);
      setUserRole(decoded.Role);
    }
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
        {userRole === "Admin" && (
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={AdminDashboard}
          />
        )}
        {userRole === "User" && (
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={UserDashboard}
          />
        )}
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

              <Dropdown menu={{ items: DashboardDropdown }} trigger={["click"]}>
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
            {userRole == "Admin" && (
              <Routes>
                <Route
                  path="/dashboard"
                  element={<EnergyPerformance />}
                ></Route>
                <Route
                  path="/energyPerformance"
                  element={<EnergyPerformance />}
                ></Route>
                <Route path="/workorder" element={<WorkOrder />}></Route>
                <Route path="/settings" element={<Settings />}></Route>
                <Route path="/companylist" element={<CompanyList />}></Route>
                <Route path="/userlist" element={<UserList />}></Route>
                <Route path="/map" element={<Pagemap />}></Route>
                <Route path="/deviceinfo" element={<DeviceInfo />}></Route>
                <Route path="/addcompany" element={<AddCompany />}></Route>
                <Route path="/addDevice" element={<AddDevice />}></Route>
                <Route path="/addworkorder" element={<AddWorkOrder />}></Route>
                <Route
                  path="/admininformation"
                  element={<AdminProfile />}
                ></Route>
              </Routes>
            )}
            {userRole == "User" && (
              <Routes>
                <Route
                  path="/dashboard"
                  element={<UserEnergyPerformance />}
                ></Route>
                <Route
                  path="/userenergyperformance"
                  element={<UserEnergyPerformance />}
                ></Route>
                <Route path="/workorder" element={<WorkOrder />}></Route>
                <Route path="/settings" element={<Settings />}></Route>
                <Route path="/companylist" element={<CompanyList />}></Route>
                <Route path="/userlist" element={<UserList />}></Route>
                <Route path="/map" element={<Pagemap />}></Route>
                <Route path="/deviceinfo" element={<DeviceInfo />}></Route>
                <Route path="/addcompany" element={<AddCompany />}></Route>
                <Route path="/addDevice" element={<AddDevice />}></Route>
                <Route path="/addworkorder" element={<AddWorkOrder />}></Route>
                <Route
                  path="/admininformation"
                  element={<AdminProfile />}
                ></Route>
              </Routes>
            )}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>©KELLON 2023</Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
