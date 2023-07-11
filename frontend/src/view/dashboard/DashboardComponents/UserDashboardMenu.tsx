import { MenuProps } from "antd";
import { NavLink } from "react-router-dom";

export const UserDashboard: MenuProps["items"] = [
  {
    label: "Performance",
    key: "/Performance", //key name should be uniform
    link: "/userenergyperformance",
  },
  {
    label: "Device Information",
    key: "/deviceinfo", //key name should be uniform
    link: "/deviceinfo",
  },
  {
    label: "Work Order",
    key: "/WorkOrder", //key name should be uniform
    link: "/workorder",
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
