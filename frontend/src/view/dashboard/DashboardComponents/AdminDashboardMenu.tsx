import { MenuProps } from "antd";
import { NavLink } from "react-router-dom";

export const AdminDashboard: MenuProps["items"] = [
  {
    label: "Performance",
    key: "/Performance", //key name should be uniform
    link: "/energyPerformance",
  },
  {
    label: "Device Information",
    key: "/deviceinfo", //key name should be uniform
    link: "/deviceinfo",
  },
  {
    label: "See in Map",
    key: "/map", //key name should be uniform
    link: "/map",
  },
  {
    label: "Work Order",
    key: "/WorkOrder", //key name should be uniform
    link: "/workorder",
  },
  {
    label: "Registered Companies",
    key: "/CompanyList", //key name should be uniform
    link: "/companylist",
  },
  {
    label: "Registered Users",
    key: "/UserList", //key name should be uniform
    link: "/userlist",
  },

  {
    label: "Settings",
    key: "/settings", //key name should be uniform
    link: "/settings",
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
